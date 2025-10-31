'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { donationsService } from '@/services/donations';
import { CreateDonationPayload, DonationType, DONATION_TYPE_LABELS } from '@/app/types/donation';
import { VERDE_PRINCIPAL, VERDE_ACENTO, CASI_NEGRO, BLANCO_HUESO } from '@/Constants/colors';
import Swal from 'sweetalert2';

interface DonationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function DonationModal({ isOpen, onClose }: DonationModalProps) {
    const [formData, setFormData] = useState<CreateDonationPayload>({
        firstName: '',
        lastName: '',
        contact: '',
        donationType: 'FOOD',
        description: ''
    });

    const queryClient = useQueryClient();

    const createDonationMutation = useMutation({
        mutationFn: donationsService.createDonation,
        onSuccess: () => {
            Swal.fire({
                title: '¡Gracias!',
                text: 'Tu donación ha sido registrada exitosamente. Nos pondremos en contacto contigo pronto.',
                icon: 'success',
                confirmButtonColor: VERDE_PRINCIPAL,
            });
            setFormData({
                firstName: '',
                lastName: '',
                contact: '',
                donationType: 'FOOD',
                description: ''
            });
            onClose();
            queryClient.invalidateQueries({ queryKey: ['donations'] });
        },
        onError: (error) => {
            console.error('Error creating donation:', error);
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al registrar tu donación. Por favor, intenta nuevamente.',
                icon: 'error',
                confirmButtonColor: VERDE_PRINCIPAL,
            });
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.contact.trim() || !formData.description.trim()) {
            Swal.fire({
                title: 'Campos requeridos',
                text: 'Por favor, completa todos los campos.',
                icon: 'warning',
                confirmButtonColor: VERDE_PRINCIPAL,
            });
            return;
        }

        createDonationMutation.mutate(formData);
    };

    const handleInputChange = (field: keyof CreateDonationPayload, value: string | DonationType) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold" style={{ color: CASI_NEGRO }}>
                            Registrar Donación
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 text-2xl"
                        >
                            ×
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1" style={{ color: CASI_NEGRO }}>
                                    Nombre *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.firstName}
                                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                                    className="w-full rounded-xl border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2"
                                    style={{
                                        backgroundColor: BLANCO_HUESO,
                                        color: CASI_NEGRO,
                                        focusRingColor: VERDE_PRINCIPAL
                                    }}
                                    placeholder="Tu nombre"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1" style={{ color: CASI_NEGRO }}>
                                    Apellido *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.lastName}
                                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                                    className="w-full rounded-xl border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2"
                                    style={{
                                        backgroundColor: BLANCO_HUESO,
                                        color: CASI_NEGRO,
                                        focusRingColor: VERDE_PRINCIPAL
                                    }}
                                    placeholder="Tu apellido"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1" style={{ color: CASI_NEGRO }}>
                                Teléfono o Email *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.contact}
                                onChange={(e) => handleInputChange('contact', e.target.value)}
                                className="w-full rounded-xl border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2"
                                style={{
                                    backgroundColor: BLANCO_HUESO,
                                    color: CASI_NEGRO,
                                    focusRingColor: VERDE_PRINCIPAL
                                }}
                                placeholder="Tu teléfono o email"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1" style={{ color: CASI_NEGRO }}>
                                Tipo de donación *
                            </label>
                            <select
                                required
                                value={formData.donationType}
                                onChange={(e) => handleInputChange('donationType', e.target.value as DonationType)}
                                className="w-full rounded-xl border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2"
                                style={{
                                    backgroundColor: BLANCO_HUESO,
                                    color: CASI_NEGRO,
                                    focusRingColor: VERDE_PRINCIPAL
                                }}
                            >
                                {Object.entries(DONATION_TYPE_LABELS).map(([key, label]) => (
                                    <option key={key} value={key}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1" style={{ color: CASI_NEGRO }}>
                                ¿Qué vas a donar? *
                            </label>
                            <textarea
                                required
                                rows={4}
                                value={formData.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                className="w-full rounded-xl border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 resize-none"
                                style={{
                                    backgroundColor: BLANCO_HUESO,
                                    color: CASI_NEGRO,
                                    focusRingColor: VERDE_PRINCIPAL
                                }}
                                placeholder="Describe qué vas a donar..."
                            />
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-4 py-2 rounded-xl border border-zinc-300 hover:bg-zinc-50 transition-colors"
                                style={{ color: CASI_NEGRO }}
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={createDonationMutation.isPending}
                                className="flex-1 px-4 py-2 rounded-xl text-white font-semibold transition-colors disabled:opacity-50"
                                style={{ backgroundColor: VERDE_PRINCIPAL }}
                                onMouseEnter={(e) => !createDonationMutation.isPending && (e.currentTarget.style.backgroundColor = VERDE_ACENTO)}
                                onMouseLeave={(e) => !createDonationMutation.isPending && (e.currentTarget.style.backgroundColor = VERDE_PRINCIPAL)}
                            >
                                {createDonationMutation.isPending ? 'Enviando...' : 'Registrar Donación'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
