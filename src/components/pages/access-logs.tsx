"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface AccessLog {
  id: string;
  timestamp: string;
  action: string;
  dataType: string;
  accessedBy: string;
}

export function AccessLogsPage() {
  const [accessLogs, setAccessLogs] = useState<AccessLog[]>([]);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchAccessLogs = async () => {
      try {
        const response = await fetch("/api/access-logs");
        const data = await response.json();
        setAccessLogs(data.accessLogs);
      } catch {
        // Fallback to static data
        const staticLogs: AccessLog[] = [
          {
            id: "1",
            timestamp: "2024-01-15T20:30:00Z",
            action: "Viewed",
            dataType: "Mood Log",
            accessedBy: "User",
          },
          {
            id: "2",
            timestamp: "2024-01-15T19:45:00Z",
            action: "Synced",
            dataType: "Activity",
            accessedBy: "App Backend",
          },
          {
            id: "3",
            timestamp: "2024-01-15T18:20:00Z",
            action: "Shared",
            dataType: "Mood Log",
            accessedBy: "Therapist",
          },
          {
            id: "4",
            timestamp: "2024-01-15T17:15:00Z",
            action: "Viewed",
            dataType: "Activity",
            accessedBy: "User",
          },
          {
            id: "5",
            timestamp: "2024-01-15T16:30:00Z",
            action: "Synced",
            dataType: "Sleep Data",
            accessedBy: "SDK",
          },
          {
            id: "6",
            timestamp: "2024-01-15T15:45:00Z",
            action: "Deleted",
            dataType: "Old Activity",
            accessedBy: "App Backend",
          },
          {
            id: "7",
            timestamp: "2024-01-15T14:20:00Z",
            action: "Viewed",
            dataType: "Mood Log",
            accessedBy: "Therapist",
          },
          {
            id: "8",
            timestamp: "2024-01-15T13:10:00Z",
            action: "Synced",
            dataType: "Biometric Data",
            accessedBy: "SDK",
          },
          {
            id: "9",
            timestamp: "2024-01-15T12:00:00Z",
            action: "Shared",
            dataType: "Activity",
            accessedBy: "External",
          },
          {
            id: "10",
            timestamp: "2024-01-15T11:30:00Z",
            action: "Viewed",
            dataType: "Sleep Data",
            accessedBy: "User",
          },
        ];
        setAccessLogs(staticLogs);
      }
    };

    fetchAccessLogs();
  }, []);

  const getActionBadge = (action: string) => {
    const variants = {
      Viewed: "info",
      Synced: "success",
      Shared: "warning",
      Deleted: "destructive",
      Created: "default",
      Updated: "secondary",
    } as const;

    return (
      <Badge
        variant={variants[action as keyof typeof variants] || "outline"}
        className="text-xs"
      >
        {action}
      </Badge>
    );
  };

  const getDataTypeBadge = (dataType: string) => {
    const variants = {
      "Mood Log": "default",
      Activity: "secondary",
      "Sleep Data": "info",
      "Biometric Data": "success",
      "Old Activity": "destructive",
    } as const;

    return (
      <Badge
        variant={variants[dataType as keyof typeof variants] || "outline"}
        className="text-xs"
      >
        {dataType}
      </Badge>
    );
  };

  const getAccessedByBadge = (accessedBy: string) => {
    const variants = {
      User: "default",
      "App Backend": "secondary",
      Therapist: "info",
      SDK: "success",
      External: "warning",
    } as const;

    return (
      <Badge
        variant={variants[accessedBy as keyof typeof variants] || "outline"}
        className="text-xs"
      >
        {accessedBy}
      </Badge>
    );
  };

  const sortedLogs = [...accessLogs].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="space-y-4 p-2 sm:space-y-6 sm:p-4">
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Data Access Logs
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Monitor who has accessed your data and when
        </p>
      </div>

      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl">
            Recent Access Activity
          </CardTitle>
          <CardDescription className="text-sm">
            A chronological list of all data access events, sorted by latest
            activity
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 sm:p-6">
          {/* Mobile Card View */}
          <div className="block sm:hidden space-y-3 p-4">
            {sortedLogs.map((log) => (
              <Card key={log.id} className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex flex-wrap gap-1">
                      {getActionBadge(log.action)}
                      {getDataTypeBadge(log.dataType)}
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {format(new Date(log.timestamp), "MMM dd, HH:mm")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      Accessed by:
                    </span>
                    {getAccessedByBadge(log.accessedBy)}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[140px]">Timestamp</TableHead>
                  <TableHead className="min-w-[100px]">Action</TableHead>
                  <TableHead className="min-w-[120px]">Data Type</TableHead>
                  <TableHead className="min-w-[120px]">Accessed By</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-medium">
                      {format(new Date(log.timestamp), "MMM dd, yyyy HH:mm:ss")}
                    </TableCell>
                    <TableCell>{getActionBadge(log.action)}</TableCell>
                    <TableCell>{getDataTypeBadge(log.dataType)}</TableCell>
                    <TableCell>{getAccessedByBadge(log.accessedBy)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg">Access Summary</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Total Accesses
                </span>
                <span className="font-medium">{accessLogs.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Today</span>
                <span className="font-medium">
                  {
                    accessLogs.filter((log) => {
                      const today = new Date();
                      const logDate = new Date(log.timestamp);
                      return logDate.toDateString() === today.toDateString();
                    }).length
                  }
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">This Week</span>
                <span className="font-medium">
                  {
                    accessLogs.filter((log) => {
                      const weekAgo = new Date();
                      weekAgo.setDate(weekAgo.getDate() - 7);
                      return new Date(log.timestamp) > weekAgo;
                    }).length
                  }
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg">Most Active</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-2">
              {Object.entries(
                accessLogs.reduce((acc, log) => {
                  acc[log.accessedBy] = (acc[log.accessedBy] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)
              )
                .sort(([, a], [, b]) => b - a)
                .slice(0, 3)
                .map(([entity, count]) => (
                  <div
                    key={entity}
                    className="flex justify-between items-center"
                  >
                    <span className="text-sm break-words">{entity}</span>
                    <Badge variant="secondary" className="text-xs">
                      {count}
                    </Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg">Data Types</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-2">
              {Object.entries(
                accessLogs.reduce((acc, log) => {
                  acc[log.dataType] = (acc[log.dataType] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)
              )
                .sort(([, a], [, b]) => b - a)
                .slice(0, 3)
                .map(([dataType, count]) => (
                  <div
                    key={dataType}
                    className="flex justify-between items-center"
                  >
                    <span className="text-sm break-words">{dataType}</span>
                    <Badge variant="outline" className="text-xs">
                      {count}
                    </Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
