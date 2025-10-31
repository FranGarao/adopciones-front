export interface HomeSection {
    id: number;
    title: string;
    description: string;
    images: string[];
    createdAt?: string;
    updatedAt?: string;
}

export type CreateHomeSectionPayload = {
    title: string;
    description: string;
    images?: string[];
};

export type UpdateHomeSectionPayload = Partial<CreateHomeSectionPayload>;

// Respuesta paginada del backend
export interface SectionsResponse {
    data: HomeSection[];
    total: number;
    limit: number;
    offset: number;
}
