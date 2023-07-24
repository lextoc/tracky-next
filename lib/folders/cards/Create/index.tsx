"use client";

import { useForm } from "@mantine/form";
import { useQueryClient } from "@tanstack/react-query";

import create from "@/api/create";
import endpoints from "@/api/endpoints";
import { IFolder } from "@/api/types/folders";
import { IProject } from "@/api/types/projects";
import Button from "@/components/buttons/base";
import Input from "@/components/inputs/base";
import Form from "@/components/inputs/Form";
import { useSnackbarStore } from "@/stores/snackbar";

import styles from "./index.module.css";

export interface ICreateFolderCardProps {
  project: IProject;
}

export default function CreateFolderCard({ project }: ICreateFolderCardProps) {
  const queryClient = useQueryClient();
  const showSnackbar = useSnackbarStore((state) => state.show);

  const onSubmit = (values: Omit<IFolder, "project_id">) => {
    create<{ folder: IFolder }>(endpoints.createFolder, {
      folder: {
        project_id: project.id!,
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
        queryClient.invalidateQueries([
          endpoints.getFoldersFromProject(project.id!),
        ]);
        showSnackbar({
          message: "Folder has been created",
        });
      }
    });
  };

  const form = useForm<Omit<IFolder, "project_id">>({
    initialValues: {
      name: "",
    },

    validate: {
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <div className={styles.root}>
      <h3>Create new folder</h3>
      <p>
        Enter a name and click on create to make a new folder. In this folder
        you'll be able to create timesheets.
      </p>
      <Form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <Input
          label="Name"
          placeholder="Folder name"
          inverted
          {...form.getInputProps("name")}
        />
        <div className={styles.submit}>
          <Button type="submit">Create</Button>
        </div>
      </Form>
    </div>
  );
}
