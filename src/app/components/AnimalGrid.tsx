'use client';
import { Animal } from '../types/animal';
import AnimalCard from './AnimalCard';


export default function AnimalGrid({ animals }: { animals: Animal[] }) {
    if (!animals.length) {
        return (
            <div className="text-center py-16 text-zinc-600 dark:text-zinc-300">No se encontraron animales con esos filtros 🐾</div>
        );
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {animals.map((a) => (
                <AnimalCard key={a.id} animal={a} />
            ))}
        </div>
    );
}