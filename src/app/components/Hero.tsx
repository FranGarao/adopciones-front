'use client';
import Image from 'next/image';
import { VERDE_PRINCIPAL, VERDE_ACENTO, VERDE_MUY_CLARO, BLANCO_HUESO, CASI_NEGRO } from '../../Constants/colors';


export default function Hero() {
    return (
        <section className="relative overflow-hidden rounded-2xl p-6 md:p-10" style={{ background: `linear-gradient(to bottom right, ${VERDE_MUY_CLARO}, ${BLANCO_HUESO})` }}>
            <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-2 md:items-center">
                <div>
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight" style={{ color: CASI_NEGRO }}>Adoptá tu próximo mejor amigo 🐾</h1>
                    <p className="mt-3" style={{ color: CASI_NEGRO + '99' }}>
                        Encontrá perros y gatos listos para dar amor. Filtrá por tamaño, edad y ubicación.
                    </p>
                    <div className="mt-5 flex gap-3">
                        <a href="#listado" className="px-4 py-2 rounded-xl text-white font-semibold transition-colors" style={{ backgroundColor: VERDE_PRINCIPAL }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = VERDE_ACENTO} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = VERDE_PRINCIPAL}>Ver animales</a>
                        <a href="#about" className="px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 font-semibold hover:bg-white/60 dark:hover:bg-white/5 transition">Cómo funciona</a>
                    </div>
                </div>
                <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow">
                    <Image src="/animals/placeholder.jpg" alt="Mascotas" fill className="object-cover" priority />
                </div>
            </div>
        </section>
    );
}