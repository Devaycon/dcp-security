"use client";
import React, { useState, useEffect } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { User2Icon, Database, Shield, Activity, Bell } from "lucide-react";
import { ConsentManagerPage } from "@/components/pages/consent-manager";
import { DataOverviewPage } from "@/components/pages/data-overview";
import { AccessLogsPage } from "@/components/pages/access-logs";
import { AlertsPage } from "@/components/pages/alert-page";
import { Dashboard } from "@/components/pages/dashboard";
import { IconBrandDatabricks, IconHome2 } from "@tabler/icons-react";

type DashboardPage =
  | "dashboard"
  | "data-overview"
  | "consent-manager"
  | "access-logs"
  | "alerts";

export default function DashboardPage() {
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<DashboardPage>("dashboard");

  // Detect mobile screen
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const handleLinkClick = (page: DashboardPage, e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentPage(page);
    if (isMobile) setOpen(false);
  };

  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <IconHome2 className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      page: "dashboard" as DashboardPage,
    },
    {
      label: "Data Overview",
      href: "#",
      icon: (
        <Database className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      page: "data-overview" as DashboardPage,
    },
    {
      label: "Consent Manager",
      href: "#",
      icon: (
        <Shield className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      page: "consent-manager" as DashboardPage,
    },
    {
      label: "Access Logs",
      href: "#",
      icon: (
        <Activity className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      page: "access-logs" as DashboardPage,
    },
    {
      label: "Alerts",
      href: "#",
      icon: (
        <Bell className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      page: "alerts" as DashboardPage,
    },
  ];

  const renderCurrentPage = () => {
    const handleSetCurrentPage = (page: string) => {
      setCurrentPage(page as DashboardPage);
    };

    switch (currentPage) {
      case "dashboard":
        return (
          <Dashboard
            currentPage={currentPage}
            setCurrentPage={handleSetCurrentPage}
          />
        );
      case "data-overview":
        return <DataOverviewPage />;
      case "consent-manager":
        return <ConsentManagerPage />;
      case "access-logs":
        return <AccessLogsPage />;
      case "alerts":
        return <AlertsPage />;
      default:
        return (
          <Dashboard
            currentPage={currentPage}
            setCurrentPage={handleSetCurrentPage}
          />
        );
    }
  };

  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-1 flex-col border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "cursor-pointer transition-colors rounded-lg pl-1",
                    currentPage === link.page &&
                      "bg-neutral-200 dark:bg-neutral-700"
                  )}
                >
                  <SidebarLink
                    link={link}
                    className="cursor-pointer"
                    onClick={(e) => handleLinkClick(link.page, e)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "User",
                href: "#",
                icon: <User2Icon />,
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <DashboardContent>{renderCurrentPage()}</DashboardContent>
    </div>
  );
}

export const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <IconBrandDatabricks className="dark:text-white text-black" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
      >
        DCP Archive
      </motion.span>
    </a>
  );
};

export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <IconBrandDatabricks className="dark:text-white text-black" />
    </a>
  );
};

const DashboardContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="flex h-full w-full flex-1 flex-col border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900 overflow-auto">
        <motion.div
          key={children?.toString()}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex-1 min-h-0"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};
