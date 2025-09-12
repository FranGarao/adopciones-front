'use client';

import { useEffect, useMemo, useState } from 'react';
import { useAnimalsStore } from '@/app/store/useAnimalsStore';
import { AnimalProfile } from '@/app/components/AnimalProfile';
import type { Animal } from '@/app/types/animal';

export default function AnimalProfileClient({ id }: { id: string }) {
    const getAnimal = useAnimalsStore((s) => s.getAnimal);
    const setAnimal = useAnimalsStore((s) => s.setAnimal);

    const cached = getAnimal(id);
    const [animal, setLocalAnimal] = useState<Animal | null>(cached ?? null);
    const [loading, setLoading] = useState(!cached);

    useEffect(() => {
        if (cached) return; // ya lo tenemos
        const base = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';
        setLoading(true);
        fetch(`${base}/animals/${id}`)
            .then((r) => {
                if (!r.ok) throw new Error('No encontrado');
                return r.json();
            })
            .then((data: Animal) => {
                setLocalAnimal(data);
                setAnimal(data); // cachearlo para futuras navegaciones
            })
            .catch(() => setLocalAnimal(null))
            .finally(() => setLoading(false));
    }, [id, cached, setAnimal]);

    if (loading) return <div className="p-6">Cargando…</div>;
    if (!animal) return <div className="p-6">No se encontró el animal.</div>;

    return (
        <div className="px-4 py-6">
            <AnimalProfile animal={animal} onAdopt={(a: Animal) => {
                if (typeof window !== "undefined") window.location.href = `/adopt/${a.id}`;
            }} />
        </div>
    );
}
