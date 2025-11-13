'use client';

import { useState } from 'react';
import { useAllSections } from '@/hooks/useSections';
import { useDeleteSection } from '@/hooks/useCreateSection';
import { HomeSection } from '@/app/types/section';
import { VERDE_PRINCIPAL, VERDE_ACENTO, CASI_NEGRO, BLANCO_HUESO } from '@/Constants/colors';
import CreateSectionForm from './CreateSectionForm';
import Swal from 'sweetalert2';

// Aux: Hace resolve de la imagen igual que los animals
function resolveImageSrc(src: string) {
    if (src.startsWith('http')) return src;
    return (process.env.NEXT_PUBLIC_IMAGES_URL ?? '') + src;
}

export default function SectionsManager() {
    const { data: sections, isLoading, isError } = useAllSections();
    const deleteMutation = useDeleteSection();
    const [editingSection, setEditingSection] = useState<HomeSection | null>(null);
    const [showCreateForm, setShowCreateForm] = useState(false);

    const handleDelete = async (section: HomeSection) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: `¿Quieres eliminar la sección "${section.title}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: VERDE_PRINCIPAL,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                await deleteMutation.mutateAsync(section.id);
                Swal.fire({
                    title: '¡Eliminado!',
                    text: 'La sección ha sido eliminada.',
                    icon: 'success',
                    confirmButtonColor: VERDE_PRINCIPAL,
                });
            } catch (error) {
                console.error('Error deleting section:', error);
                Swal.fire({
                    title: 'Error',
                    text: 'Hubo un problema al eliminar la sección.',
                    icon: 'error',
                    confirmButtonColor: VERDE_PRINCIPAL,
                });
            }
        }
    };

    if (isLoading) {
        return (
            <div className="space-y-4">
                <div className="text-center py-8" style={{ color: CASI_NEGRO }}>
                    Cargando secciones...
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="space-y-4">
                <div className="text-center py-8 text-red-600">
                    Error al cargar las secciones
                </div>
            </div>
        );
    }

    if (editingSection) {
        return (
            <CreateSectionForm
                section={editingSection}
                onSuccess={() => setEditingSection(null)}
                onCancel={() => setEditingSection(null)}
            />
        );
    }

    if (showCreateForm) {
        return (
            <CreateSectionForm
                onSuccess={() => setShowCreateForm(false)}
                onCancel={() => setShowCreateForm(false)}
            />
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold" style={{ color: CASI_NEGRO }}>
                    Gestión de Secciones del Home
                </h2>
                <button
                    onClick={() => setShowCreateForm(true)}
                    className="px-4 py-2 rounded-xl text-white font-semibold transition-colors"
                    style={{ backgroundColor: VERDE_PRINCIPAL }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = VERDE_ACENTO}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = VERDE_PRINCIPAL}
                >
                    Nueva Sección
                </button>
            </div>

            <div className="grid gap-4">
                {sections && sections.length > 0 ? (
                    sections.map((section) => (
                        <div
                            key={section.id}
                            className="bg-white rounded-2xl border border-zinc-200 p-6 hover:shadow-lg transition-shadow"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-lg font-semibold" style={{ color: CASI_NEGRO }}>
                                            {section.title}
                                        </h3>
                                    </div>
                                    <div
                                        className="text-sm mb-3 line-clamp-3"
                                        style={{ color: CASI_NEGRO + '99' }}
                                        dangerouslySetInnerHTML={{ __html: section.description }}
                                    />
                                    {section.images && section.images.length > 0 && (
                                        <div className="mb-3">
                                            <div className="flex gap-2 flex-wrap">
                                                {section.images.slice(0, 3).map((imageUrl, index) => (
                                                    <img
                                                        key={index}
                                                        src={resolveImageSrc(imageUrl)}
                                                        alt={`${section.title} ${index + 1}`}
                                                        className="w-16 h-16 object-cover rounded-lg border border-zinc-300"
                                                    />
                                                ))}
                                                {section.images.length > 3 && (
                                                    <div className="w-16 h-16 bg-gray-100 rounded-lg border border-zinc-300 flex items-center justify-center text-xs text-gray-600">
                                                        +{section.images.length - 3}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="flex gap-2 ml-4">
                                    <button
                                        onClick={() => setEditingSection(section)}
                                        className="px-3 py-1 rounded-lg border border-zinc-300 hover:bg-zinc-50 transition-colors text-sm"
                                        style={{ color: CASI_NEGRO }}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(section)}
                                        disabled={deleteMutation.isPending}
                                        className="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors text-sm disabled:opacity-50"
                                    >
                                        {deleteMutation.isPending ? 'Eliminando...' : 'Eliminar'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8" style={{ color: CASI_NEGRO + '99' }}>
                        No hay secciones creadas. ¡Crea la primera!
                    </div>
                )}
            </div>
        </div>
    );
}
