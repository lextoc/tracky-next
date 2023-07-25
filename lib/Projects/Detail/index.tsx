"use client";

import { useQuery } from "@tanstack/react-query";

import endpoints from "@/api/endpoints";
import getPage from "@/api/getPage";
import { Project } from "@/api/types/projects";
import PaddingContainer from "@/components/Shared/PaddingContainer";
import ProjectsListItem from "@/lib/Projects/ListItem";

export interface IProjectDetailProps {
  projectId?: number;
}

export default function ProjectDetail({ projectId }: IProjectDetailProps) {
  if (!projectId) return null;

  const query = useQuery({
    queryKey: [endpoints.getProject(projectId)],
    queryFn: () => getPage(endpoints.getProject(projectId)),
  });

  let project: Project | null = null;
  if (query.data?.success) project = query.data?.data;
  console.log("🚀 ~ query.data:", query.data);
  console.log("🚀 ~ project:", project);

  if (!project) return null;

  return (
    <PaddingContainer withBottomGap>
      <ProjectsListItem project={project} last />
    </PaddingContainer>
  );
}
