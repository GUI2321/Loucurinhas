"use client";

import {
  Brain,
  CalendarCheck,
  Gauge,
  LayoutDashboard,
  Rocket,
  Siren,
  Warehouse
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useMissionStore } from "@/store/useMissionStore";
import { cn } from "@/lib/utils";

const navigation = [
  { label: "Painel", icon: LayoutDashboard },
  { label: "Diário de Voo", icon: CalendarCheck },
  { label: "Hangar", icon: Warehouse },
  { label: "Canal de Comunicação", icon: Brain },
  { label: "Telemetria", icon: Gauge }
];

export function Sidebar() {
  const { rpg } = useMissionStore();
  const progress = Math.min(100, (rpg.currentXP % 1000) / 10);

  return (
    <aside className="flex h-full w-full flex-col gap-6 rounded-2xl border border-border bg-zinc-950/60 p-6">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarFallback>IS</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-semibold text-zinc-100">Aline Silva</p>
          <p className="text-xs text-zinc-400">{rpg.rankTitle}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>Nível {rpg.level}</span>
          <span>{rpg.currentXP.toLocaleString()} XP</span>
        </div>
        <Progress value={progress} />
      </div>

      <div className="space-y-2">
        {navigation.map((item) => (
          <button
            key={item.label}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg border border-transparent px-3 py-2 text-sm text-zinc-300 transition-all duration-300 hover:border-border hover:bg-zinc-900",
              item.label === "Painel" &&
                "border-border bg-zinc-900 text-white shadow-glow"
            )}
          >
            <item.icon className="h-4 w-4 text-accent" />
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-auto space-y-3 rounded-xl border border-border bg-zinc-900/60 p-4">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <Rocket className="h-4 w-4 text-accent-emerald" />
          <span>Ações Rápidas</span>
        </div>
        <Button className="w-full" variant="outline">
          <Siren className="h-4 w-4 text-accent-amber" />
          Botão de Pânico
        </Button>
      </div>
    </aside>
  );
}
