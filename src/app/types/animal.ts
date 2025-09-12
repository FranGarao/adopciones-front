export type AnimalType = 'DOG' | 'CAT' | 'OTHER';
export type AnimalSize = 'SMALL' | 'MEDIUM' | 'LARGE' | 'XL' | 'UNKNOWN';
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
    createdAt?: string; // ISO
    gallery?: string[];
    tags?: string[];
    vaccinated?: boolean;
    dewormed?: boolean;
    castrated?: boolean;
    description?: string | null;
}