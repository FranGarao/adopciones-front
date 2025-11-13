'use client';
import { useState } from 'react';
import { AnimalSex, AnimalSize, AnimalType } from '../types/animal';
import { BLANCO_HUESO, CASI_NEGRO } from '../../Constants/colors';

export interface Filters {
    q: string;
    type: AnimalType | 'ALL';
    size: AnimalSize | 'ALL';
    sex: AnimalSex | 'ALL';
}


export default function FilterBar({ onChange, hideTypeFilter = false }: { onChange: (f: Filters) => void, hideTypeFilter?: boolean }) {
    const [filters, setFilters] = useState<Filters>({ q: '', type: 'ALL', size: 'ALL', sex: 'ALL' });


    const update = (patch: Partial<Filters>) => {
        const next = { ...filters, ...patch };
        setFilters(next);
        onChange(next);
    };


    return (
        <div className="flex flex-col md:flex-row gap-3 md:items-end">
            <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Búsqueda</label>
                <input
                    type="text"
                    placeholder="Nombre, raza, ciudad..."
                    className="w-full rounded-xl border border-zinc-300 px-3 py-2"
                    style={{ backgroundColor: BLANCO_HUESO, color: CASI_NEGRO }}
                    value={filters.q}
                    onChange={(e) => update({ q: e.target.value })}
                />
            </div>


            {!hideTypeFilter && (
                <div>
                    <label className="block text-sm font-medium mb-1">Tipo</label>
                    <select
                        className="rounded-xl border border-zinc-300 px-3 py-2"
                        style={{ backgroundColor: BLANCO_HUESO, color: CASI_NEGRO }}
                        value={filters.type}
                        onChange={(e) => update({ type: e.target.value as Filters['type'] })}
                    >
                        <option value="ALL">Todos</option>
                        <option value="DOG">Perro</option>
                        <option value="CAT">Gato</option>
                        <option value="OTHER">Otro</option>
                    </select>
                </div>
            )}


            <div>
                <label className="block text-sm font-medium mb-1">Tamaño</label>
                <select
                    className="rounded-xl border border-zinc-300 px-3 py-2"
                    style={{ backgroundColor: BLANCO_HUESO, color: CASI_NEGRO }}
                    value={filters.size}
                    onChange={(e) => update({ size: e.target.value as Filters['size'] })}
                >
                    <option value="ALL">Todos</option>
                    <option value="SMALL">Pequeño</option>
                    <option value="MEDIUM">Mediano</option>
                    <option value="LARGE">Grande</option>
                </select>
            </div>


            <div>
                <label className="block text-sm font-medium mb-1">Sexo</label>
                <select
                    className="rounded-xl border border-zinc-300 px-3 py-2"
                    style={{ backgroundColor: BLANCO_HUESO, color: CASI_NEGRO }}
                    value={filters.sex}
                    onChange={(e) => update({ sex: e.target.value as Filters['sex'] })}
                >
                    <option value="ALL">Todos</option>
                    <option value="MALE">Macho</option>
                    <option value="FEMALE">Hembra</option>
                </select>
            </div>
        </div>
    );
}