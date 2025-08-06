"use client";

import { cn } from "@/lib/utils";
import { Shield, Activity, Bell, Database } from "lucide-react";

const navigation = [
  {
    name: "Data Overview",
    page: "data-overview",
    icon: Database,
    description: "Monitor data collection and sharing",
  },
  {
    name: "Consent Manager",
    page: "consent-manager",
    icon: Shield,
    description: "Control data sharing preferences",
  },
  {
    name: "Access Logs",
    page: "access-logs",
    icon: Activity,
    description: "Track data access activities",
  },
  {
    name: "Alerts",
    page: "alerts",
    icon: Bell,
    description: "Monitor important events",
  },
];

export function DashboardNav({
  currentPage,
  onNav,
}: {
  currentPage: string;
  onNav: (page: string) => void;
}) {
  return (
    <nav className="flex space-x-2 lg:space-x-6">
      {navigation.map((item) => {
        const isActive = currentPage === item.page;
        return (
          <button
            key={item.name}
            type="button"
            onClick={() => onNav(item.page)}
            className={cn(
              "flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none",
              isActive
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground"
            )}
          >
            <item.icon className="h-4 w-4" />
            <span className="hidden lg:inline-block">{item.name}</span>
          </button>
        );
      })}
    </nav>
  );
}
