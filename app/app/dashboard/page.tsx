"use client";

import { useQuery } from "@tanstack/react-query";

import endpoints from "@/api/endpoints";
import getPage from "@/api/getPage";
import { Project } from "@/api/types/projects";
import { Header } from "@/components/Shared/Header";
import PaddingContainer from "@/components/Shared/PaddingContainer";
import { ProjectCreateCard } from "@/lib/Projects/Cards/Create";
import ProjectsListItem from "@/lib/Projects/ListItem";

import styles from "./page.module.css";

export interface DashboardProps {}

export default function Dashboard(props: DashboardProps) {
  const query = useQuery({
    queryKey: [endpoints.getProjects],
    queryFn: () => getPage(endpoints.getProjects),
  });

  let projects: Project[] = [];
  if (query.data?.success) projects = query.data?.data;

  return (
    <div className={styles.root}>
      <Header main>
        <PaddingContainer>
          <h1>Dashboard</h1>
          <p>Manage your projects</p>
        </PaddingContainer>
      </Header>
      <PaddingContainer>
        <div className="content">
          <div className={styles.content}>
            {projects.map((project) => (
              <ProjectsListItem key={project.id} project={project} />
            ))}
          </div>
          <h2>Create project</h2>
          <ProjectCreateCard />
        </div>
      </PaddingContainer>
    </div>
  );
}
