"use client";

import {
  Brain,
  CalendarCheck,
  Gauge,
  LayoutDashboard,
  Rocket,
  Siren,
  Warehouse,
  HeartPulse,
  Plane,
  ShieldCheck,
  Radar,
  UserCircle2
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useMissionStore } from "@/store/useMissionStore";
import { useUserStore } from "@/store/useUserStore";
import { cn } from "@/lib/utils";

const navigation = [
  { label: "Painel", icon: LayoutDashboard },
  { label: "Plano de Voo", icon: CalendarCheck },
  { label: "Arena", icon: Warehouse },
  { label: "Copiloto", icon: Brain },
  { label: "PsyOps", icon: Gauge }
];

export function Sidebar() {
  const { rpg } = useMissionStore();
  const { profile } = useUserStore();
  const xpAtual = profile?.xp ?? rpg.currentXP;
  const nivelAtual = profile?.nivel ?? rpg.level;
  const progress = Math.min(100, (xpAtual % 1000) / 10);
  const avatarName = profile?.nomeGuerra ?? "Cadete";
  const avatarIcon =
    profile?.avatarId === "viper"
      ? ShieldCheck
      : profile?.avatarId === "phoenix"
        ? Radar
        : profile?.avatarId === "sentinel"
          ? UserCircle2
          : Plane;
  const AvatarIcon = avatarIcon;

  return (
    <aside className="flex h-full w-full flex-col gap-6 rounded-2xl border border-border bg-zinc-950/60 p-6">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarFallback>
            <AvatarIcon className="h-5 w-5 text-cyan-300" />
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-semibold text-zinc-100">{avatarName}</p>
          <p className="text-xs text-zinc-400">{profile?.patente ?? rpg.rankTitle}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>Nível {nivelAtual}</span>
          <span>{xpAtual.toLocaleString()} XP</span>
        </div>
        <Progress value={progress} />
      </div>

      <div className="rounded-xl border border-border bg-zinc-900/50 p-4 text-xs text-zinc-300">
        <div className="flex items-center justify-between">
          <span>HP</span>
          <span className="flex items-center gap-2 text-emerald-300">
            <HeartPulse className="h-4 w-4" />
            {profile?.hp ?? 100}%
          </span>
        </div>
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
