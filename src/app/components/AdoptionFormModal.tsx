'use client';

import React, { useState } from 'react';
import { Animal } from '../types/animal';
import { AdoptionFormData } from '../types/adoption';
import { VERDE_PRINCIPAL, VERDE_ACENTO, CASI_NEGRO, BLANCO_HUESO } from '../../Constants/colors';
import Swal from 'sweetalert2';

interface AdoptionFormModalProps {
    animal: Animal;
    isOpen: boolean;
    onClose: () => void;
    onSubmit?: (data: AdoptionFormData) => void | Promise<void>;
}

export default function AdoptionFormModal({ animal, isOpen, onClose, onSubmit }: AdoptionFormModalProps) {
    const [formData, setFormData] = useState<AdoptionFormData>({
        fullName: '',
        age: 0,
        address: '',
        housingType: 'casa',
        housingOwnership: 'propio',
        familyComposition: '',
        hasChildren: false,
        childrenAges: '',
        hasOtherPets: false,
        otherPetsDetails: '',
        hasAllergies: false,
        willNeuter: false,
        understandsIndoorOnly: false,
        futureChangesPlans: '',
        hasProtections: false,
        understandsEconomicResponsibility: false,
        previousPets: '',
        willSendNeuterPhoto: false,
        acceptsFollowUp: false,
        animalId: animal.id,
        animalName: animal.name
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (field: keyof AdoptionFormData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validaciones básicas
        if (!formData.fullName || !formData.age || !formData.address) {
            Swal.fire({
                title: 'Campos requeridos',
                text: 'Por favor completa todos los campos obligatorios.',
                icon: 'warning',
                confirmButtonColor: VERDE_PRINCIPAL,
            });
            return;
        }

        if (!formData.willNeuter || !formData.understandsIndoorOnly || !formData.understandsEconomicResponsibility) {
            Swal.fire({
                title: 'Compromisos requeridos',
                text: 'Debes aceptar todos los compromisos de adopción responsable.',
                icon: 'warning',
                confirmButtonColor: VERDE_PRINCIPAL,
            });
            return;
        }

        // Validaciones específicas para gatos
        if (animal.type === 'CAT') {
            if (!formData.hasProtections) {
                Swal.fire({
                    title: 'Protecciones requeridas',
                    text: 'Para adoptar un gato es obligatorio tener protecciones en todas las ventanas, puertas y balcones.',
                    icon: 'warning',
                    confirmButtonColor: VERDE_PRINCIPAL,
                });
                return;
            }

            if (formData.age < 21) {
                Swal.fire({
                    title: 'Edad mínima requerida',
                    text: 'Para adoptar un gato debes tener al menos 21 años.',
                    icon: 'warning',
                    confirmButtonColor: VERDE_PRINCIPAL,
                });
                return;
            }
        }

        setIsSubmitting(true);

        try {
            if (onSubmit) {
                await onSubmit(formData);
            } else {
                // Simulación de envío por email o API
                console.log('Formulario de adopción:', formData);

                Swal.fire({
                    title: '¡Formulario enviado!',
                    text: 'Hemos recibido tu solicitud de adopción. Nos pondremos en contacto contigo pronto.',
                    icon: 'success',
                    confirmButtonColor: VERDE_PRINCIPAL,
                });

                onClose();
            }
        } catch (error) {
            console.error('Error enviando formulario:', error);
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al enviar el formulario. Por favor intenta nuevamente.',
                icon: 'error',
                confirmButtonColor: VERDE_PRINCIPAL,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-zinc-200">
                    <div>
                        <h2 className="text-2xl font-bold" style={{ color: CASI_NEGRO }}>
                            Formulario de Pre-Adopción
                        </h2>
                        <p className="text-sm mt-1" style={{ color: CASI_NEGRO + '99' }}>
                            Para adoptar a <strong>{animal.name}</strong> - Adopciones Quilmes
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Contenido */}
                <div className="p-6">
                    <p className="text-sm mb-6" style={{ color: CASI_NEGRO + '99' }}>
                        Por favor, respondé estas preguntas con sinceridad. Nos ayudan a asegurarnos de que {animal.name} tenga un hogar responsable, seguro y definitivo.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Información personal */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">1. Nombre y apellido *</label>
                                <input
                                    type="text"
                                    value={formData.fullName}
                                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                                    className="w-full rounded-xl border border-zinc-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                                    style={{ backgroundColor: BLANCO_HUESO, focusRingColor: VERDE_PRINCIPAL }}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">2. Edad *</label>
                                <input
                                    type="number"
                                    value={formData.age || ''}
                                    onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
                                    className="w-full rounded-xl border border-zinc-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                                    style={{ backgroundColor: BLANCO_HUESO, focusRingColor: VERDE_PRINCIPAL }}
                                    min="18"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">3. Dirección completa *</label>
                            <input
                                type="text"
                                value={formData.address}
                                onChange={(e) => handleInputChange('address', e.target.value)}
                                className="w-full rounded-xl border border-zinc-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                                style={{ backgroundColor: BLANCO_HUESO, focusRingColor: VERDE_PRINCIPAL }}
                                required
                            />
                        </div>

                        {/* Vivienda */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">4a. ¿Vivís en casa o departamento?</label>
                                <select
                                    value={formData.housingType}
                                    onChange={(e) => handleInputChange('housingType', e.target.value)}
                                    className="w-full rounded-xl border border-zinc-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                                    style={{ backgroundColor: BLANCO_HUESO, focusRingColor: VERDE_PRINCIPAL }}
                                >
                                    <option value="casa">Casa</option>
                                    <option value="departamento">Departamento</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">4b. ¿Es propio, alquilado o prestado?</label>
                                <select
                                    value={formData.housingOwnership}
                                    onChange={(e) => handleInputChange('housingOwnership', e.target.value)}
                                    className="w-full rounded-xl border border-zinc-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                                    style={{ backgroundColor: BLANCO_HUESO, focusRingColor: VERDE_PRINCIPAL }}
                                >
                                    <option value="propio">Propio</option>
                                    <option value="alquilado">Alquilado</option>
                                    <option value="prestado">Prestado</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">5. ¿Cómo está compuesta tu familia? (Nombres, edades)</label>
                            <textarea
                                value={formData.familyComposition}
                                onChange={(e) => handleInputChange('familyComposition', e.target.value)}
                                className="w-full rounded-xl border border-zinc-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                                style={{ backgroundColor: BLANCO_HUESO, focusRingColor: VERDE_PRINCIPAL }}
                                rows={3}
                            />
                        </div>

                        {/* Niños */}
                        <div>
                            <label className="block text-sm font-medium mb-2">6. ¿Hay niños pequeños en el hogar?</label>
                            <div className="flex gap-4 mb-2">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="hasChildren"
                                        checked={formData.hasChildren}
                                        onChange={() => handleInputChange('hasChildren', true)}
                                        className="mr-2"
                                    />
                                    Sí
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="hasChildren"
                                        checked={!formData.hasChildren}
                                        onChange={() => handleInputChange('hasChildren', false)}
                                        className="mr-2"
                                    />
                                    No
                                </label>
                            </div>
                            {formData.hasChildren && (
                                <input
                                    type="text"
                                    placeholder="¿Qué edades tienen?"
                                    value={formData.childrenAges}
                                    onChange={(e) => handleInputChange('childrenAges', e.target.value)}
                                    className="w-full rounded-xl border border-zinc-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                                    style={{ backgroundColor: BLANCO_HUESO, focusRingColor: VERDE_PRINCIPAL }}
                                />
                            )}
                        </div>

                        {/* Otras mascotas */}
                        <div>
                            <label className="block text-sm font-medium mb-2">7. ¿Hay otras mascotas?</label>
                            <div className="flex gap-4 mb-2">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="hasOtherPets"
                                        checked={formData.hasOtherPets}
                                        onChange={() => handleInputChange('hasOtherPets', true)}
                                        className="mr-2"
                                    />
                                    Sí
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="hasOtherPets"
                                        checked={!formData.hasOtherPets}
                                        onChange={() => handleInputChange('hasOtherPets', false)}
                                        className="mr-2"
                                    />
                                    No
                                </label>
                            </div>
                            {formData.hasOtherPets && (
                                <textarea
                                    placeholder="Especificar especie, edad, y si están castrados"
                                    value={formData.otherPetsDetails}
                                    onChange={(e) => handleInputChange('otherPetsDetails', e.target.value)}
                                    className="w-full rounded-xl border border-zinc-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                                    style={{ backgroundColor: BLANCO_HUESO, focusRingColor: VERDE_PRINCIPAL }}
                                    rows={2}
                                />
                            )}
                        </div>

                        {/* Alergias */}
                        <div>
                            <label className="block text-sm font-medium mb-2">8. ¿Algún miembro de la familia es alérgico a los {animal.type === 'CAT' ? 'gatos' : 'perros'}?</label>
                            <div className="flex gap-4">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="hasAllergies"
                                        checked={formData.hasAllergies}
                                        onChange={() => handleInputChange('hasAllergies', true)}
                                        className="mr-2"
                                    />
                                    Sí
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="hasAllergies"
                                        checked={!formData.hasAllergies}
                                        onChange={() => handleInputChange('hasAllergies', false)}
                                        className="mr-2"
                                    />
                                    No
                                </label>
                            </div>
                        </div>

                        {/* Compromisos importantes */}
                        <div className="space-y-4 p-4 bg-green-50 rounded-xl">
                            <h3 className="font-semibold text-green-800">Compromisos importantes *</h3>

                            <label className="flex items-start gap-3">
                                <input
                                    type="checkbox"
                                    checked={formData.willNeuter}
                                    onChange={(e) => handleInputChange('willNeuter', e.target.checked)}
                                    className="mt-1"
                                    required
                                />
                                <span className="text-sm">9. ¿Estás dispuest@ a castrar al {animal.type === 'CAT' ? 'gatito' : 'perrito'} cuando tenga la edad adecuada (si aún no lo está)?</span>
                            </label>

                            <label className="flex items-start gap-3">
                                <input
                                    type="checkbox"
                                    checked={formData.understandsIndoorOnly}
                                    onChange={(e) => handleInputChange('understandsIndoorOnly', e.target.checked)}
                                    className="mt-1"
                                    required
                                />
                                <span className="text-sm">10. ¿Entendés que por su seguridad el {animal.type === 'CAT' ? 'gatito' : 'perrito'} no debe salir a la calle? ¿Estás de acuerdo con mantenerlo siempre dentro del hogar?</span>
                            </label>

                            <label className="flex items-start gap-3">
                                <input
                                    type="checkbox"
                                    checked={formData.understandsEconomicResponsibility}
                                    onChange={(e) => handleInputChange('understandsEconomicResponsibility', e.target.checked)}
                                    className="mt-1"
                                    required
                                />
                                <span className="text-sm">13. ¿Comprendés que la adopción implica una responsabilidad económica (veterinario, vacunas, desparasitación, alimentación e imprevistos)?</span>
                            </label>
                        </div>

                        {/* Preguntas adicionales */}
                        <div>
                            <label className="block text-sm font-medium mb-2">11. ¿Qué pasaría con el {animal.type === 'CAT' ? 'gato' : 'perro'} si tuvieras que mudarte, viajar o cambiar de situación laboral?</label>
                            <textarea
                                value={formData.futureChangesPlans}
                                onChange={(e) => handleInputChange('futureChangesPlans', e.target.value)}
                                className="w-full rounded-xl border border-zinc-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                                style={{ backgroundColor: BLANCO_HUESO, focusRingColor: VERDE_PRINCIPAL }}
                                rows={3}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                12. ¿Tenés redes, mosquiteros o alguna protección colocada en ventanas, puertas y/o balcones?
                                {animal.type === 'CAT' && <span className="text-red-600"> *</span>}
                            </label>
                            {animal.type === 'CAT' && (
                                <div className="mb-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                                    <p className="text-sm text-orange-800 font-medium">
                                        🐾 <strong>Requisito obligatorio para gatos:</strong> Protección en todas las ventanas y puertas que den al exterior tal como mosquiteros, redes, etc. Si tenés balcón, debe tener red de protección.
                                    </p>
                                    <p className="text-sm text-orange-700 mt-1">
                                        📸 <strong>Se requieren fotos que respalden las protecciones colocadas.</strong>
                                    </p>
                                    <p className="text-sm text-orange-700 mt-1">
                                        ⚠️ En caso de NO cumplir el cerramiento de ventanas y puerta de salida al patio, se puede evaluar con un video del patio.
                                    </p>
                                </div>
                            )}
                            <div className="flex gap-4">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="hasProtections"
                                        checked={formData.hasProtections}
                                        onChange={() => handleInputChange('hasProtections', true)}
                                        className="mr-2"
                                        required={animal.type === 'CAT'}
                                    />
                                    Sí
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="hasProtections"
                                        checked={!formData.hasProtections}
                                        onChange={() => handleInputChange('hasProtections', false)}
                                        className="mr-2"
                                    />
                                    No
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">14. Si tuvo mascotas anteriormente, ¿aún las tiene? En caso de que alguna haya fallecido recientemente, ¿podría mencionar brevemente la causa?</label>
                            <textarea
                                value={formData.previousPets}
                                onChange={(e) => handleInputChange('previousPets', e.target.value)}
                                className="w-full rounded-xl border border-zinc-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                                style={{ backgroundColor: BLANCO_HUESO, focusRingColor: VERDE_PRINCIPAL }}
                                rows={3}
                            />
                        </div>

                        {/* Compromisos de seguimiento */}
                        <div className="space-y-3">
                            <label className="flex items-start gap-3">
                                <input
                                    type="checkbox"
                                    checked={formData.willSendNeuterPhoto}
                                    onChange={(e) => handleInputChange('willSendNeuterPhoto', e.target.checked)}
                                    className="mt-1"
                                />
                                <span className="text-sm">15. ¿Te comprometés a enviarnos una foto cuando la hayas castrado?</span>
                            </label>

                            <label className="flex items-start gap-3">
                                <input
                                    type="checkbox"
                                    checked={formData.acceptsFollowUp}
                                    onChange={(e) => handleInputChange('acceptsFollowUp', e.target.checked)}
                                    className="mt-1"
                                />
                                <span className="text-sm">16. También, ¿aceptás el seguimiento que hacemos para ver cómo va creciendo el {animal.type === 'CAT' ? 'gato' : 'perro'}? De vez en cuando podrías mandarnos fotos y contarnos cómo está 🐱💛</span>
                            </label>
                        </div>

                        {/* Información específica para gatos */}
                        {animal.type === 'CAT' && (
                            <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl">
                                <h4 className="font-semibold text-purple-800 mb-3">
                                    🐈 Requisitos obligatorios para la adopción + el proceso ✨
                                </h4>
                                <div className="space-y-2 text-sm text-purple-700">
                                    <p>🐾 <strong>Protección en todas las ventanas y puertas</strong> que den al exterior tal como mosquiteros, redes, etc. Si el adoptante cuenta con balcón tienen que tener red de protección.</p>
                                    <p>🐾 <strong>La persona responsable de la adopción debe tener al menos 21 años.</strong></p>
                                    <p>📸 <strong>Pedimos fotos que respalden las protecciones colocadas.</strong></p>
                                    <p>📞 <strong>Por favor NO llamadas.</strong></p>
                                </div>

                                <div className="mt-3 p-3 bg-purple-100 rounded-lg">
                                    <p className="text-sm text-purple-800">
                                        <strong>Proceso:</strong> Si estos requisitos se cumplen, se procede vía WhatsApp con el formulario de pre-adopción. Una vez aprobado se coordina la búsqueda de la mascota.
                                    </p>
                                </div>

                                <div className="mt-3 space-y-1 text-sm text-purple-700">
                                    <p>⚠️ <strong>El adoptante debe acercarse al refugio</strong> a firmar los papeles y retirar al nuevo integrante de la familia. Adopciones Quilmes no va a domicilio.</p>
                                    <p>📅 <strong>Las adopciones se hacen de lunes a lunes</strong> (sí, incluyendo sábados, domingos y feriados)</p>
                                </div>
                            </div>
                        )}

                        {/* Información importante general */}
                        <div className="p-4 bg-blue-50 rounded-xl">
                            <p className="text-sm text-blue-800">
                                Una vez que completes y envíes este formulario{animal.type === 'CAT' ? ' junto con las fotos de las protecciones' : ''}, evaluaremos la información y nos pondremos en contacto para coordinar la adopción.
                            </p>
                            <p className="text-sm text-blue-800 mt-2">
                                <strong>Recordá que si se concreta la adopción, tenés que ir a buscarl@ con transportadora!</strong>
                            </p>
                            <p className="text-sm text-blue-800 mt-2">
                                ¡Muchas gracias por adoptar con responsabilidad! 🐱
                            </p>
                        </div>

                        {/* Botones */}
                        <div className="flex gap-4 pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 px-6 py-3 rounded-xl text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{ backgroundColor: VERDE_PRINCIPAL }}
                                onMouseEnter={(e) => !isSubmitting && (e.currentTarget.style.backgroundColor = VERDE_ACENTO)}
                                onMouseLeave={(e) => !isSubmitting && (e.currentTarget.style.backgroundColor = VERDE_PRINCIPAL)}
                            >
                                {isSubmitting ? 'Enviando...' : 'Enviar solicitud de adopción'}
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-3 rounded-xl border border-zinc-300 hover:bg-zinc-50 transition-colors"
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
