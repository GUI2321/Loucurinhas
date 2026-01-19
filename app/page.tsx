"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { FlightTimeModule } from "@/components/dashboard/FlightTimeModule";
import { MissionTelemetry } from "@/components/dashboard/MissionTelemetry";
import { TacticalAISolver } from "@/components/dashboard/TacticalAISolver";
import { PsyOpsModule } from "@/components/dashboard/PsyOpsModule";
import { RankSystem } from "@/components/dashboard/RankSystem";
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";
import { useUserStore } from "@/store/useUserStore";

export default function HomePage() {
  const { isOnboarded, profile } = useUserStore();

  if (!isOnboarded) {
    return <OnboardingWizard />;
  }

  return (
    <main className="min-h-screen bg-background p-6">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[280px_1fr]">
        <Sidebar />
        <Tabs defaultValue="dashboard" className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">ITA Stratosphere</p>
              <h1 className="text-2xl font-semibold text-white">
                Centro de Operações · {profile?.nomeGuerra}
              </h1>
            </div>
            <TabsList>
              <TabsTrigger value="dashboard">Painel</TabsTrigger>
              <TabsTrigger value="ai">Copiloto</TabsTrigger>
              <TabsTrigger value="psyops">Psicólogo</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
              <FlightTimeModule />
              <RankSystem />
            </div>
            <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
              <MissionTelemetry />
              <PsyOpsModule />
            </div>
          </TabsContent>
          <TabsContent value="ai">
            <TacticalAISolver />
          </TabsContent>
          <TabsContent value="psyops">
            <PsyOpsModule />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
