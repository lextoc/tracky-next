"use client";

import { useRouter } from "next/navigation";

import { clearCookies } from "@/api/cookies";
import { IUser } from "@/api/types/auth";
import Button from "@/components/interaction/Button";
import Popover from "@/components/shared/Popover";

import styles from "./NavigationMenu.module.css";

export interface INavigationMenuProps {
  user: IUser | null | undefined;
}

export default function NavigationMenu({ user }: INavigationMenuProps) {
  const { push } = useRouter();

  const onSignOut = () => {
    clearCookies();
    push("/");
  };

  if (!user) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.root}>
        <div className={styles.account}>
          <div className={styles.signedInAs}>
            Signed in as<strong>{user?.email}</strong>
          </div>
          <Popover
            white
            content={
              <Button noMargin variant="subtle" onClick={onSignOut}>
                Sign out
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
}
