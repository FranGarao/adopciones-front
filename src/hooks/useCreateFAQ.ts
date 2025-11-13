import { useMutation, useQueryClient } from '@tanstack/react-query';
import { faqsService } from '@/services/faqs';
import { CreateFAQPayload } from '@/app/types/faq';

export const useCreateFAQ = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: faqsService.createFAQ,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['faqs'] });
        },
    });
};

export const useUpdateFAQ = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: Partial<CreateFAQPayload> }) =>
            faqsService.updateFAQ(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['faqs'] });
        },
    });
};

export const useDeleteFAQ = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: faqsService.deleteFAQ,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['faqs'] });
        },
    });
};
