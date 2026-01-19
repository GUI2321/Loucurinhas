import { create } from "zustand";
import { persist } from "zustand/middleware";

export type PatenteInicial = "Civil" | "Bixo";

export interface UserProfile {
  nomeGuerra: string;
  patente: PatenteInicial;
  avatarId: string;
  xp: number;
  hp: number;
  nivel: number;
}

interface UserState {
  isOnboarded: boolean;
  profile: UserProfile | null;
  inventory: string[];
  ansiedadeBase: number;
  horasDisponiveis: number;
  completarOnboarding: (data: {
    profile: UserProfile;
    inventory: string[];
    ansiedadeBase: number;
    horasDisponiveis: number;
  }) => void;
  carregarDemo: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      isOnboarded: false,
      profile: null,
      inventory: [],
      ansiedadeBase: 5,
      horasDisponiveis: 4,
      completarOnboarding: ({ profile, inventory, ansiedadeBase, horasDisponiveis }) =>
        set({
          isOnboarded: true,
          profile,
          inventory,
          ansiedadeBase,
          horasDisponiveis
        }),
      carregarDemo: () =>
        set({
          isOnboarded: true,
          profile: {
            nomeGuerra: "Mendes",
            patente: "Bixo",
            avatarId: "falcon",
            xp: 12800,
            hp: 100,
            nivel: 15
          },
          inventory: ["Irodov", "FME Iezzi", "Poliedro"],
          ansiedadeBase: 6,
          horasDisponiveis: 8
        })
    }),
    {
      name: "ita-user-store"
    }
  )
);
