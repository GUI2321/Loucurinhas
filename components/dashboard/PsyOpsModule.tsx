"use client";

import { useMemo, useState } from "react";
import { BrainCircuit, ShieldAlert } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const performanceData = Array.from({ length: 10 }).map((_, index) => ({
  day: `S${index + 1}`,
  ansiedade: 4 + (index % 3) * 2,
  desempenho: 75 + (index % 4) * 4
}));

export function PsyOpsModule() {
  const [anxiety, setAnxiety] = useState(6);
  const [fatigue, setFatigue] = useState(4);
  const showEmergency = anxiety > 8;

  const anxietyLabel = useMemo(() => (anxiety > 7 ? "Crítico" : "Operacional"), [anxiety]);

  return (
    <Card className="relative h-full border-blue-900/50 bg-gradient-to-br from-[#0b1220] to-[#0a0f1a]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-200">
          <BrainCircuit className="h-4 w-4 text-blue-400" />
          Psicólogo de Desempenho PsyOps
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <p className="text-xs uppercase text-blue-200/70">Nível de Ansiedade</p>
            <input
              type="range"
              min={0}
              max={10}
              value={anxiety}
              onChange={(event) => setAnxiety(Number(event.target.value))}
              className="w-full accent-blue-400"
            />
            <p className="text-sm text-blue-100">{anxiety} / 10 · {anxietyLabel}</p>
          </div>
          <div className="space-y-2">
            <p className="text-xs uppercase text-blue-200/70">Nível de Fadiga</p>
            <input
              type="range"
              min={0}
              max={10}
              value={fatigue}
              onChange={(event) => setFatigue(Number(event.target.value))}
              className="w-full accent-indigo-300"
            />
            <p className="text-sm text-blue-100">{fatigue} / 10 · Estável</p>
          </div>
        </div>

        <div className="h-52 rounded-xl border border-blue-900/50 bg-[#0b1322] p-3">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <CartesianGrid stroke="#1f2a44" strokeDasharray="3 3" />
              <XAxis dataKey="day" tick={{ fill: "#94a3b8", fontSize: 10 }} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 10 }} />
              <Tooltip
                contentStyle={{
                  background: "#0b1220",
                  border: "1px solid #1f2a44",
                  fontSize: "12px",
                  color: "#e2e8f0"
                }}
              />
              <Line type="monotone" dataKey="ansiedade" stroke="#60a5fa" strokeWidth={2} />
              <Line type="monotone" dataKey="desempenho" stroke="#a78bfa" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-blue-900/50 bg-[#0b1322] p-4">
          <div>
            <p className="text-xs uppercase text-blue-200/60">Orientação do Coach</p>
            <p className="text-sm text-blue-100">
              Mantenha a proporção 2:1 entre trabalho profundo e recuperação. Observe a respiração.
            </p>
          </div>
          <Button variant="outline" className="border-blue-800 text-blue-100 hover:bg-blue-900/40">
            Registrar Reflexão
          </Button>
        </div>
      </CardContent>

      {showEmergency && (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/80 p-6">
          <div className="max-w-md space-y-4 rounded-2xl border border-blue-500/50 bg-[#0b1220] p-6 text-center">
            <ShieldAlert className="mx-auto h-8 w-8 text-blue-400" />
            <p className="text-lg font-semibold text-blue-100">Protocolo de Emergência</p>
            <p className="text-sm text-blue-200/70">
              Respiração 4-7-8: inspire 4s, segure 7s, expire 8s. Repita 4 ciclos.
            </p>
            <Button className="w-full">Entendido</Button>
          </div>
        </div>
      )}
    </Card>
  );
}
