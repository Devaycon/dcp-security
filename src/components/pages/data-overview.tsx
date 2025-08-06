"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
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

interface DataEntry {
  id: string;
  date: string;
  dataType: string;
  details: string;
  source: string;
  sharedWith: string;
  moodScore: number;
}

interface MoodChartData {
  date: string;
  mood: number;
}

export function DataOverviewPage() {
  const [dataEntries, setDataEntries] = useState<DataEntry[]>([]);
  const [moodChartData, setMoodChartData] = useState<MoodChartData[]>([]);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchData = async () => {
      try {
        const response = await fetch("/api/data");
        const data = await response.json();
        setDataEntries(data.dataOverview);
        setMoodChartData(data.moodChartData);
      } catch {
        // Fallback to static data
        const staticData = {
          dataOverview: [
            {
              id: "1",
              date: "2024-01-15T10:30:00Z",
              dataType: "Mood Log",
              details: "Feeling optimistic about the day ahead",
              source: "User Input",
              sharedWith: "Therapist",
              moodScore: 8,
            },
            {
              id: "2",
              date: "2024-01-15T14:20:00Z",
              dataType: "Activity",
              details: "30 minute walk in the park",
              source: "GPS",
              sharedWith: "–",
              moodScore: 7,
            },
            {
              id: "3",
              date: "2024-01-15T18:45:00Z",
              dataType: "Mood Log",
              details: "Feeling tired but accomplished",
              source: "User Input",
              sharedWith: "Therapist",
              moodScore: 6,
            },
            {
              id: "4",
              date: "2024-01-14T09:15:00Z",
              dataType: "Activity",
              details: "Morning meditation session",
              source: "App Backend",
              sharedWith: "External",
              moodScore: 9,
            },
            {
              id: "5",
              date: "2024-01-14T16:30:00Z",
              dataType: "Mood Log",
              details: "Feeling anxious about upcoming meeting",
              source: "User Input",
              sharedWith: "Therapist",
              moodScore: 4,
            },
          ],
          moodChartData: [
            { date: "2024-01-08", mood: 7 },
            { date: "2024-01-09", mood: 6 },
            { date: "2024-01-10", mood: 8 },
            { date: "2024-01-11", mood: 5 },
            { date: "2024-01-12", mood: 7 },
            { date: "2024-01-13", mood: 9 },
            { date: "2024-01-14", mood: 4 },
            { date: "2024-01-15", mood: 8 },
          ],
        };
        setDataEntries(staticData.dataOverview);
        setMoodChartData(staticData.moodChartData);
      }
    };

    fetchData();
  }, []);

  const getDataTypeBadge = (dataType: string) => {
    const variants = {
      "Mood Log": "default",
      Activity: "secondary",
      "Sleep Data": "info",
      Biometric: "success",
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

  const getSourceBadge = (source: string) => {
    const variants = {
      "User Input": "default",
      GPS: "secondary",
      "App Backend": "info",
      SDK: "success",
    } as const;

    return (
      <Badge
        variant={variants[source as keyof typeof variants] || "outline"}
        className="text-xs"
      >
        {source}
      </Badge>
    );
  };

  return (
    <div className="space-y-4 p-2 sm:space-y-6 sm:p-4">
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Data Overview
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Monitor your data collection and sharing activities
        </p>
      </div>

      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl">
            Recent Data Entries
          </CardTitle>
          <CardDescription className="text-sm">
            A comprehensive view of all your data entries and their sharing
            status
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 sm:p-6">
          {/* Mobile Card View */}
          <div className="block sm:hidden space-y-3 p-4">
            {dataEntries.map((entry) => (
              <Card key={entry.id} className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex flex-wrap gap-1">
                      {getDataTypeBadge(entry.dataType)}
                      {getSourceBadge(entry.source)}
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {format(new Date(entry.date), "MMM dd, HH:mm")}
                    </span>
                  </div>
                  <p className="text-sm font-medium">{entry.details}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      Shared with:
                    </span>
                    {entry.sharedWith === "–" ? (
                      <span className="text-xs text-muted-foreground">–</span>
                    ) : (
                      <Badge variant="outline" className="text-xs">
                        {entry.sharedWith}
                      </Badge>
                    )}
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
                  <TableHead className="min-w-[120px]">Date</TableHead>
                  <TableHead className="min-w-[100px]">Data Type</TableHead>
                  <TableHead className="min-w-[200px]">Details</TableHead>
                  <TableHead className="min-w-[100px]">Source</TableHead>
                  <TableHead className="min-w-[120px]">Shared With</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataEntries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="font-medium">
                      {format(new Date(entry.date), "MMM dd, yyyy HH:mm")}
                    </TableCell>
                    <TableCell>{getDataTypeBadge(entry.dataType)}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {entry.details}
                    </TableCell>
                    <TableCell>{getSourceBadge(entry.source)}</TableCell>
                    <TableCell>
                      {entry.sharedWith === "–" ? (
                        <span className="text-muted-foreground">–</span>
                      ) : (
                        <Badge variant="outline">{entry.sharedWith}</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
