'use client';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import type { Filters } from '../app/components/FilterBar';
import type { Animal } from '../app/types/animal';
import { getAnimal, listAnimals } from '../services/animals';

// Función para filtrar animales localmente
function filterAnimalsLocally(animals: Animal[], filters: Filters): Animal[] {
    return animals.filter(animal => {
        // Filtro por búsqueda de texto
        if (filters.q) {
            const searchTerm = filters.q.toLowerCase();
            const matchesSearch =
                animal.name?.toLowerCase().includes(searchTerm) ||
                animal.breed?.toLowerCase().includes(searchTerm) ||
                animal.location?.toLowerCase().includes(searchTerm) ||
                animal.description?.toLowerCase().includes(searchTerm);
            if (!matchesSearch) return false;
        }

        // Filtro por tipo
        if (filters.type !== 'ALL' && animal.type !== filters.type) {
            return false;
        }

        // Filtro por tamaño
        if (filters.size !== 'ALL' && animal.size !== filters.size) {
            return false;
        }

        // Filtro por sexo
        if (filters.sex !== 'ALL' && animal.sex !== filters.sex) {
            return false;
        }

        // Filtro por edad
        if (filters.age !== 'ALL' && animal.age != null) {
            const age = animal.age;
            switch (filters.age) {
                case '0-3':
                    if (age < 0 || age > 3) return false;
                    break;
                case '3-6':
                    if (age < 3 || age > 6) return false;
                    break;
                case '+6':
                    if (age <= 6) return false;
                    break;
            }
        }

        return true;
    });
}


export function useAnimals(filters: Filters, pageSize = 24) {
    const qk = ['animals', filters, pageSize] as const;
    const query = useInfiniteQuery({
        queryKey: qk,
        queryFn: async ({ pageParam = 0 }) => {
            const { data, total } = await listAnimals({
                q: filters.q || undefined,
                type: filters.type !== 'ALL' ? (filters.type as any) : undefined,
                size: filters.size !== 'ALL' ? (filters.size as any) : undefined,
                sex: filters.sex !== 'ALL' ? (filters.sex as any) : undefined,
                age: filters.age !== 'ALL' ? (filters.age as any) : undefined,
                limit: pageSize,
                offset: pageParam,
            });
            console.log(data);

            return { data, total, offset: pageParam };
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const loaded = allPages.reduce((acc, p) => acc + p.data.length, 0);
            return loaded < lastPage.total ? loaded : undefined;
        },
    });


    const allAnimals = query.data?.pages.flatMap((p) => p.data) ?? [];

    // Aplicar filtrado local
    const filteredAnimals = useMemo(() => {
        return filterAnimalsLocally(allAnimals, filters);
    }, [allAnimals, filters]);

    return {
        ...query,
        animals: filteredAnimals,
        total: filteredAnimals.length
    };
}


export function useAnimal(id?: number) {
    return useQuery({
        queryKey: ['animal', id],
        queryFn: () => getAnimal(id as number),
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
    });
}