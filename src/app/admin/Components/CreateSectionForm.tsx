'use client';

import { useState } from 'react';
import {
    useCreateSection,
    useCreateSectionWithImage,
    useUpdateSection,
    useUpdateSectionWithImage
} from '@/hooks/useCreateSection';
import { HomeSection, CreateHomeSectionPayload } from '@/app/types/section';
import { VERDE_PRINCIPAL, VERDE_ACENTO, CASI_NEGRO, BLANCO_HUESO } from '@/Constants/colors';
import Swal from 'sweetalert2';

interface CreateSectionFormProps {
    section?: HomeSection;
    onSuccess?: () => void;
    onCancel?: () => void;
}

export default function CreateSectionForm({ section, onSuccess, onCancel }: CreateSectionFormProps) {
    const [formData, setFormData] = useState<CreateHomeSectionPayload>({
        title: section?.title || '',
        description: section?.description || '',
        images: section?.images || [],
    });
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>(
        section?.images || []
    );

    const createMutation = useCreateSection();
    const createWithImageMutation = useCreateSectionWithImage();
    const updateMutation = useUpdateSection();
    const updateWithImageMutation = useUpdateSectionWithImage();

    const isEditing = !!section;
    const isLoading = createMutation.isPending || createWithImageMutation.isPending ||
        updateMutation.isPending || updateWithImageMutation.isPending;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
            setImageFiles(files);

            // Crear previews para todas las imágenes
            const previews: string[] = [];
            files.forEach((file) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    previews.push(reader.result as string);
                    if (previews.length === files.length) {
                        setImagePreviews(previews);
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const removeImage = (index: number) => {
        const newFiles = imageFiles.filter((_, i) => i !== index);
        const newPreviews = imagePreviews.filter((_, i) => i !== index);
        setImageFiles(newFiles);
        setImagePreviews(newPreviews);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title.trim() || !formData.description.trim()) {
            Swal.fire({
                title: 'Campos requeridos',
                text: 'Por favor, completa el título y descripción.',
                icon: 'warning',
                confirmButtonColor: VERDE_PRINCIPAL,
            });
            return;
        }

        try {
            if (imageFiles.length > 0) {
                // Si hay imágenes, usar FormData
                const formDataToSend = new FormData();
                formDataToSend.append('title', formData.title);
                formDataToSend.append('description', formData.description);

                // Agregar todas las imágenes con el nombre 'images'
                imageFiles.forEach((file) => {
                    formDataToSend.append('images', file);
                });

                if (isEditing) {
                    await updateWithImageMutation.mutateAsync({ id: section.id, data: formDataToSend });
                } else {
                    await createWithImageMutation.mutateAsync(formDataToSend);
                }
            } else {
                // Si no hay imágenes, usar JSON
                const jsonData = {
                    title: formData.title,
                    description: formData.description,
                };

                if (isEditing) {
                    await updateMutation.mutateAsync({ id: section.id, data: jsonData });
                } else {
                    await createMutation.mutateAsync(jsonData);
                }
            }

            Swal.fire({
                title: '¡Éxito!',
                text: `Sección ${isEditing ? 'actualizada' : 'creada'} correctamente.`,
                icon: 'success',
                confirmButtonColor: VERDE_PRINCIPAL,
            });

            // Reset form
            if (!isEditing) {
                setFormData({
                    title: '',
                    description: '',
                    images: [],
                });
                setImageFiles([]);
                setImagePreviews([]);
            }

            onSuccess?.();
        } catch (error) {
            console.error('Error saving section:', error);
            Swal.fire({
                title: 'Error',
                text: `Hubo un problema al ${isEditing ? 'actualizar' : 'crear'} la sección.`,
                icon: 'error',
                confirmButtonColor: VERDE_PRINCIPAL,
            });
        }
    };

    const handleInputChange = (field: keyof CreateHomeSectionPayload, value: string | number | boolean) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6" style={{ color: CASI_NEGRO }}>
                {isEditing ? 'Editar Sección' : 'Crear Nueva Sección'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: CASI_NEGRO }}>
                        Título *
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className="w-full rounded-xl border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2"
                        style={{
                            backgroundColor: BLANCO_HUESO,
                            color: CASI_NEGRO
                        }}
                        placeholder="Título de la sección"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: CASI_NEGRO }}>
                        Descripción *
                    </label>
                    <textarea
                        required
                        rows={6}
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        className="w-full rounded-xl border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 resize-none"
                        style={{
                            backgroundColor: BLANCO_HUESO,
                            color: CASI_NEGRO
                        }}
                        placeholder="Descripción de la sección (puedes usar HTML básico)"
                    />
                </div>


                <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: CASI_NEGRO }}>
                        Imágenes (opcional - máximo 10)
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="w-full rounded-xl border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2"
                        style={{
                            backgroundColor: BLANCO_HUESO,
                            color: CASI_NEGRO
                        }}
                    />
                    {imagePreviews.length > 0 && (
                        <div className="mt-2 grid grid-cols-3 gap-2">
                            {imagePreviews.map((preview, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={preview}
                                        alt={`Preview ${index + 1}`}
                                        className="w-full h-24 object-cover rounded-xl border border-zinc-300"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex gap-3 pt-4">
                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 px-4 py-2 rounded-xl border border-zinc-300 hover:bg-zinc-50 transition-colors"
                            style={{ color: CASI_NEGRO }}
                        >
                            Cancelar
                        </button>
                    )}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 px-4 py-2 rounded-xl text-white font-semibold transition-colors disabled:opacity-50"
                        style={{ backgroundColor: VERDE_PRINCIPAL }}
                        onMouseEnter={(e) => !isLoading && (e.currentTarget.style.backgroundColor = VERDE_ACENTO)}
                        onMouseLeave={(e) => !isLoading && (e.currentTarget.style.backgroundColor = VERDE_PRINCIPAL)}
                    >
                        {isLoading ? 'Guardando...' : (isEditing ? 'Actualizar Sección' : 'Crear Sección')}
                    </button>
                </div>
            </form>
        </div>
    );
}
