"use client";

import { useEffect, useRef } from "react";
import { Flame, Medal, Trophy } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useMissionStore } from "@/store/useMissionStore";

export function RankSystem() {
  const { rpg } = useMissionStore();
  const previousLevel = useRef(rpg.level);

  useEffect(() => {
    if (rpg.level > previousLevel.current) {
      toast.success(`Promoção: você agora é ${rpg.rankTitle}`);
      previousLevel.current = rpg.level;
    }
  }, [rpg.level, rpg.rankTitle]);

  const progress = Math.min(100, (rpg.currentXP % 1000) / 10);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-4 w-4 text-accent-amber" />
          Sistema de Patentes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-zinc-100">{rpg.rankTitle}</p>
            <p className="text-xs text-zinc-500">Nível {rpg.level}</p>
          </div>
          <Badge className="gap-1 border-amber-500/40 bg-amber-500/10 text-amber-200">
            <Medal className="h-3 w-3" />
            Trilho Elite
          </Badge>
        </div>
        <Progress value={progress} />
        <div className="flex items-center justify-between text-xs text-zinc-500">
          <span>{rpg.currentXP.toLocaleString()} XP</span>
          <span>{1000 - (rpg.currentXP % 1000)} XP para o próximo nível</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-zinc-200">
          <Flame className="h-4 w-4 text-accent-amber" />
          Sequência: {rpg.streak} dias
        </div>
      </CardContent>
    </Card>
  );
}
