// app/about/page.tsx
import Link from "next/link";
import { useSections } from '@/hooks/useSections';
import { useFAQs } from '@/hooks/useFAQs';
import { VERDE_PRINCIPAL, VERDE_ACENTO, VERDE_MUY_CLARO, BLANCO_HUESO, CASI_NEGRO, NEUTRO } from '../../Constants/colors';
import { useState } from "react";
import DonationModal from "./DonationModal";

export default function AboutPage() {
    // arriba del return (o al inicio del componente)
    const ADDRESS = "Guido 1180, Quilmes, Buenos Aires, Argentina";
    const q = encodeURIComponent(ADDRESS);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Traer las secciones dinámicamente

    const { data: sections, isLoading, isError } = useSections();

    // Traer las FAQs dinámicamente
    const { data: faqs, isLoading: faqsLoading, isError: faqsError } = useFAQs();
    return (
        <div className="mx-auto max-w-6xl px-4 py-8 space-y-10">
            {/* Hero */}
            <section className="rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8" style={{ background: `linear-gradient(to right, ${VERDE_MUY_CLARO}, ${BLANCO_HUESO})` }}>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                    Sobre <span style={{ color: VERDE_PRINCIPAL }}>Adopciones Quilmes</span>
                </h1>
                <p className="mt-3 text-zinc-700 dark:text-zinc-300 max-w-2xl">
                    Somos un grupo de voluntarios de Quilmes dedicado al rescate, recuperación y
                    adopción responsable de perros y gatos. Trabajamos con hogares de tránsito,
                    campañas de castración y jornadas de adopción.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                    {isLoading ? (
                        <div className="flex gap-3">
                            <div className="px-5 py-2 rounded-xl bg-gray-200 animate-pulse w-24 h-10"></div>
                            <div className="px-5 py-2 rounded-xl bg-gray-200 animate-pulse w-32 h-10"></div>
                        </div>
                    ) : sections && sections.length > 0 ? (
                        sections.map((section) => (
                            <Link
                                key={section.id}
                                href={`/#section-${section.id}`}
                                prefetch={false}
                                className="px-5 py-2 rounded-xl text-white font-semibold shadow transition-colors"
                                style={{ backgroundColor: VERDE_PRINCIPAL }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = VERDE_ACENTO}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = VERDE_PRINCIPAL}
                            >
                                {section.title}
                            </Link>
                        ))
                    ) : (
                        <Link
                            href="/animals"
                            prefetch={false}
                            className="px-5 py-2 rounded-xl text-white font-semibold shadow transition-colors"
                            style={{ backgroundColor: VERDE_PRINCIPAL }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = VERDE_ACENTO}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = VERDE_PRINCIPAL}
                        >
                            Ver Animales
                        </Link>
                    )}
                </div>
            </section>

            {/* Datos rápidos */}
            <section className="grid md:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5">
                    <h3 className="font-semibold">Ubicación</h3>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                        Guido 1180, Quilmes, Buenos Aires
                    </p>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Argentina</p>

                    <div className="mt-3 flex flex-wrap gap-3">
                        {/* <a
                            className="inline-block text-sm text-rose-700 dark:text-rose-400 hover:underline"
                            href={`https://www.google.com/maps/search/?api=1&query=${q}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Ver en Google Maps →
                        </a> */}
                        <a
                            className="inline-block text-sm hover:underline font-semibold"
                            style={{ color: VERDE_PRINCIPAL }}
                            href={`https://www.google.com/maps/dir/?api=1&destination=${q}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Cómo llegar →
                        </a>
                    </div>
                </div>

                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5">
                    <h3 className="font-semibold">Contacto</h3>
                    <ul className="mt-2 space-y-1 text-sm">
                        <li>
                            Email:{" "}
                            <a className="underline font-semibold" style={{ color: VERDE_PRINCIPAL }} href="mailto:adopciones@adopcionesquilmes.org">
                                adopciones@adopcionesquilmes.org
                            </a>
                        </li>

                        <li>
                            Instagram:{" "}
                            <a className="underline font-semibold" style={{ color: VERDE_PRINCIPAL }} href="https://instagram.com/adopcionesquilmes" target="_blank" rel="noopener noreferrer">
                                @adopcionesquilmes
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5">
                    <h3 className="font-semibold">Horarios</h3>
                    <ul className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
                        <li>Lun a Dom: 09:00 – 16:00</li>
                    </ul>
                </div>
            </section>

            {/* Mapa */}
            <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                <div className="aspect-video w-full">
                    {(() => {
                        const ADDRESS = "Guido 1180, Quilmes, Buenos Aires, Argentina";
                        const q = encodeURIComponent(ADDRESS);
                        return (
                            <iframe
                                title="Mapa Adopciones Quilmes"
                                className="w-full h-full"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                src={`https://www.google.com/maps?q=${q}&output=embed`}
                            />
                        );
                    })()}
                </div>
            </section>


            {/* Cómo ayudar */}
            <section className="grid md:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6">
                    <h3 className="text-lg font-semibold">¿Cómo ayudar?</h3>
                    <ul className="mt-3 list-disc pl-5 space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
                        <li>Ofrecé hogar de tránsito.</li>
                        <li>Doná alimento, mantas, piedritas o medicamentos.</li>
                        <li>Ayudá con traslados a veterinaria.</li>
                        <li>Difundí nuestros posteos.</li>
                    </ul>
                    <div className="mt-4 flex gap-3">
                        <Link
                            target="_blank"
                            prefetch={false}
                            href="https://link.mercadopago.com.ar/adonacionesquilmes"
                            className="px-4 py-2 rounded-xl text-white font-semibold text-sm transition-colors cursor-pointer"
                            style={{ backgroundColor: VERDE_PRINCIPAL }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = VERDE_ACENTO}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = VERDE_PRINCIPAL}
                        >
                            Dona tu granito de arena
                        </Link>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-4 py-2 rounded-xl text-white font-semibold text-sm transition-colors cursor-pointer"
                            style={{ backgroundColor: VERDE_PRINCIPAL }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = VERDE_ACENTO}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = VERDE_PRINCIPAL}
                        >
                            Donaciones en especie
                        </button>
                    </div>
                </div>

                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6">
                    <h3 className="text-lg font-semibold">Requisitos de adopción</h3>
                    <ul className="mt-3 list-disc pl-5 space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
                        <li>Ser mayor de 21 años y contar con DNI.</li>
                        <li>Completar el formulario y entrevista.</li>
                        <li>Vivienda segura (balcones/ventanas protegidas en caso de gatos).</li>
                        <li>Compromiso de castración, vacunas y controles veterinarios.</li>
                    </ul>
                    <Link
                        href="/dogs"
                        prefetch={false}
                        className="mt-4 inline-block px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-sm"
                        style={{ backgroundColor: VERDE_PRINCIPAL, color: 'white', fontWeight: 'bold' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = VERDE_ACENTO}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = VERDE_PRINCIPAL}
                    >
                        Ver Perros
                    </Link>
                    <Link
                        href="/cats"
                        prefetch={false}
                        className="mt-4 inline-block px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-sm"
                        style={{ backgroundColor: VERDE_PRINCIPAL, color: 'white', fontWeight: 'bold' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = VERDE_ACENTO}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = VERDE_PRINCIPAL}
                    >
                        Ver Gatos
                    </Link>
                </div>
            </section>

            {/* FAQ */}
            <section id="faqs" className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6">
                <h3 className="text-lg font-semibold">Preguntas frecuentes</h3>

                {faqsLoading ? (
                    <div className="mt-4 space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 animate-pulse">
                                <div className="h-5 bg-gray-200 rounded mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            </div>
                        ))}
                    </div>
                ) : faqsError || !faqs || faqs.length === 0 ? (
                    <div className="mt-4 space-y-3">
                        {/* FAQs por defecto si no hay datos */}
                        <details className="group rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
                            <summary className="cursor-pointer font-medium">
                                ¿Cómo es el proceso de adopción?
                            </summary>
                            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
                                Completás el formulario, coordinamos una charla y, si hay match, firmamos
                                el compromiso de adopción. Hacemos seguimiento durante la adaptación.
                            </p>
                        </details>

                        <details className="group rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
                            <summary className="cursor-pointer font-medium">
                                ¿Puedo conocer a los animales antes?
                            </summary>
                            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
                                Sí, coordinamos visita con turno. Algunos están en hogares de tránsito.
                            </p>
                        </details>

                        <details className="group rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
                            <summary className="cursor-pointer font-medium">
                                ¿Aceptan donaciones?
                            </summary>
                            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
                                ¡Claro! Podés colaborar con insumos o aportes económicos. Escribinos al
                                email y te pasamos los medios de donación.
                            </p>
                        </details>
                    </div>
                ) : (
                    <div className="mt-4 space-y-3">
                        {faqs.map((faq) => (
                            <details key={faq.id} className="group rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
                                <summary className="cursor-pointer font-medium">
                                    {faq.question}
                                </summary>
                                <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
                                    {faq.answer}
                                </p>
                            </details>
                        ))}
                    </div>
                )}
            </section>
            <DonationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}
