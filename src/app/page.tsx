'use client';
import Hero from './components/Hero';
import FilterBar, { type Filters } from './components/FilterBar';
import AnimalGrid from './components/AnimalGrid';
import { useAnimals } from '../hooks/useAnimals';
import { useState } from 'react';
import AboutPage from './components/About';


export default function Home() {
  const [filters, setFilters] = useState<Filters>({ q: '', type: 'ALL', size: 'ALL', sex: 'ALL' });
  const { animals, total, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } = useAnimals(filters, 24);


  return (
    <main className="max-w-6xl mx-auto px-4 py-6 space-y-8">
      <Hero />


      <section id="listado" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Animales en adopción</h2>
          <span className="text-sm text-zinc-600 dark:text-zinc-400">{total} resultados</span>
        </div>


        <FilterBar onChange={(f) => {
          setFilters(f);
          // reset de la lista al cambiar filtros: TanStack lo maneja por key
        }} />


        {isLoading ? (
          <div className="py-16 text-center">Cargando...</div>
        ) : isError ? (
          <div className="py-16 text-center text-red-600">Ocurrió un error cargando los animales.</div>
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
      <section id="about" className="space-y-4">
        <AboutPage />
      </section>
    </main>
  );
}