'use client';

import { Animal, AnimalSex, AnimalSize, AnimalType } from '../types/animal';
import React, { useState } from 'react';
import { VERDE_PRINCIPAL, VERDE_ACENTO, VERDE_GRISACEO, VERDE_MUY_CLARO, BLANCO_HUESO, CASI_NEGRO } from '../../Constants/colors';

interface AnimalProfileModalProps {
    animal: Animal;
    isOpen: boolean;
    onClose: () => void;
    onAdopt?: () => void;
}

const pretty = {
    type: (t: AnimalType) => (t === "DOG" ? "Perro" : t === "CAT" ? "Gato" : "Otro"),
    sex: (s: AnimalSex) => (s === "MALE" ? "Macho" : s === "FEMALE" ? "Hembra" : "Sin dato"),
    size: (z: AnimalSize) => ({ SMALL: "Chico", MEDIUM: "Mediano", LARGE: "Grande", XL: "XL", UNKNOWN: "Sin dato" }[z]),
    age: (months?: number | null) => {
        if (!months) return "Sin dato";
        if (months < 12) return `${months} ${months === 1 ? 'mes' : 'meses'}`;
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;
        if (remainingMonths === 0) return `${years} ${years === 1 ? 'año' : 'años'}`;
        return `${years} ${years === 1 ? 'año' : 'años'} y ${remainingMonths} ${remainingMonths === 1 ? 'mes' : 'meses'}`;
    }
};

function ImgWithFallback({ src, alt, className }: { src?: string | null; alt: string; className?: string }) {
    const [fallbackSrc, setFallbackSrc] = useState(src ?? "/animals/placeholders/placeholder.jpg");

    const resolveImageSrc = (imageSrc: string) => {
        if (imageSrc.startsWith('http')) return imageSrc;
        if (imageSrc.startsWith('/animals/placeholders/')) return imageSrc;
        return (process.env.NEXT_PUBLIC_IMAGES_URL ?? '') + imageSrc;
    };

    return (
        <img
            src={resolveImageSrc(fallbackSrc)}
            alt={alt}
            className={className}
            onError={() => setFallbackSrc("/animals/placeholders/placeholder.jpg")}
        />
    );
}

function Badge({ label, ok }: { label: string; ok: boolean }) {
    return (
        <span
            className={`px-2 py-1 text-xs rounded-full border ${ok
                    ? 'bg-green-50 border-green-200 text-green-800'
                    : 'bg-gray-50 border-gray-200 text-gray-600'
                }`}
        >
            {ok ? '✓' : '✗'} {label}
        </span>
    );
}

export default function AnimalProfileModal({ animal, isOpen, onClose, onAdopt }: AnimalProfileModalProps) {
    if (!isOpen) return null;

    const age = animal.age == 1 ? `${animal.age} año` : animal.age! > 1 ? `${animal.age} años` : 'Sin dato';

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header con botón cerrar */}
                <div className="flex justify-between items-center p-6 border-b border-zinc-200">
                    <h2 className="text-2xl font-bold" style={{ color: CASI_NEGRO }}>
                        Ficha de {animal.name}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Contenido del modal */}
                <div className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Lado izquierdo: imagen principal */}
                        <div>
                            <div className="aspect-square rounded-xl overflow-hidden mb-4">
                                <ImgWithFallback
                                    src={animal.imageUrl}
                                    alt={animal.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Galería de imágenes */}
                            {animal.gallery && animal.gallery.length > 0 && (
                                <div className="flex gap-2 overflow-x-auto">
                                    {animal.gallery.map((img: string, i: number) => (
                                        <div key={i} className="flex-shrink-0">
                                            <ImgWithFallback
                                                src={img}
                                                alt={`${animal.name} ${i + 1}`}
                                                className="h-16 w-24 object-cover rounded-lg border"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Lado derecho: información */}
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-2xl font-bold mb-2" style={{ color: CASI_NEGRO }}>
                                    {animal.name}
                                </h3>
                                <div className="space-y-1 text-sm" style={{ color: CASI_NEGRO + '99' }}>
                                    <p><strong>Edad:</strong> {age}</p>
                                    <p><strong>Tipo:</strong> {pretty.type(animal.type)}</p>
                                    <p><strong>Sexo:</strong> {pretty.sex(animal.sex)}</p>
                                    <p><strong>Tamaño:</strong> {pretty.size(animal.size)}</p>
                                    {animal.breed && <p><strong>Raza:</strong> {animal.breed}</p>}
                                    {animal.location && <p><strong>Ubicación:</strong> {animal.location}</p>}
                                </div>
                            </div>

                            {/* Tags */}
                            {animal.tags && animal.tags.length > 0 && (
                                <div>
                                    <h4 className="font-semibold mb-2" style={{ color: CASI_NEGRO }}>
                                        Características
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {animal.tags.map((tag: string, i: number) => (
                                            <span
                                                key={i}
                                                className="px-2 py-1 text-xs rounded-full border border-zinc-300 bg-zinc-50"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Estado de salud */}
                            <div>
                                <h4 className="font-semibold mb-2" style={{ color: CASI_NEGRO }}>
                                    Estado de salud
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    <Badge label="Vacunado" ok={animal.vaccinated || false} />
                                    <Badge label="Desparasitado" ok={animal.dewormed || false} />
                                    <Badge label="Castrado" ok={animal.castrated || false} />
                                </div>
                            </div>

                            {/* Descripción */}
                            {animal.description && (
                                <div>
                                    <h4 className="font-semibold mb-2" style={{ color: CASI_NEGRO }}>
                                        Descripción
                                    </h4>
                                    <p className="text-sm leading-relaxed" style={{ color: CASI_NEGRO + '99' }}>
                                        {animal.description}
                                    </p>
                                </div>
                            )}

                            {/* Botón de adoptar */}
                            {onAdopt && (
                                <button
                                    onClick={onAdopt}
                                    className="w-full px-6 py-3 rounded-xl text-white font-semibold transition-colors mt-6"
                                    style={{ backgroundColor: VERDE_PRINCIPAL }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = VERDE_ACENTO}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = VERDE_PRINCIPAL}
                                >
                                    Quiero adoptar a {animal.name}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
