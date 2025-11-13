'use client';

import { useState } from 'react';
import { useCreateFAQ, useUpdateFAQ } from '@/hooks/useCreateFAQ';
import { FAQ } from '@/app/types/faq';
import { VERDE_PRINCIPAL, VERDE_ACENTO, CASI_NEGRO, BLANCO_HUESO } from '@/Constants/colors';
import Swal from 'sweetalert2';

interface CreateFAQFormProps {
    faq?: FAQ | null;
    onSuccess?: () => void;
    onCancel?: () => void;
}

export default function CreateFAQForm({ faq, onSuccess, onCancel }: CreateFAQFormProps) {
    const [question, setQuestion] = useState(faq?.question || '');
    const [answer, setAnswer] = useState(faq?.answer || '');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const createMutation = useCreateFAQ();
    const updateMutation = useUpdateFAQ();

    const isEditing = !!faq;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!question.trim() || !answer.trim()) {
            Swal.fire({
                title: 'Error',
                text: 'Por favor completa todos los campos',
                icon: 'error',
                confirmButtonColor: VERDE_PRINCIPAL,
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const data = { question: question.trim(), answer: answer.trim() };

            if (isEditing) {
                await updateMutation.mutateAsync({ id: faq.id, data });
                Swal.fire({
                    title: '¡Actualizada!',
                    text: 'La FAQ ha sido actualizada correctamente.',
                    icon: 'success',
                    confirmButtonColor: VERDE_PRINCIPAL,
                });
            } else {
                await createMutation.mutateAsync(data);
                Swal.fire({
                    title: '¡Creada!',
                    text: 'La FAQ ha sido creada correctamente.',
                    icon: 'success',
                    confirmButtonColor: VERDE_PRINCIPAL,
                });
            }

            onSuccess?.();
        } catch (error) {
            console.error('Error saving FAQ:', error);
            Swal.fire({
                title: 'Error',
                text: `Hubo un problema al ${isEditing ? 'actualizar' : 'crear'} la FAQ.`,
                icon: 'error',
                confirmButtonColor: VERDE_PRINCIPAL,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold" style={{ color: CASI_NEGRO }}>
                    {isEditing ? 'Editar FAQ' : 'Nueva FAQ'}
                </h2>
                <button
                    onClick={onCancel}
                    className="px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                >
                    Cancelar
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: CASI_NEGRO }}>
                                Pregunta *
                            </label>
                            <input
                                type="text"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                placeholder="¿Cuál es tu pregunta?"
                                className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                                style={{
                                    backgroundColor: BLANCO_HUESO,
                                    color: CASI_NEGRO,
                                    focusRingColor: VERDE_PRINCIPAL
                                }}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: CASI_NEGRO }}>
                                Respuesta *
                            </label>
                            <textarea
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                placeholder="Escribe la respuesta aquí..."
                                rows={6}
                                className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-opacity-50 resize-vertical"
                                style={{
                                    backgroundColor: BLANCO_HUESO,
                                    color: CASI_NEGRO,
                                    focusRingColor: VERDE_PRINCIPAL
                                }}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-3 rounded-xl text-white font-semibold shadow transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ backgroundColor: VERDE_PRINCIPAL }}
                        onMouseEnter={(e) => !isSubmitting && (e.currentTarget.style.backgroundColor = VERDE_ACENTO)}
                        onMouseLeave={(e) => !isSubmitting && (e.currentTarget.style.backgroundColor = VERDE_PRINCIPAL)}
                    >
                        {isSubmitting
                            ? (isEditing ? 'Actualizando...' : 'Creando...')
                            : (isEditing ? 'Actualizar FAQ' : 'Crear FAQ')
                        }
                    </button>

                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-6 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}
