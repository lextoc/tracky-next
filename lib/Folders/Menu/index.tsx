"use client";

import { useQueryClient } from "@tanstack/react-query";

import destroy from "@/api/destroy";
import endpoints from "@/api/endpoints";
import { Folder } from "@/api/types/folders";
import Button from "@/components/Buttons/Base";
import Popover from "@/components/Overlays/Popover";
import { useSnackbarStore } from "@/stores/snackbar";

import styles from "./index.module.css";

export interface FolderMenuProps {
  folder: Folder;
}

export default function FolderMenu({ folder }: FolderMenuProps) {
  const queryClient = useQueryClient();
  const showSnackbar = useSnackbarStore((state) => state.show);

  const onDelete = () => {
    const hasAgreed = window.confirm(
      "Destroying your folder will also remove all its tasks and timeEntries. Are you sure?",
    );
    if (!hasAgreed) return;
    let projectId = folder.project_id;
    destroy(endpoints.destroyFolder(folder.id)).then((data) => {
      if (data.success) {
        queryClient.invalidateQueries([
          endpoints.getFoldersFromProject(folder.project_id),
        ]);
        showSnackbar({
          message: "Folder has been deleted",
        });
      } else {
        showSnackbar({
          message: data?.errors?.join(" "),
          type: "error",
        });
      }
    });
  };

  return (
    <div className={styles.root}>
      <Popover
        content={
          <div className={styles.menu}>
            <Button variant="subtle" danger onClick={onDelete} noMargin>
              Delete folder
            </Button>
          </div>
        }
      />
    </div>
  );
}
