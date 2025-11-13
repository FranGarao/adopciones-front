'use client';

import { useState } from 'react';
import { useAllFAQs } from '@/hooks/useFAQs';
import { useDeleteFAQ } from '@/hooks/useCreateFAQ';
import { FAQ } from '@/app/types/faq';
import { VERDE_PRINCIPAL, VERDE_ACENTO, CASI_NEGRO, BLANCO_HUESO } from '@/Constants/colors';
import CreateFAQForm from './CreateFAQForm';
import Swal from 'sweetalert2';

export default function FAQsManager() {
    const { data: faqs, isLoading, isError } = useAllFAQs();
    const deleteMutation = useDeleteFAQ();
    const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
    const [showCreateForm, setShowCreateForm] = useState(false);

    const handleDelete = async (faq: FAQ) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: `¿Quieres eliminar la FAQ "${faq.question}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: VERDE_PRINCIPAL,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                await deleteMutation.mutateAsync(faq.id);
                Swal.fire({
                    title: '¡Eliminado!',
                    text: 'La FAQ ha sido eliminada.',
                    icon: 'success',
                    confirmButtonColor: VERDE_PRINCIPAL,
                });
            } catch (error) {
                console.error('Error deleting FAQ:', error);
                Swal.fire({
                    title: 'Error',
                    text: 'Hubo un problema al eliminar la FAQ.',
                    icon: 'error',
                    confirmButtonColor: VERDE_PRINCIPAL,
                });
            }
        }
    };

    const handleEdit = (faq: FAQ) => {
        setEditingFAQ(faq);
        setShowCreateForm(true);
    };

    const handleFormSuccess = () => {
        setShowCreateForm(false);
        setEditingFAQ(null);
    };

    const handleFormCancel = () => {
        setShowCreateForm(false);
        setEditingFAQ(null);
    };

    if (isLoading) {
        return (
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold" style={{ color: CASI_NEGRO }}>
                        Gestión de FAQs
                    </h2>
                </div>
                <div className="grid gap-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 animate-pulse">
                            <div className="h-6 bg-gray-200 rounded mb-3"></div>
                            <div className="h-4 bg-gray-200 rounded mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center py-8">
                <p className="text-red-600">Error al cargar las FAQs</p>
            </div>
        );
    }

    if (showCreateForm) {
        return (
            <CreateFAQForm
                faq={editingFAQ}
                onSuccess={handleFormSuccess}
                onCancel={handleFormCancel}
            />
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold" style={{ color: CASI_NEGRO }}>
                    Gestión de FAQs
                </h2>
                <button
                    onClick={() => setShowCreateForm(true)}
                    className="px-4 py-2 rounded-xl text-white font-semibold shadow transition-colors"
                    style={{ backgroundColor: VERDE_PRINCIPAL }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = VERDE_ACENTO}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = VERDE_PRINCIPAL}
                >
                    Nueva FAQ
                </button>
            </div>

            {!faqs || faqs.length === 0 ? (
                <div className="text-center py-8">
                    <p style={{ color: CASI_NEGRO + '99' }}>No hay FAQs creadas</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {faqs.map((faq) => (
                        <div
                            key={faq.id}
                            className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 hover:shadow-lg transition-shadow"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-lg font-semibold" style={{ color: VERDE_PRINCIPAL }}>
                                    {faq.question}
                                </h3>
                                <div className="flex gap-2 ml-4">
                                    <button
                                        onClick={() => handleEdit(faq)}
                                        className="px-3 py-1 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(faq)}
                                        className="px-3 py-1 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
                                        disabled={deleteMutation.isPending}
                                    >
                                        {deleteMutation.isPending ? 'Eliminando...' : 'Eliminar'}
                                    </button>
                                </div>
                            </div>

                            <div className="text-sm leading-relaxed" style={{ color: CASI_NEGRO + '99' }}>
                                {faq.answer}
                            </div>

                            {faq.createdAt && (
                                <div className="mt-4 text-xs text-zinc-500">
                                    Creado: {new Date(faq.createdAt).toLocaleDateString()}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
