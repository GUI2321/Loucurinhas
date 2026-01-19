import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Subject = "Matemática" | "Física" | "Química" | "Português" | "Inglês";

interface TimerState {
  isRunning: boolean;
  elapsedSeconds: number;
  subject: Subject;
  topic: string;
  start: () => void;
  pause: () => void;
  reset: () => void;
  setSubject: (subject: Subject) => void;
  setTopic: (topic: string) => void;
  tick: () => void;
}

interface RPGState {
  rankTitle: string;
  currentXP: number;
  level: number;
  streak: number;
  addXP: (amount: number) => void;
}

interface MissionStore {
  timer: TimerState;
  rpg: RPGState;
}

const rankTitles = ["Cadete", "Aspirante", "Tenente", "Capitão", "Major", "Coronel"];

export const useMissionStore = create<MissionStore>()(
  persist(
    (set, get) => ({
      timer: {
        isRunning: false,
        elapsedSeconds: 0,
        subject: "Física",
        topic: "Termodinâmica",
        start: () =>
          set((state) => ({
            timer: { ...state.timer, isRunning: true }
          })),
        pause: () =>
          set((state) => ({
            timer: { ...state.timer, isRunning: false }
          })),
        reset: () =>
          set((state) => ({
            timer: { ...state.timer, isRunning: false, elapsedSeconds: 0 }
          })),
        setSubject: (subject) =>
          set((state) => ({
            timer: { ...state.timer, subject }
          })),
        setTopic: (topic) =>
          set((state) => ({
            timer: { ...state.timer, topic }
          })),
        tick: () =>
          set((state) => ({
            timer: { ...state.timer, elapsedSeconds: state.timer.elapsedSeconds + 1 }
          }))
      },
      rpg: {
        rankTitle: "Cadete Engenheiro",
        currentXP: 4200,
        level: 7,
        streak: 12,
        addXP: (amount) => {
          const { rpg } = get();
          const newXP = rpg.currentXP + amount;
          const newLevel = Math.floor(newXP / 1000) + 1;
          const newRank = rankTitles[Math.min(rankTitles.length - 1, newLevel - 1)];
          set({
            rpg: {
              ...rpg,
              currentXP: newXP,
              level: newLevel,
              rankTitle: `${newRank} Engenheiro`
            }
          });
        }
      }
    }),
    {
      name: "ita-stratosphere-store"
    }
  )
);
