'use client';

import { useSections } from '@/hooks/useSections';
import { VERDE_PRINCIPAL, VERDE_ACENTO, BLANCO_HUESO, CASI_NEGRO } from '@/Constants/colors';
import Image from 'next/image';

export default function HomeSections() {
    const { data: sections, isLoading, isError } = useSections();

    if (isLoading) {
        return (
            <section className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 animate-pulse">
                            <div className="h-6 bg-gray-200 rounded mb-4"></div>
                            <div className="h-32 bg-gray-200 rounded mb-4"></div>
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    if (isError || !sections || sections.length === 0) {
        return null; // No mostrar nada si hay error o no hay secciones
    }

    return (
        <section className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                {sections.slice(0, 4).map((section) => (
                    <div
                        key={section.id}
                        className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 hover:shadow-lg transition-shadow"
                    >
                        <h3 className="text-xl font-semibold mb-4" style={{ color: VERDE_PRINCIPAL }}>
                            {section.title}
                        </h3>

                        {section.images && section.images.length > 0 && (
                            <div className="relative h-48 mb-4 rounded-xl overflow-hidden">
                                <Image
                                    src={section.images[0]} // Usar la primera imagen
                                    alt={section.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}

                        <div
                            className="text-sm leading-relaxed"
                            style={{ color: CASI_NEGRO + '99' }}
                            dangerouslySetInnerHTML={{ __html: section.description }}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
