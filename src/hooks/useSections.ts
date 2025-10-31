import { useQuery } from '@tanstack/react-query';
import { sectionsService } from '@/services/sections';

export const useSections = () => {
    return useQuery({
        queryKey: ['sections', 'active'],
        queryFn: sectionsService.getActiveSections,
        staleTime: 5 * 60 * 1000, // 5 minutos
    });
};

export const useAllSections = () => {
    return useQuery({
        queryKey: ['sections', 'all'],
        queryFn: sectionsService.getAllSections,
        staleTime: 1 * 60 * 1000, // 1 minuto para admin
    });
};
