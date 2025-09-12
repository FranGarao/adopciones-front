// app/adopt/[id]/AdoptClient.tsx
'use client';

import { useEffect, useState } from 'react';
import type { Animal } from '@/app/types/animal';
import { AdoptionForm, type AdoptionFormData } from '@/app/components/AdoptionForm';
import { useAnimalsStore } from '@/app/store/useAnimalsStore';
import { CASI_NEGRO } from '@/Constants/colors';

export default function AdoptClient({ id }: { id: string }) {
    const getAnimal = useAnimalsStore((s) => s.getAnimal);
    const setAnimal = useAnimalsStore((s) => s.setAnimal);

    // intenta leer del store primero (si venís desde la lista)
    const cached = getAnimal(id);
    const [animal, setLocalAnimal] = useState<Animal | null>(cached ?? null);
    const [loading, setLoading] = useState(!cached);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // fallback a fetch si no estaba en el store (entrada directa por URL)
    useEffect(() => {
        if (cached) return;
        const base = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';
        setLoading(true);
        setError(null);
        fetch(`${base}/animals/${id}`)
            .then((r) => {
                if (!r.ok) throw new Error('No se encontró el animal');
                return r.json();
            })
            .then((data: Animal) => {
                setLocalAnimal(data);
                setAnimal(data); // cachear para futuras navegaciones
            })
            .catch((e) => setError(e.message ?? 'Error cargando el animal'))
            .finally(() => setLoading(false));
    }, [id, cached, setAnimal]);

    const handleSubmit = async (data: AdoptionFormData) => {
        setSending(true);
        try {
            const base = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';
            const res = await fetch(`${base}/adoptions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error('No se pudo enviar la solicitud');
            alert('¡Gracias! Te contactaremos pronto.');
        } catch (e: any) {
            alert(e?.message ?? 'Error al enviar la solicitud');
        } finally {
            setSending(false);
        }
    };

    if (loading) return <div className="p-6" style={{ color: CASI_NEGRO }}>Cargando…</div>;
    if (error) return <div className="p-6 text-red-600" style={{ color: CASI_NEGRO }}>{error}</div>;
    if (!animal) return <div className="p-6" style={{ color: CASI_NEGRO }}>No se encontró el animal.</div>;

    return (
        <div className="px-4 py-6">
            <AdoptionForm animal={animal} onSubmit={handleSubmit} isSubmitting={sending} />
        </div>
    );
}
