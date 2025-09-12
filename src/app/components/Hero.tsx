'use client';
import Image from 'next/image';


export default function Hero() {
    return (
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-50 to-rose-100 dark:from-zinc-900 dark:to-zinc-800 p-6 md:p-10">
            <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-2 md:items-center">
                <div>
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Adoptá tu próximo mejor amigo 🐾</h1>
                    <p className="mt-3 text-zinc-600 dark:text-zinc-300">
                        Encontrá perros y gatos listos para dar amor. Filtrá por tamaño, edad y ubicación.
                    </p>
                    <div className="mt-5 flex gap-3">
                        <a href="#listado" className="px-4 py-2 rounded-xl bg-rose-600 text-white font-semibold hover:bg-rose-700 transition">Ver animales</a>
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