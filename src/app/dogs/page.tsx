'use client';

import { CASI_NEGRO } from "@/Constants/colors";
import FilterBar, { Filters } from "../components/FilterBar";
import AnimalGrid from "../components/AnimalGrid";
import { useAnimals } from "@/hooks/useAnimals";
import { useState } from "react";

export default function DogsPage() {
    const [filters, setFilters] = useState<Filters>({ q: '', type: 'DOG', size: 'ALL', sex: 'ALL' });
    const { animals, total, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } = useAnimals(filters, 24);

    return (
        <section id="listado" className="space-y-4 py-8 px-24">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold" style={{ color: CASI_NEGRO }}>Perros en adopción</h2>
                <span className="text-sm" style={{ color: CASI_NEGRO + '99' }}>{total} resultados</span>
            </div>

            <FilterBar
                onChange={(f) => {
                    // Mantener el tipo como DOG siempre
                    setFilters({ ...f, type: 'DOG' });
                }}
                hideTypeFilter={true}
            />

            {isLoading ? (
                <div className="py-16 text-center" style={{ color: CASI_NEGRO }}>Cargando...</div>
            ) : isError ? (
                <div className="py-16 text-center text-red-600" style={{ color: CASI_NEGRO }}>Ocurrió un error cargando los perros.</div>
            ) : (
                <>
                    <AnimalGrid animals={animals} />
                    <div className="flex justify-center mt-6">
                        {hasNextPage && (
                            <button
                                onClick={() => fetchNextPage()}
                                disabled={isFetchingNextPage}
                                className="px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                            >
                                {isFetchingNextPage ? 'Cargando…' : 'Cargar más'}
                            </button>
                        )}
                    </div>
                </>
            )}
        </section>
    )
}
