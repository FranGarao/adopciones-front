export interface FAQ {
    id: number;
    question: string;
    answer: string;
    createdAt?: string;
    updatedAt?: string;
}

export type CreateFAQPayload = {
    question: string;
    answer: string;
};

export type UpdateFAQPayload = Partial<CreateFAQPayload>;

// Respuesta paginada del backend
export interface FAQsResponse {
    data: FAQ[];
    total: number;
    limit: number;
    offset: number;
}
