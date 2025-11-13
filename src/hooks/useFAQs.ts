import { useQuery } from '@tanstack/react-query';
import { faqsService } from '@/services/faqs';

export const useFAQs = () => {
    return useQuery({
        queryKey: ['faqs', 'active'],
        queryFn: faqsService.getActiveFAQs,
        staleTime: 5 * 60 * 1000, // 5 minutos
    });
};

export const useAllFAQs = () => {
    return useQuery({
        queryKey: ['faqs', 'all'],
        queryFn: faqsService.getAllFAQs,
        staleTime: 1 * 60 * 1000, // 1 minuto para admin
    });
};
