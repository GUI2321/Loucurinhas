"use client";

import { useState } from "react";
import { Bot, ImagePlus, Send } from "lucide-react";
import { BlockMath } from "react-katex";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const conversation = [
  {
    role: "assistant",
    text: "Vamos decompor o problema. Primeiro, identifique as forças e escolha um referencial inercial.",
    latex: "F = m a"
  },
  {
    role: "user",
    text: "Considere um satélite em órbita circular. Como relacionar velocidade e raio?"
  },
  {
    role: "assistant",
    text: "Use a gravitação newtoniana e iguale força centrípeta:",
    latex: "\nG \\frac{M m}{r^2} = m \\frac{v^2}{r}\n"
  }
];

export function TacticalAISolver() {
  const [message, setMessage] = useState("");

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-4 w-4 text-accent" />
          Tutor Tático IA
        </CardTitle>
      </CardHeader>
      <CardContent className="flex h-[520px] flex-col gap-4">
        <div className="flex-1 space-y-4 overflow-auto rounded-lg border border-border bg-zinc-950 p-4">
          {conversation.map((item, index) => (
            <div
              key={index}
              className={`rounded-lg border border-border p-3 text-sm ${
                item.role === "assistant"
                  ? "bg-zinc-900 text-zinc-100"
                  : "bg-zinc-950 text-zinc-300"
              }`}
            >
              <p className="mb-2 text-xs uppercase text-zinc-500">
                {item.role === "assistant" ? "Tutor" : "Cadete"}
              </p>
              <p className="text-sm text-zinc-200">{item.text}</p>
              {item.latex && (
                <div className="mt-3 rounded-md border border-border bg-black/40 p-3 text-accent">
                  <BlockMath math={item.latex} />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <ImagePlus className="h-4 w-4" />
            Enviar diagrama (apenas UI)
          </div>
          <Input type="file" disabled className="cursor-not-allowed opacity-60" />
          <Textarea
            placeholder="Pergunte ao tutor..."
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          <Button className="w-full">
            <Send className="h-4 w-4" />
            Enviar ao Tutor
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
