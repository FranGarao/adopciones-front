'use client';
import Image from 'next/image';
import { VERDE_PRINCIPAL, VERDE_ACENTO, VERDE_MUY_CLARO, BLANCO_HUESO, CASI_NEGRO } from '../../Constants/colors';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Swal from 'sweetalert2';


export default function Hero() {

    const littleDogAlert = () => {
        Swal.fire({
            title: 'Atención',
            html: 'Los cachorros los publicamos en nuestro perfil de Instagram <b><a href="https://www.instagram.com/adopcionesquilmes" target="_blank">@adopcionesquilmes</a></b> con un numero particular.',
            icon: 'warning',
        });
    };
    return (
        <section className="relative overflow-hidden rounded-2xl p-6 md:p-10" style={{ background: `linear-gradient(to bottom right, ${VERDE_MUY_CLARO}, ${BLANCO_HUESO})` }}>
            <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-2 md:items-center">
                <div>
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight" style={{ color: CASI_NEGRO }}>Adoptá tu próximo mejor amigo 🐾</h1>
                    <p className="mt-3" style={{ color: CASI_NEGRO + '99' }}>
                        Encontrá perros y gatos listos para dar amor. Filtrá por tamaño, edad y ubicación.
                    </p>
                    <div className="mt-5 flex gap-3">
                        <Link href="/dogs" className="px-4 py-2 rounded-xl text-white font-semibold transition-colors" style={{ backgroundColor: VERDE_PRINCIPAL }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = VERDE_ACENTO} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = VERDE_PRINCIPAL}>Ver Perros</Link>
                        <Link href="/cats" className="px-4 py-2 rounded-xl text-white font-semibold transition-colors" style={{ backgroundColor: VERDE_PRINCIPAL }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = VERDE_ACENTO} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = VERDE_PRINCIPAL}>Ver Gatos</Link>
                        <span onClick={littleDogAlert} className="px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 font-semibold hover:bg-white/60 dark:hover:bg-white/5 transition">Ver Cachorros</span>
                    </div>

                </div>

                <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow">
                    {(() => {
                        // List of images in /public/animals/backgrounds
                        const images = [
                            "/animals/backgrounds/dog-1.jpg",
                            "/animals/backgrounds/dog-2.jpg",
                            "/animals/backgrounds/cat-2.jpg",
                            "/animals/backgrounds/dog-3.jpg",
                            "/animals/backgrounds/cat-3.jpg",
                            "/animals/backgrounds/dog-4.jpg",
                            "/animals/backgrounds/cat-4.jpg",
                            "/animals/backgrounds/dog-5.jpg",
                            "/animals/backgrounds/dog-6.jpg",
                        ];
                        // Carousel state
                        const [index, setIndex] = useState(0);

                        // Auto-advance every 3 seconds
                        useEffect(() => {
                            const interval = setInterval(() => {
                                setIndex((prev) => (prev + 1) % images.length);
                            }, 3000);
                            return () => clearInterval(interval);
                        }, [images.length]);

                        return (
                            // Añado 'flex justify-center items-center' al contenedor principal para centrar el contenido (aunque 'fill' lo hace innecesario)
                            <div className="w-full h-full relative flex justify-center items-center">
                                {images.map((src, i) => (
                                    <Image
                                        key={src}
                                        src={src}
                                        alt="Mascotas"
                                        fill
                                        // 'object-cover' ya centra la imagen dentro de su espacio 'fill'
                                        className={`object-cover transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`}
                                        priority={i === 0}
                                        // Simplifico la lógica de Z-Index para que solo la imagen actual esté visible en la capa superior
                                        style={{ zIndex: i === index ? 1 : 0 }}
                                    />
                                ))}
                                {/* Dots */}
                                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                                    {images.map((_, i) => (
                                        <button
                                            key={i}
                                            className={`w-2 h-2 rounded-full ${i === index ? "bg-white" : "bg-white/50"} border border-zinc-300`}
                                            style={{ outline: "none" }}
                                            aria-label={`Imagen ${i + 1}`}
                                            onClick={() => setIndex(i)}
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    })()}
                </div>
            </div>
        </section >
    );
}