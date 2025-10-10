import Link from "next/link";
import Image from "next/image";
import { BLANCO_HUESO, CASI_NEGRO } from '../../Constants/colors';

export function NavBar() {
    return (
        <header className="sticky top-0 z-50 border-b backdrop-blur" style={{ backgroundColor: `${BLANCO_HUESO}CC` }}>
            <div className="mx-auto max-w-6xl h-14 px-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <Image src="/logo.png" alt="Adopciones Quilmes" width={100} height={100} />
                </Link>
                <h1 className="text-2xl font-semibold tracking-tight" style={{ color: CASI_NEGRO }}>
                    Adopciones Quilmes
                </h1>
                {/* Opcional: enlaces de navegación */}
                <nav className="hidden sm:flex items-center gap-4 text-sm">
                    <Link href="/" className="opacity-80 hover:opacity-100">Inicio</Link>
                    <Link href="/animals" className="opacity-80 hover:opacity-100">Animales</Link>
                    <Link href="/#about" className="opacity-80 hover:opacity-100">Sobre nosotros</Link>
                </nav>
            </div>
        </header>
    );
}
