export type AnimalType = 'DOG' | 'CAT' | 'OTHER';
export type AnimalSize = 'SMALL' | 'MEDIUM' | 'LARGE' | 'UNKNOWN';
export type AnimalSex = 'MALE' | 'FEMALE' | 'UNKNOWN';


export interface Animal {
    id: number;
    name: string;
    type: AnimalType;
    size: AnimalSize;
    sex: AnimalSex;
    age_months?: number | null;
    breed?: string | null;
    location?: string | null; // ciudad / provincia
    imageUrl?: string | null;
    mainImage?: File | null;
    createdAt?: string; // ISO
    videos?: string[];
    gallery?: string[];
    tags?: string[];
    vaccinated?: boolean;
    dewormed?: boolean;
    castrated?: boolean;
    description?: string | null;
}



export type CreateAnimalPayload = {
    name: string;
    description?: string | null;
    type: AnimalType;
    sex: AnimalSex;
    size: AnimalSize;
    age_months?: number | null;
    breed?: string | null;
    location?: string | null;

    // Nuevo campo para el archivo de imagen
    mainImage?: File | null;

    vaccinated?: boolean;
    dewormed?: boolean;
    castrated?: boolean;
};