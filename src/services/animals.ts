import { api } from '../lib/api';
import type { Animal, AnimalSex, AnimalSize, AnimalType } from '../app/types/animal';


export type ListAnimalsParams = {
    q?: string;
    type?: AnimalType;
    size?: AnimalSize;
    sex?: AnimalSex;
    limit?: number;
    offset?: number; // o page: number
};


export interface PaginatedAnimals {
    data: Animal[];
    total: number;
}


export async function listAnimals(params: ListAnimalsParams): Promise<PaginatedAnimals> {
    const { data } = await api.get<PaginatedAnimals>('/animals', {
        params: {
            q: params.q || undefined,
            type: params.type || undefined,
            size: params.size || undefined,
            sex: params.sex || undefined,
            limit: params.limit ?? 24,
            offset: params.offset ?? 0,
        },
    });
    console.log({ data1: data });
    return data;
}


export async function getAnimal(id: number): Promise<Animal> {
    const { data } = await api.get<Animal>(`/animals/${id}`);
    return data;
}