import { api } from '@/lib/api';
import { HomeSection, CreateHomeSectionPayload, UpdateHomeSectionPayload, SectionsResponse } from '@/app/types/section';

export const sectionsService = {
    // Obtener todas las secciones (para home - sin filtros específicos)
    getActiveSections: async (): Promise<HomeSection[]> => {
        const response = await api.get<SectionsResponse>('/sections?limit=4&offset=0');
        return response.data.data; // Retorna solo el array de secciones
    },

    // Obtener todas las secciones (para admin)
    getAllSections: async (): Promise<HomeSection[]> => {
        const response = await api.get<SectionsResponse>('/sections');
        return response.data.data; // Retorna solo el array de secciones
    },

    // Obtener sección por ID
    getSectionById: async (id: number): Promise<HomeSection> => {
        const response = await api.get(`/sections/${id}`);
        return response.data;
    },

    // Crear nueva sección
    createSection: async (data: CreateHomeSectionPayload): Promise<HomeSection> => {
        const response = await api.post('/sections', data);
        return response.data;
    },

    // Actualizar sección
    updateSection: async (id: number, data: UpdateHomeSectionPayload): Promise<HomeSection> => {
        const response = await api.patch(`/sections/${id}`, data);
        return response.data;
    },

    // Eliminar sección
    deleteSection: async (id: number): Promise<void> => {
        await api.delete(`/sections/${id}`);
    },

    // Crear sección con imagen (usando FormData)
    createSectionWithImage: async (data: FormData): Promise<HomeSection> => {
        const response = await api.post('/sections', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        // El backend retorna { success: true, data: section }
        return response.data.data || response.data;
    },

    // Actualizar sección con imagen (usando FormData)
    updateSectionWithImage: async (id: number, data: FormData): Promise<HomeSection> => {
        const response = await api.patch(`/sections/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },
};
