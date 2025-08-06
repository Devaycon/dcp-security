"use client";

import { useState, useEffect } from "react";
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
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useConsentStore } from "@/lib/store";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";

interface ConsentSetting {
  id: string;
  category: string;
  description: string;
  enabled: boolean;
}

export function ConsentManagerPage() {
  const { settings, toggleConsent, updateSettings } = useConsentStore();
  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState<null | {
    category: string;
    enabled: boolean;
  }>(null);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchConsentSettings = async () => {
      try {
        const response = await fetch("/api/consent-settings");
        const data = await response.json();
        updateSettings(data.consentSettings);
      } catch {
        // Fallback to static data
        const staticSettings: ConsentSetting[] = [
          {
            id: "1",
            category: "Mood Tracking",
            description:
              "Allow app to collect and analyze mood data for therapeutic insights",
            enabled: true,
          },
          {
            id: "2",
            category: "Activity Monitoring",
            description: "Track physical activities and exercise patterns",
            enabled: true,
          },
          {
            id: "3",
            category: "Location Data",
            description: "Use GPS data to track movement and activity patterns",
            enabled: false,
          },
          {
            id: "4",
            category: "Sleep Patterns",
            description:
              "Monitor sleep quality and duration through device sensors",
            enabled: true,
          },
          {
            id: "5",
            category: "Social Interactions",
            description: "Analyze communication patterns and social engagement",
            enabled: false,
          },
          {
            id: "6",
            category: "Biometric Data",
            description: "Collect heart rate, steps, and other health metrics",
            enabled: true,
          },
          {
            id: "7",
            category: "App Usage Analytics",
            description: "Track how you interact with the app for improvement",
            enabled: true,
          },
          {
            id: "8",
            category: "Third-party Sharing",
            description: "Share anonymized data with research institutions",
            enabled: false,
          },
        ];
        updateSettings(staticSettings);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConsentSettings();
  }, [updateSettings]);

  const handleToggle = (id: string) => {
    const setting = settings.find((s) => s.id === id);
    toggleConsent(id);
    if (setting) {
      setAlert({
        category: setting.category,
        enabled: !setting.enabled,
      });
      // Auto-dismiss after 2.5s
      setTimeout(() => setAlert(null), 2500);
    }
  };

  const getCategoryBadge = (category: string) => {
    const variants = {
      "Mood Tracking": "default",
      "Activity Monitoring": "secondary",
      "Location Data": "warning",
      "Sleep Patterns": "info",
      "Social Interactions": "destructive",
      "Biometric Data": "success",
      "App Usage Analytics": "outline",
      "Third-party Sharing": "warning",
    } as const;

    return (
      <Badge
        variant={variants[category as keyof typeof variants] || "outline"}
        className="text-xs"
      >
        {category}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-4 p-2 sm:space-y-6 sm:p-4">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Consent Manager
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Control what data you share and with whom
          </p>
        </div>
        <Card>
          <CardContent className="flex items-center justify-center h-32">
            <div className="text-muted-foreground">
              Loading consent settings...
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-col-reverse gap-10  space-y-4 p-2 sm:space-y-6 sm:p-4">
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Consent Manager
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Control what data you share and with whom
        </p>
      </div>

      {/* Success Alert Card */}
      {alert && (
        <div className="fixed top-16 md:left-[0] left-0 z-50  w-full px-2 sm:px-0 flex justify-center">
          <Alert
            variant="default"
            className="pointer-events-auto w-full max-w-md bg-green-50 border-green-400 shadow-md animate-in fade-in slide-in-from-top-4 flex flex-col sm:flex-row items-center gap-2"
            style={{ boxShadow: "0 8px 24px 0 rgba(16,185,129,0.10)" }}
          >
            <CheckCircle2 className="text-green-600 w-6 h-6 flex-shrink-0" />
            <div className="flex-1 text-center sm:text-left">
              <AlertTitle className="font-semibold text-green-700">
                {alert.category} consent{" "}
                {alert.enabled ? "enabled" : "disabled"}!
              </AlertTitle>
              <AlertDescription>
                Your preference was updated successfully.
              </AlertDescription>
            </div>
            <button
              className="ml-2 text-green-700 hover:text-green-900 text-xs font-bold"
              onClick={() => setAlert(null)}
              aria-label="Dismiss"
            >
              Dismiss
            </button>
          </Alert>
        </div>
      )}

      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl">
            Data Collection Preferences
          </CardTitle>
          <CardDescription className="text-sm">
            Manage your privacy settings and control what data is collected and
            shared
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 sm:p-6">
          {/* Mobile Card View */}
          <div className="block sm:hidden space-y-3 p-4">
            {settings.map((setting) => (
              <Card key={setting.id} className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    {getCategoryBadge(setting.category)}
                    <Switch
                      checked={setting.enabled}
                      onCheckedChange={() => handleToggle(setting.id)}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {setting.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[150px]">Data Category</TableHead>
                  <TableHead className="min-w-[300px]">Description</TableHead>
                  <TableHead className="text-center min-w-[120px]">
                    Toggle State
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {settings.map((setting) => (
                  <TableRow key={setting.id}>
                    <TableCell>{getCategoryBadge(setting.category)}</TableCell>
                    <TableCell className="max-w-md">
                      {setting.description}
                    </TableCell>
                    <TableCell className="text-center">
                      <Switch
                        checked={setting.enabled}
                        onCheckedChange={() => handleToggle(setting.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg">Active Permissions</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-2">
              {settings
                .filter((s) => s.enabled)
                .map((setting) => (
                  <div key={setting.id} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                    <span className="text-sm break-words">
                      {setting.category}
                    </span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg">Disabled Permissions</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-2">
              {settings
                .filter((s) => !s.enabled)
                .map((setting) => (
                  <div key={setting.id} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full flex-shrink-0"></div>
                    <span className="text-sm text-muted-foreground break-words">
                      {setting.category}
                    </span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
