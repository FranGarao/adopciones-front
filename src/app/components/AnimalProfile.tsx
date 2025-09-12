"use client";
import { Animal, AnimalSex, AnimalSize, AnimalType } from "../types/animal";
import React, { useState } from "react";
import { useAnimalsStore } from "../store/useAnimalsStore";
import Link from "next/link";

type Props = {
    animal: Animal;
    adoptHref?: string; // 👈 nuevo: link serializable
    showAdoptButton?: boolean;
};


const pretty = {
    type: (t: AnimalType) => (t === "DOG" ? "Perro" : t === "CAT" ? "Gato" : "Otro"),
    sex: (s: AnimalSex) => (s === "MALE" ? "Macho" : s === "FEMALE" ? "Hembra" : "Sin dato"),
    size: (z: AnimalSize) => ({ SMALL: "Chico", MEDIUM: "Mediano", LARGE: "Grande", XL: "XL", UNKNOWN: "Sin dato" }[z]),
    age: (m?: number | null) => (m == null ? "Sin dato" : m < 12 ? `${m} meses` : `${Math.floor(m / 12)} año(s)`),
};


function ImgWithFallback({ src, alt, className }: { src?: string | null; alt: string; className?: string }) {
    const [fallbackSrc, setFallbackSrc] = useState(src ?? "/placeholder.jpg");
    return (
        <img
            src={fallbackSrc}
            alt={alt}
            className={className}
            onError={() => setFallbackSrc("/placeholder.jpg")}
            loading="lazy"
        />
    );
}

export function AnimalProfile({
    animal,
    onAdopt,
    showAdoptButton = true,
}: {
    animal: Animal;
    onAdopt?: (animal: Animal) => void;
    showAdoptButton?: boolean;
}) {
    const setAnimal = useAnimalsStore((s) => s.setAnimal);
    return (
        <div className="w-full max-w-4xl mx-auto rounded-2xl shadow-lg bg-white text-gray-900 overflow-hidden">
            <div className="grid md:grid-cols-2">
                {/* Imagen principal */}
                <div className="bg-gray-50">
                    <ImgWithFallback src={animal.imageUrl} alt={animal.name} className="w-full h-80 object-cover" />
                    {animal.gallery && animal.gallery.length > 0 && (
                        <div className="flex gap-2 p-3 overflow-x-auto">
                            {animal.gallery.map((g: string, i: number) => (
                                <ImgWithFallback key={i} src={g} alt={`${animal.name} ${i + 1}`} className="h-16 w-24 object-cover rounded-md" />
                            ))}
                        </div>
                    )}
                </div>


                {/* Datos */}
                <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-semibold">{animal.name}</h1>
                            <p className="text-sm text-gray-500 mt-1">
                                {pretty.type(animal.type)} · {pretty.sex(animal.sex)} · {pretty.size(animal.size)}
                            </p>
                            <p className="text-sm text-gray-500">Edad: {pretty.age(animal.age_months)}</p>
                            {animal.breed && <p className="text-sm text-gray-500">Raza: {animal.breed}</p>}
                            {animal.location && <p className="text-sm text-gray-500">Ubicación: {animal.location}</p>}
                        </div>
                    </div>


                    {animal.tags && animal.tags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                            {animal.tags.map((t: string, i: number) => (
                                <span key={i} className="px-2 py-1 text-xs rounded-full bg-gray-100 border">
                                    #{t}
                                </span>
                            ))}
                        </div>
                    )}


                    {animal.description && <p className="mt-4 text-sm leading-relaxed">{animal.description}</p>}


                    <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
                        <Badge label="Vacunado" ok={!!animal.vaccinated} />
                        <Badge label="Desparasitado" ok={!!animal.dewormed} />
                        <Badge label="Castrado" ok={!!animal.castrated} />
                    </div>


                    {showAdoptButton && (
                        <Link
                            href={`/adopt/${animal.id}`}
                            onClick={() => setAnimal(animal)}
                            className="mt-6 w-full md:w-auto px-5 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
                        >
                            Quiero adoptar
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}


function Badge({ label, ok }: { label: string; ok: boolean }) {
    return (
        <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${ok ? "bg-green-50 border-green-200" : "bg-gray-50"}`}>
            <span className={`h-2 w-2 rounded-full ${ok ? "bg-green-500" : "bg-gray-300"}`} />
            <span>{label}</span>
        </div>
    );
}