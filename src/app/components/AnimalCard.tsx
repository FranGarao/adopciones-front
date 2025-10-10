'use client';
import { Animal } from '../types/animal';
import { monthsToFriendly } from '../../lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useAnimalsStore } from '../store/useAnimalsStore';
import { VERDE_PRINCIPAL, VERDE_ACENTO, BLANCO_HUESO, CASI_NEGRO } from '../../Constants/colors';

export default function AnimalCard({ animal }: { animal: Animal }) {
    const setAnimal = useAnimalsStore((s) => s.setAnimal);

    const imageUrl = animal.imageUrl || '/animals/placeholders/placeholder.jpg';
    const age = animal.age_months ? monthsToFriendly(animal.age_months) : 'Unknown';
    return (
        <article className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition" style={{ backgroundColor: BLANCO_HUESO }}>
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow">
                <Image src={`${process.env.NEXT_PUBLIC_IMAGES_URL}${imageUrl}`} alt={animal.name} fill
                    className="object-cover group-hover:scale-105 transition"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute left-2 top-2 flex gap-2">
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-black/60 backdrop-blur border border-zinc-200 dark:border-zinc-700">
                        {animal.type === 'DOG' ? 'Perro' : animal.type === 'CAT' ? 'Gato' : 'Otro'}
                    </span>
                </div>
                <div className="absolute left-2 top-2 flex gap-2">
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-black/60 backdrop-blur border border-zinc-200 dark:border-zinc-700">
                        {animal.sex === 'MALE' ? 'Macho' : animal.sex === 'FEMALE' ? 'Hembra' : 'Unknown'}
                    </span>
                    {animal.size !== 'UNKNOWN' && (
                        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-black/60 backdrop-blur border border-zinc-200 dark:border-zinc-700">
                            {animal.size === 'SMALL' ? 'Pequeño' : animal.size === 'MEDIUM' ? 'Mediano' : animal.size === 'LARGE' ? 'Grande' : 'XL'}
                        </span>
                    )}
                </div>
            </div >


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
        </article >
    );
}