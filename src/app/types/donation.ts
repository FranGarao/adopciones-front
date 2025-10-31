export type DonationType = 'PETSHOP' | 'GARAGE_SALE' | 'CLEANING_SUPPLIES' | 'MEDICATION' | 'FOOD' | 'OTHER';

export interface Donation {
    id: number;
    firstName: string;
    lastName: string;
    contact: string; // teléfono o email
    donationType: DonationType;
    description: string;
    createdAt?: string;
}

export type CreateDonationPayload = {
    firstName: string;
    lastName: string;
    contact: string;
    donationType: DonationType;
    description: string;
};

export const DONATION_TYPE_LABELS: Record<DonationType, string> = {
    PETSHOP: 'Petshop',
    GARAGE_SALE: 'Venta de garage',
    CLEANING_SUPPLIES: 'Artículos de limpieza',
    MEDICATION: 'Medicación',
    FOOD: 'Alimento',
    OTHER: 'Otros'
};
