"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import { Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const radarData = [
  { subject: "Matemática", horas: 18 },
  { subject: "Física", horas: 22 },
  { subject: "Química", horas: 14 },
  { subject: "Português", horas: 9 },
  { subject: "Inglês", horas: 11 }
];

const trendData = Array.from({ length: 12 }).map((_, index) => ({
  day: `D${index + 1}`,
  horas: 2 + (index % 4) * 0.8,
  foco: 70 + (index % 5) * 5
}));

const heatmapData = Array.from({ length: 84 }).map((_, index) => ({
  intensity: (index * 13) % 5
}));

const heatmapColors = ["bg-zinc-900", "bg-cyan-900", "bg-cyan-700", "bg-emerald-600", "bg-amber-500"];

export function MissionTelemetry() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-accent" />
          Telemetria da Missão
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="h-56">
          <p className="mb-2 text-xs uppercase text-zinc-500">Equilíbrio por Matéria</p>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData} outerRadius="80%">
              <PolarGrid stroke="#27272a" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: "#a1a1aa", fontSize: 11 }} />
              <Radar
                dataKey="horas"
                stroke="#22d3ee"
                fill="#22d3ee"
                fillOpacity={0.3}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <p className="mb-2 text-xs uppercase text-zinc-500">Densidade de Estudos</p>
          <div className="grid grid-cols-12 gap-1">
            {heatmapData.map((item, index) => (
              <div
                key={index}
                className={cn(
                  "h-3 w-3 rounded-[2px] border border-border",
                  heatmapColors[item.intensity]
                )}
              />
            ))}
          </div>
        </div>

        <div className="h-52">
          <p className="mb-2 text-xs uppercase text-zinc-500">Horas de Estudo vs Foco</p>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ left: -10, right: 10 }}>
              <CartesianGrid stroke="#27272a" strokeDasharray="3 3" />
              <XAxis dataKey="day" tick={{ fill: "#71717a", fontSize: 10 }} />
              <YAxis tick={{ fill: "#71717a", fontSize: 10 }} />
              <Tooltip
                contentStyle={{
                  background: "#0f0f12",
                  border: "1px solid #27272a",
                  fontSize: "12px"
                }}
              />
              <Line type="monotone" dataKey="horas" stroke="#22d3ee" strokeWidth={2} />
              <Line type="monotone" dataKey="foco" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
