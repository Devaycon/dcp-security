import { Activity, Bell, Database, Shield } from "lucide-react";
import { DashboardNav } from "../dashboard-nav";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { format } from "date-fns";

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

export const Dashboard = ({
  currentPage,
  setCurrentPage,
}: {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}) => {
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

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex h-full w-full flex-1 flex-col gap-4 bg-white p-2 sm:p-4 md:p-6 lg:p-10 dark:bg-neutral-900">
        <div className="space-y-2 mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            DCP Dashboard
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Manage your data privacy and security settings
          </p>
        </div>

        <div className="hidden lg:block mb-6">
          <DashboardNav currentPage={currentPage} onNav={setCurrentPage} />
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-4 sm:p-6">
            <div className="flex items-center space-x-2">
              <Database className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground flex-shrink-0" />
              <h3 className="font-semibold text-sm sm:text-base">
                Data Overview
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2">
              Monitor your data collection and sharing activities
            </p>
          </Card>

          <Card className="p-4 sm:p-6">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground flex-shrink-0" />
              <h3 className="font-semibold text-sm sm:text-base">
                Consent Manager
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2">
              Control what data you share and with whom
            </p>
          </Card>

          <Card className="p-4 sm:p-6">
            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground flex-shrink-0" />
              <h3 className="font-semibold text-sm sm:text-base">
                Access Logs
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2">
              Track who has accessed your data and when
            </p>
          </Card>

          <Card className="p-4 sm:p-6">
            <div className="flex items-center space-x-2">
              <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground flex-shrink-0" />
              <h3 className="font-semibold text-sm sm:text-base">Alerts</h3>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2">
              Monitor important events and data activities
            </p>
          </Card>
        </div>

        <Card className="w-full hidden md:block">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl">Mood Over Time</CardTitle>
            <CardDescription className="text-sm">
              Track your mood patterns over the past week
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="h-[250px] sm:h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={moodChartData}
                  margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(value) => format(new Date(value), "MMM dd")}
                    fontSize={12}
                  />
                  <YAxis domain={[0, 10]} fontSize={12} />
                  <Tooltip
                    labelFormatter={(value) =>
                      format(new Date(value), "MMM dd, yyyy")
                    }
                    formatter={(value: number) => [`${value}/10`, "Mood Score"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="mood"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
