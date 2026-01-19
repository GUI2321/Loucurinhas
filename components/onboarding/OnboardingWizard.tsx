"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, UserCircle2, BookOpenCheck, Radar, Plane } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useUserStore, type PatenteInicial } from "@/store/useUserStore";
import { cn } from "@/lib/utils";

const avatarOptions = [
  { id: "falcon", label: "Falcão", icon: Plane },
  { id: "viper", label: "Víbora", icon: ShieldCheck },
  { id: "phoenix", label: "Fênix", icon: Radar },
  { id: "sentinel", label: "Sentinela", icon: UserCircle2 }
];

const inventoryOptions = [
  "Tópicos de Física",
  "FME Iezzi",
  "Irodov",
  "Poliedro",
  "Saraeva"
];

export function OnboardingWizard() {
  const { completarOnboarding, carregarDemo } = useUserStore();
  const [step, setStep] = useState(1);
  const [nomeGuerra, setNomeGuerra] = useState("");
  const [patente, setPatente] = useState<PatenteInicial>("Civil");
  const [avatarId, setAvatarId] = useState("falcon");
  const [inventory, setInventory] = useState<string[]>([]);
  const [ansiedade, setAnsiedade] = useState(5);
  const [horasDisponiveis, setHorasDisponiveis] = useState(4);

  const podeAvancar = useMemo(() => {
    if (step === 1) return nomeGuerra.trim().length > 1 && avatarId.length > 0;
    if (step === 2) return inventory.length > 0;
    return true;
  }, [step, nomeGuerra, avatarId, inventory]);

  const finalizar = () => {
    completarOnboarding({
      profile: {
        nomeGuerra: nomeGuerra.trim(),
        patente,
        avatarId,
        xp: 0,
        hp: 100,
        nivel: 1
      },
      inventory,
      ansiedadeBase: ansiedade,
      horasDisponiveis
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-6 text-zinc-100">
      <Card className="w-full max-w-xl border-cyan-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-cyan-200">
            <ShieldCheck className="h-5 w-5 text-cyan-400" />
            Protocolo de Onboarding
          </CardTitle>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Acesso restrito</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
                className="space-y-5"
              >
                <div className="flex items-center gap-2 text-sm text-cyan-200">
                  <UserCircle2 className="h-4 w-4" />
                  Identificação · Nível 1
                </div>
                <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Ultra Secreto</p>
                <div className="space-y-2">
                  <label className="text-xs uppercase text-zinc-400">Nome de Guerra</label>
                  <Input
                    placeholder="Mendes"
                    value={nomeGuerra}
                    onChange={(event) => setNomeGuerra(event.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase text-zinc-400">Patente Inicial</label>
                  <Select value={patente} onValueChange={(value) => setPatente(value as PatenteInicial)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Civil">Civil</SelectItem>
                      <SelectItem value="Bixo">Bixo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase text-zinc-400">Avatar</label>
                  <div className="grid grid-cols-2 gap-3">
                    {avatarOptions.map((avatar) => (
                      <button
                        key={avatar.id}
                        type="button"
                        onClick={() => setAvatarId(avatar.id)}
                        className={cn(
                          "flex items-center gap-3 rounded-lg border border-border bg-zinc-950/80 p-3 text-left text-sm transition-all duration-300 hover:border-cyan-500/60",
                          avatarId === avatar.id && "border-cyan-500/80 bg-cyan-500/10"
                        )}
                      >
                        <avatar.icon className="h-5 w-5 text-cyan-400" />
                        <span>{avatar.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
                className="space-y-5"
              >
                <div className="flex items-center gap-2 text-sm text-emerald-200">
                  <BookOpenCheck className="h-4 w-4" />
                  Calibragem do Arsenal
                </div>
                <p className="text-sm text-zinc-400">Declare seus recursos.</p>
                <div className="grid gap-3">
                  {inventoryOptions.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() =>
                        setInventory((prev) =>
                          prev.includes(item) ? prev.filter((value) => value !== item) : [...prev, item]
                        )
                      }
                      className={cn(
                        "flex items-center justify-between rounded-lg border border-border bg-zinc-950/80 px-4 py-3 text-sm transition-all duration-300 hover:border-emerald-500/60",
                        inventory.includes(item) && "border-emerald-500/80 bg-emerald-500/10"
                      )}
                    >
                      <span>{item}</span>
                      <span className="text-xs text-zinc-500">
                        {inventory.includes(item) ? "Selecionado" : "Selecionar"}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
                className="space-y-5"
              >
                <div className="flex items-center gap-2 text-sm text-amber-200">
                  <Radar className="h-4 w-4" />
                  Sintonia Mental
                </div>
                <p className="text-sm text-zinc-400">Status Atual.</p>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs uppercase text-zinc-400">Nível de Ansiedade</label>
                    <input
                      type="range"
                      min={0}
                      max={10}
                      value={ansiedade}
                      onChange={(event) => setAnsiedade(Number(event.target.value))}
                      className="mt-2 w-full accent-amber-400"
                    />
                    <p className="text-sm text-zinc-400">{ansiedade} / 10</p>
                  </div>
                  <div>
                    <label className="text-xs uppercase text-zinc-400">
                      Horas Disponíveis por Dia
                    </label>
                    <input
                      type="range"
                      min={1}
                      max={12}
                      value={horasDisponiveis}
                      onChange={(event) => setHorasDisponiveis(Number(event.target.value))}
                      className="mt-2 w-full accent-amber-400"
                    />
                    <p className="text-sm text-zinc-400">{horasDisponiveis} horas</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between gap-3">
            <Button
              variant="ghost"
              onClick={() => setStep((prev) => Math.max(1, prev - 1))}
              disabled={step === 1}
            >
              Voltar
            </Button>
            {step < 3 ? (
              <Button onClick={() => setStep((prev) => prev + 1)} disabled={!podeAvancar}>
                {step === 1 ? "Solicitar Acesso ao Sistema" : "Confirmar Arsenal"}
              </Button>
            ) : (
              <Button onClick={finalizar}>INICIAR OPERAÇÃO</Button>
            )}
          </div>

          {step === 1 && (
            <button
              type="button"
              onClick={carregarDemo}
              className="text-xs text-zinc-500 transition-colors hover:text-cyan-300"
            >
              Modo Demo (Carregar Dados Fictícios)
            </button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
