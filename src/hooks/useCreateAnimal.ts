'use client';

import { useState } from 'react';
import type { Animal, AnimalSex, AnimalSize, AnimalType, CreateAnimalPayload } from '@/app/types/animal';

type CreateResult = {
    data: Animal | null;
    error: string | null;
    loading: boolean;
    createAnimal: (payload: CreateAnimalPayload) => Promise<Animal>;
};

export function useCreateAnimal(): CreateResult {
    const [data, setData] = useState<Animal | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function createAnimal(payload: CreateAnimalPayload): Promise<Animal> {
        setLoading(true);
        setError(null);
        setData(null);

        const base = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

        // 1. Crear FormData
        const formData = new FormData();

        console.log('payload', payload);
        // 2. Adjuntar la imagen principal (si existe)
        // El nombre 'main' debe coincidir con el interceptor de NestJS: { name: 'main', maxCount: 1 }
        if (payload.mainImage) {
            formData.append('main', payload.mainImage, payload.mainImage.name);
        }


        // 3. Adjuntar el resto de los campos de texto
        // Los campos de texto deben ser convertidos a strings
        for (const key in payload) {
            // Excluir el archivo de la iteración (ya se agregó)
            if (key === 'mainImage') continue;

            const value = payload[key as keyof CreateAnimalPayload];
            if (value !== undefined && value !== null) {
                // NestJS espera campos de texto, no objetos File.
                // Los booleanos y números se deben enviar como strings para FormData.
                formData.append(key, String(value));
            }
        }


        const res = await fetch(`${base}/animals`, {
            method: 'POST',
            // headers: { 'Content-Type': 'application/json' },
            body: formData,
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
