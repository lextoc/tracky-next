"use client";

import { IconMenu2 } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useContext } from "react";

import { clearCookies } from "@/api/cookies";
import Button from "@/components/buttons/base";
import Popover from "@/components/overlays/Popover";
import AuthenticationContext from "@/lib/authentication/Context";

import styles from "./index.module.css";

export interface INavigationMenuProps {}

export default function NavigationMenu(props: INavigationMenuProps) {
  const user = useContext(AuthenticationContext);
  const { push } = useRouter();

  const onSignOut = () => {
    clearCookies();
    push("/");
  };

  if (!user) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.root}>
        <button className={styles.menu}>
          <IconMenu2 size="1rem" color="white" />
        </button>
        <div className={styles.account}>
          <div className={styles.signedInAs}>
            Signed in as<strong>{user?.email}</strong>
          </div>
          <Popover
            white
            content={
              <>
                {/* <p>
                  Signed in as<strong>{user?.email}</strong>
                </p> */}
                <Button noMargin variant="subtle" onClick={onSignOut}>
                  Sign out
                </Button>
              </>
            }
          />
        </div>
      </div>
    </div>
  );
}