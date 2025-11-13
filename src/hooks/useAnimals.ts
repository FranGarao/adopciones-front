'use client';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import type { Filters } from '../app/components/FilterBar';
import { getAnimal, listAnimals } from '../services/animals';


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


    const animals = query.data?.pages.flatMap((p) => p.data) ?? [];
    const total = query.data?.pages.at(-1)?.total ?? 0;
    return { ...query, animals, total };
}


export function useAnimal(id?: number) {
    return useQuery({
        queryKey: ['animal', id],
        queryFn: () => getAnimal(id as number),
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
    });
}