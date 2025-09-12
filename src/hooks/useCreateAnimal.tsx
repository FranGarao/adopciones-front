'use client';

import { useState } from 'react';
import type { Animal, AnimalSex, AnimalSize, AnimalType } from '@/app/types/animal';

export type CreateAnimalDTO = {
    name: string;
    description?: string | null;
    type: AnimalType;
    sex: AnimalSex;
    size: AnimalSize;
    age_months?: number | null;
    breed?: string | null;
    location?: string | null;
    imageUrl?: string | null;
    gallery?: string[];            // URLs separadas
    vaccinated?: boolean;
    dewormed?: boolean;
    castrated?: boolean;
};

type CreateResult = {
    data: Animal | null;
    error: string | null;
    loading: boolean;
    createAnimal: (payload: CreateAnimalDTO) => Promise<Animal>;
};

export function useCreateAnimal(): CreateResult {
    const [data, setData] = useState<Animal | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function createAnimal(payload: CreateAnimalDTO): Promise<Animal> {
        setLoading(true);
        setError(null);
        setData(null);

        const base = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

        const res = await fetch(`${base}/animals`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const msg = `Error al crear animal (${res.status})`;
            setError(msg);
            setLoading(false);
            throw new Error(msg);
        }

        const json: Animal = await res.json();
        setData(json);
        setLoading(false);
        return json;
    }

    return { data, error, loading, createAnimal };
}
