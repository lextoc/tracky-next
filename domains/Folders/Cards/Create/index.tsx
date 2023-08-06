"use client";

import { useForm } from "@mantine/form";
import { useQueryClient } from "@tanstack/react-query";

import create from "@/api/create";
import endpoints from "@/api/endpoints";
import { CreateFolder } from "@/api/types/folders";
import { Project } from "@/api/types/projects";
import Button from "@/shared/Buttons/Base";
import Card from "@/shared/Cards/Base";
import Input from "@/shared/Inputs/Base";
import Form from "@/shared/Inputs/Form";
import { useSnackbarStore } from "@/stores/snackbar";

import styles from "./index.module.css";

export interface FoldersCreateCardProps {
  project: Project;
}

export default function FoldersCreateCard({ project }: FoldersCreateCardProps) {
  const queryClient = useQueryClient();
  const showSnackbar = useSnackbarStore((state) => state.show);

  const onSubmit = (values: Omit<CreateFolder, "project_id">) => {
    create<{ folder: CreateFolder }>(endpoints.folders.main, {
      folder: {
        project_id: project.id,
        ...values,
      },
    }).then((data) => {
      if (data?.errors) {
        showSnackbar({
          message:
            data?.errors?.full_messages?.join(" ") || data?.errors?.join(" "),
          type: "error",
        });
      } else {
        form.reset();
        queryClient.invalidateQueries();
        showSnackbar({
          message: "Folder has been created",
        });
      }
    });
  };

  const form = useForm<Omit<CreateFolder, "project_id">>({
    initialValues: {
      name: "",
    },

    validate: {
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <Card
      hasMovingBackground
      header={<h3>Create new folder</h3>}
      content={
        <>
          <p>
            Enter a name and click on create to make a new folder. In this
            folder you'll be able to create time entries.
          </p>
          <Form onSubmit={form.onSubmit((values) => onSubmit(values))}>
            <Input
              label="Folder name"
              placeholder="Folder name"
              inverted
              {...form.getInputProps("name")}
            />
            <div className={styles.submit}>
              <Button type="submit">Create</Button>
            </div>
          </Form>
        </>
      }
    />
  );
}