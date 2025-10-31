import { api } from '@/lib/api';
import { Donation, CreateDonationPayload } from '@/app/types/donation';

export const donationsService = {
    // Crear nueva donación
    createDonation: async (data: CreateDonationPayload): Promise<Donation> => {
        const response = await api.post('/donations', data);
        return response.data;
    },

    // Obtener todas las donaciones (para admin)
    getAllDonations: async (): Promise<Donation[]> => {
        const response = await api.get('/donations');
        return response.data;
    },

    // Obtener donación por ID
    getDonationById: async (id: number): Promise<Donation> => {
        const response = await api.get(`/donations/${id}`);
        return response.data;
    },
};
