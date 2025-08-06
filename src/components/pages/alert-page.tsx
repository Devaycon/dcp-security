"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  Bell,
  Activity,
  Shield,
  AlertTriangle,
  CheckCircle,
  Info,
} from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Alert {
  id: string;
  type: string;
  message: string;
  timestamp: string;
  severity: string;
}

export function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchAlerts = async () => {
      try {
        const response = await fetch("/api/alerts");
        const data = await response.json();
        setAlerts(data.alerts);
      } catch {
        // Fallback to static data
        const staticAlerts: Alert[] = [
          {
            id: "1",
            type: "mood",
            message: "Mood log for Jan 15 added – Optimistic (8/10)",
            timestamp: "2024-01-15T20:30:00Z",
            severity: "info",
          },
          {
            id: "2",
            type: "activity",
            message: "New activity detected: 30 minute walk in the park",
            timestamp: "2024-01-15T19:45:00Z",
            severity: "info",
          },
          {
            id: "3",
            type: "consent",
            message: "Location data consent changed to disabled",
            timestamp: "2024-01-15T18:20:00Z",
            severity: "warning",
          },
          {
            id: "4",
            type: "access",
            message: "Therapist accessed your mood data",
            timestamp: "2024-01-15T17:15:00Z",
            severity: "info",
          },
          {
            id: "5",
            type: "data",
            message: "Sleep data synced successfully",
            timestamp: "2024-01-15T16:30:00Z",
            severity: "success",
          },
          {
            id: "6",
            type: "mood",
            message: "Mood log for Jan 14 added – Anxious (4/10)",
            timestamp: "2024-01-15T15:45:00Z",
            severity: "warning",
          },
          {
            id: "7",
            type: "activity",
            message: "New activity detected: Gym workout - strength training",
            timestamp: "2024-01-15T14:20:00Z",
            severity: "info",
          },
          {
            id: "8",
            type: "consent",
            message: "Third-party sharing consent changed to disabled",
            timestamp: "2024-01-15T13:10:00Z",
            severity: "warning",
          },
        ];
        setAlerts(staticAlerts);
      }
    };

    fetchAlerts();
  }, []);

  const getAlertIcon = (type: string) => {
    const icons = {
      mood: Bell,
      activity: Activity,
      consent: Shield,
      access: Info,
      data: CheckCircle,
      warning: AlertTriangle,
    } as const;

    const IconComponent = icons[type as keyof typeof icons] || Info;
    return <IconComponent className="h-4 w-4 flex-shrink-0" />;
  };

  const getSeverityBadge = (severity: string) => {
    const variants = {
      info: "info",
      warning: "warning",
      success: "success",
      error: "destructive",
    } as const;

    return (
      <Badge
        variant={variants[severity as keyof typeof variants] || "outline"}
        className="text-xs"
      >
        {severity}
      </Badge>
    );
  };

  const getTypeBadge = (type: string) => {
    const variants = {
      mood: "default",
      activity: "secondary",
      consent: "warning",
      access: "info",
      data: "success",
    } as const;

    return (
      <Badge
        variant={variants[type as keyof typeof variants] || "outline"}
        className="text-xs"
      >
        {type}
      </Badge>
    );
  };

  const handleTestToast = () => {
    toast("New Alert", {
      description: "A new data access event has been detected.",
    });
  };

  const sortedAlerts = [...alerts].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="space-y-4 p-2 sm:space-y-6 sm:p-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Custom Alerts
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Monitor important events and data activities
          </p>
        </div>
        <Button onClick={handleTestToast} variant="outline" className="w-fit">
          Test Toast
        </Button>
      </div>

      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl">Recent Alerts</CardTitle>
          <CardDescription className="text-sm">
            Stay informed about important data events and activities
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 sm:p-6">
          {/* Mobile Card View */}
          <div className="block sm:hidden space-y-3 p-4">
            {sortedAlerts.map((alert) => (
              <Card key={alert.id} className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex items-center gap-2">
                      {getAlertIcon(alert.type)}
                      {getTypeBadge(alert.type)}
                    </div>
                    {getSeverityBadge(alert.severity)}
                  </div>
                  <p className="text-sm font-medium break-words">
                    {alert.message}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(alert.timestamp), "MMM dd, yyyy HH:mm")}
                  </span>
                </div>
              </Card>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[120px]">Alert Type</TableHead>
                  <TableHead className="min-w-[250px]">Message</TableHead>
                  <TableHead className="min-w-[100px]">Severity</TableHead>
                  <TableHead className="min-w-[140px]">Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedAlerts.map((alert) => (
                  <TableRow key={alert.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getAlertIcon(alert.type)}
                        {getTypeBadge(alert.type)}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-md break-words">
                      {alert.message}
                    </TableCell>
                    <TableCell>{getSeverityBadge(alert.severity)}</TableCell>
                    <TableCell>
                      {format(new Date(alert.timestamp), "MMM dd, yyyy HH:mm")}
                    </TableCell>
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
            <CardTitle className="text-lg">Alert Summary</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Total Alerts
                </span>
                <span className="font-medium">{alerts.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Today</span>
                <span className="font-medium">
                  {
                    alerts.filter((alert) => {
                      const today = new Date();
                      const alertDate = new Date(alert.timestamp);
                      return alertDate.toDateString() === today.toDateString();
                    }).length
                  }
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">This Week</span>
                <span className="font-medium">
                  {
                    alerts.filter((alert) => {
                      const weekAgo = new Date();
                      weekAgo.setDate(weekAgo.getDate() - 7);
                      return new Date(alert.timestamp) > weekAgo;
                    }).length
                  }
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg">Alert Types</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-2">
              {Object.entries(
                alerts.reduce((acc, alert) => {
                  acc[alert.type] = (acc[alert.type] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)
              )
                .sort(([, a], [, b]) => b - a)
                .slice(0, 4)
                .map(([type, count]) => (
                  <div key={type} className="flex justify-between items-center">
                    <span className="text-sm capitalize break-words">
                      {type}
                    </span>
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
            <CardTitle className="text-lg">Severity Levels</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-2">
              {Object.entries(
                alerts.reduce((acc, alert) => {
                  acc[alert.severity] = (acc[alert.severity] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)
              )
                .sort(([, a], [, b]) => b - a)
                .map(([severity, count]) => (
                  <div
                    key={severity}
                    className="flex justify-between items-center"
                  >
                    <span className="text-sm capitalize break-words">
                      {severity}
                    </span>
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
