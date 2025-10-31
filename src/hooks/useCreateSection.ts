import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sectionsService } from '@/services/sections';
import { CreateHomeSectionPayload } from '@/app/types/section';

export const useCreateSection = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: sectionsService.createSection,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sections'] });
        },
    });
};

export const useCreateSectionWithImage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: sectionsService.createSectionWithImage,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sections'] });
        },
    });
};

export const useUpdateSection = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: Partial<CreateHomeSectionPayload> }) =>
            sectionsService.updateSection(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sections'] });
        },
    });
};

export const useUpdateSectionWithImage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: FormData }) =>
            sectionsService.updateSectionWithImage(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sections'] });
        },
    });
};

export const useDeleteSection = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: sectionsService.deleteSection,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sections'] });
        },
    });
};
