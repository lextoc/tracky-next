"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "@/components/Shared/Logo";
import SideNavigationLink from "@/lib/Navigation/Side/Link";
import SideNavigationProjects from "@/lib/Navigation/Side/Projects";
import SideNavigationRunningTimers from "@/lib/Navigation/Side/RunningTimers";

import styles from "./index.module.css";

export interface SideNavigationProps {}

export default function SideNavigation(props: SideNavigationProps) {
  const pathname = usePathname();

  if (!pathname.startsWith("/app")) return null;

  return (
    <div className={styles.root}>
      <div className={styles.secondRoot} />
      <div className={styles.thirdRoot} />
      <div className={styles.logoWrapper}>
        <Link href="/" className={styles.logo}>
          <Logo small white noLink />
        </Link>
      </div>
      <div className={styles.inner}>
        {/* <SideNavigationLink
          href="/app/timers"
          title="Get started"
          sub="Start timing tasks via timers"
          wip
        /> */}
        <SideNavigationLink
          href="/app/dashboard"
          title="Dashboard"
          sub="Manage your projects"
        />
        {/* <SideNavigationLink
          href="/app/timeline"
          title="Calendar"
          sub="Use a timeline for inserting time entries"
          wip
        /> */}
        {/* <SideNavigationLink
          href="/app/timesheets"
          title="Timesheets generator"
          sub="Generate timesheets for a specific date range"
          wip
        /> */}
        <SideNavigationRunningTimers />
        <SideNavigationProjects />
      </div>
    </div>
  );
}
