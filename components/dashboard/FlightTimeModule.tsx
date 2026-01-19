"use client";

import { useEffect, useMemo, useState } from "react";
import { Clock, Play, Square, Tag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useMissionStore, type Subject } from "@/store/useMissionStore";

const subjects: Subject[] = ["Física", "Matemática", "Química", "Português", "Inglês"];

function formatTime(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds].map((value) => value.toString().padStart(2, "0")).join(":");
}

export function FlightTimeModule() {
  const { timer, rpg } = useMissionStore();
  const [topicInput, setTopicInput] = useState("");
  const [topics, setTopics] = useState<string[]>(["Termodinâmica", "Dinâmica Orbital"]);

  useEffect(() => {
    if (!timer.isRunning) return;
    const interval = setInterval(() => {
      timer.tick();
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const formattedTime = useMemo(() => formatTime(timer.elapsedSeconds), [timer.elapsedSeconds]);

  const addTopic = () => {
    if (!topicInput.trim()) return;
    setTopics((prev) => Array.from(new Set([topicInput.trim(), ...prev])));
    setTopicInput("");
  };

  return (
    <Card className="relative overflow-hidden">
      {timer.isRunning && (
        <div className="pointer-events-none absolute right-6 top-6 h-20 w-20 rounded-full border border-accent/40">
          <div className="h-full w-full animate-pulseRing rounded-full border border-accent/70" />
        </div>
      )}
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-zinc-100">
          <Clock className="h-4 w-4 text-accent" />
          Tempo de Voo
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-4xl font-semibold text-white">{formattedTime}</div>
        <div className="flex flex-wrap gap-2">
          {subjects.map((subject) => (
            <Button
              key={subject}
              variant={subject === timer.subject ? "default" : "outline"}
              className="text-xs"
              onClick={() => timer.setSubject(subject)}
            >
              {subject}
            </Button>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Marque um tópico específico"
            value={topicInput}
            onChange={(event) => setTopicInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                addTopic();
              }
            }}
          />
          <Button onClick={addTopic} variant="outline">
            <Tag className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {topics.map((topic) => (
            <Badge key={topic} className="bg-zinc-900 text-zinc-200">
              {timer.subject} · {topic}
            </Badge>
          ))}
        </div>
        <div className="flex gap-3">
          <Button onClick={timer.isRunning ? timer.pause : timer.start}>
            {timer.isRunning ? <Square className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {timer.isRunning ? "Pausar" : "Iniciar"}
          </Button>
          <Button variant="outline" onClick={timer.reset}>
            Reiniciar
          </Button>
          <Button
            variant="ghost"
            className="ml-auto text-xs text-zinc-400"
            onClick={() => rpg.addXP(100)}
          >
            Registrar 1h = +100 XP
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
