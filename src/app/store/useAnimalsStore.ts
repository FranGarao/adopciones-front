'use client';

import { create } from 'zustand';
import type { Animal } from '@/app/types/animal';

type State = {
    byId: Record<string, Animal>;
    setAnimal: (animal: Animal) => void;
    getAnimal: (id: string | number) => Animal | undefined;
};

export const useAnimalsStore = create<State>((set, get) => ({
    byId: {},
    setAnimal: (animal) =>
        set((s) => ({
            byId: { ...s.byId, [String(animal.id)]: animal },
        })),
    getAnimal: (id) => get().byId[String(id)],
}));
