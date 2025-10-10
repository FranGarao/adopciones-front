'use client';
import { Animal } from '../types/animal';
import { monthsToFriendly } from '../../lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useAnimalsStore } from '../store/useAnimalsStore';
import { VERDE_PRINCIPAL, VERDE_ACENTO, BLANCO_HUESO, CASI_NEGRO } from '../../Constants/colors';
import React, { useState } from 'react';

export default function AnimalCard({ animal }: { animal: Animal }) {
    const setAnimal = useAnimalsStore((s) => s.setAnimal);

    const imageUrl = animal.imageUrl || '/animals/placeholders/placeholder.jpg';
    const gallery = animal.gallery && animal.gallery.length > 0
        ? [imageUrl, ...animal.gallery.filter((g) => g !== imageUrl)]
        : [imageUrl];

    const age = animal.age_months ? monthsToFriendly(animal.age_months) : 'Unknown';

    // Simple slider state and handlers
    const [currentIdx, setCurrentIdx] = useState(0);

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIdx((prev) => (prev + 1) % gallery.length);
    };
    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIdx((prev) => (prev - 1 + gallery.length) % gallery.length);
    };
    const goToImage = (idx: number) => {
        setCurrentIdx(idx);
    };

    return (
        <article className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition" style={{ backgroundColor: BLANCO_HUESO }}>
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow">
                <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGES_URL}${gallery[currentIdx]}`}
                    alt={animal.name}
                    fill
                    className="object-cover group-hover:scale-105 transition"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={currentIdx === 0}
                />
                {gallery.length > 1 && (
                    <>
                        <button
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-black/30 rounded-full p-1 shadow hover:bg-white/90 transition z-10"
                            style={{ border: '1px solid #ccc' }}
                            aria-label="Anterior"
                            tabIndex={0}
                        >
                            <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M13 15l-5-5 5-5" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-black/30 rounded-full p-1 shadow hover:bg-white/90 transition z-10"
                            style={{ border: '1px solid #ccc' }}
                            aria-label="Siguiente"
                            tabIndex={0}
                        >
                            <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M7 5l5 5-5 5" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </button>
                        <div className="absolute bottom-2 left-1/2 z-10 -translate-x-1/2 flex gap-1">
                            {gallery.map((g, i) => (
                                <button
                                    key={i}
                                    aria-label={`Imagen ${i + 1}`}
                                    onClick={(e) => { e.stopPropagation(); goToImage(i); }}
                                    className={`w-2 h-2 rounded-full ${currentIdx === i ? 'bg-emerald-600' : 'bg-white/70 border border-zinc-400'} shadow`}
                                    style={{ transition: 'background 0.2s', outline: 'none' }}
                                    tabIndex={0}
                                />
                            ))}
                        </div>
                    </>
                )}
                <div className="absolute left-2 top-2 flex gap-2">
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-black/60 backdrop-blur border border-zinc-200 dark:border-zinc-700">
                        {animal.type === 'DOG' ? 'Perro' : animal.type === 'CAT' ? 'Gato' : 'Otro'}
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-black/60 backdrop-blur border border-zinc-200 dark:border-zinc-700">
                        {animal.sex === 'MALE' ? 'Macho' : animal.sex === 'FEMALE' ? 'Hembra' : 'Unknown'}
                    </span>
                    {animal.size !== 'UNKNOWN' && (
                        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-black/60 backdrop-blur border border-zinc-200 dark:border-zinc-700">
                            {animal.size === 'SMALL' ? 'Pequeño' : animal.size === 'MEDIUM' ? 'Mediano' : animal.size === 'LARGE' ? 'Grande' : 'XL'}
                        </span>
                    )}
                </div>
            </div>

            <div className="p-3">
                <h3 className="font-bold text-lg leading-tight" style={{ color: CASI_NEGRO }}>{animal.name}</h3>
                <p className="text-sm" style={{ color: CASI_NEGRO + '99' }}>
                    {age}{animal.breed ? ` · ${animal.breed}` : ''}
                </p>
                {animal.location && (
                    <p className="mt-1 text-xs" style={{ color: CASI_NEGRO + '80' }}>{animal.location}</p>
                )}

                <div className="mt-3 flex items-center gap-2">
                    <Link
                        href={`/animals/${animal.id}`}
                        prefetch={false}
                        onClick={() => setAnimal(animal)}
                        className="px-3 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                    >
                        Ver ficha
                    </Link>
                    <Link
                        href={`/adopt/${animal.id}`}
                        onClick={() => setAnimal(animal)}
                        className="px-3 py-2 text-sm rounded-xl text-white font-semibold transition-colors"
                        style={{ backgroundColor: VERDE_PRINCIPAL }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = VERDE_ACENTO}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = VERDE_PRINCIPAL}
                        prefetch={false}
                    >
                        Adoptar
                    </Link>
                </div>
            </div>
        </article>
    );
}