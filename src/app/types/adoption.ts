export interface AdoptionFormData {
    // Información personal
    fullName: string;
    age: number;
    address: string;

    // Vivienda
    housingType: 'casa' | 'departamento';
    housingOwnership: 'propio' | 'alquilado' | 'prestado';

    // Familia
    familyComposition: string;
    hasChildren: boolean;
    childrenAges?: string;

    // Mascotas
    hasOtherPets: boolean;
    otherPetsDetails?: string;

    // Alergias
    hasAllergies: boolean;

    // Compromiso
    willNeuter: boolean;
    understandsIndoorOnly: boolean;

    // Situaciones futuras
    futureChangesPlans: string;

    // Seguridad
    hasProtections: boolean;

    // Responsabilidad económica
    understandsEconomicResponsibility: boolean;

    // Mascotas anteriores
    previousPets: string;

    // Compromisos de seguimiento
    willSendNeuterPhoto: boolean;
    acceptsFollowUp: boolean;

    // Información del animal
    animalId: number;
    animalName: string;
}

export interface AdoptionSubmissionResponse {
    success: boolean;
    message: string;
    id?: number;
}
