import { api } from '@/lib/api';
import { FAQ, CreateFAQPayload, UpdateFAQPayload, FAQsResponse } from '@/app/types/faq';

export const faqsService = {
    // Obtener todas las FAQs (para home)
    getActiveFAQs: async (): Promise<FAQ[]> => {
        const response = await api.get<FAQsResponse>('/faqs');
        return response.data.data; // Retorna solo el array de FAQs
    },

    // Obtener todas las FAQs (para admin)
    getAllFAQs: async (): Promise<FAQ[]> => {
        const response = await api.get<FAQsResponse>('/faqs');
        return response.data.data; // Retorna solo el array de FAQs
    },

    // Obtener FAQ por ID
    getFAQById: async (id: number): Promise<FAQ> => {
        const response = await api.get(`/faqs/${id}`);
        return response.data;
    },

    // Crear nueva FAQ
    createFAQ: async (data: CreateFAQPayload): Promise<FAQ> => {
        const response = await api.post('/faqs', data);
        return response.data;
    },

    // Actualizar FAQ
    updateFAQ: async (id: number, data: UpdateFAQPayload): Promise<FAQ> => {
        const response = await api.patch(`/faqs/${id}`, data);
        return response.data;
    },

    // Eliminar FAQ
    deleteFAQ: async (id: number): Promise<void> => {
        await api.delete(`/faqs/${id}`);
    },
};
