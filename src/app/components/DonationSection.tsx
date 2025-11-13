'use client';

import { useState } from 'react';
import { VERDE_PRINCIPAL, VERDE_ACENTO, BLANCO_HUESO, CASI_NEGRO } from '@/Constants/colors';
import DonationModal from './DonationModal';

export default function DonationSection() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // URL de MercadoPago - deberías reemplazar esto con tu link real
    const mercadoPagoUrl = "https://link.mercadopago.com.ar/adonacionesquilmes";

    const handleMercadoPagoDonation = () => {
        window.open(mercadoPagoUrl, '_blank');
    };

    return (
        <section className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: CASI_NEGRO }}>
                    ¿Querés ayudar?
                </h2>
                <p className="text-lg" style={{ color: CASI_NEGRO + '99' }}>
                    Tu colaboración hace la diferencia en la vida de nuestros rescatados
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Donación monetaria */}
                <div
                    className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 text-center hover:shadow-lg transition-shadow"
                    style={{ background: `linear-gradient(to bottom right, ${BLANCO_HUESO}, #f8f9fa)` }}
                >
                    <div className="mb-4">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl" style={{ backgroundColor: VERDE_PRINCIPAL }}>
                            💰
                        </div>
                        <h3 className="text-xl font-semibold mb-2" style={{ color: CASI_NEGRO }}>
                            Doná tu granito de arena
                        </h3>
                        <p className="text-sm mb-4" style={{ color: CASI_NEGRO + '99' }}>
                            Ayudanos con una donación monetaria para cubrir gastos veterinarios, alimento y medicamentos.
                        </p>
                    </div>
                    <button
                        onClick={handleMercadoPagoDonation}
                        className="w-full px-6 py-3 rounded-xl text-white font-semibold transition-colors cursor-pointer"
                        style={{ backgroundColor: VERDE_PRINCIPAL }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = VERDE_ACENTO}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = VERDE_PRINCIPAL}
                    >
                        Donar con MercadoPago
                    </button>
                </div>

                {/* Donación en especie */}
                <div
                    className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 text-center hover:shadow-lg transition-shadow"
                    style={{ background: `linear-gradient(to bottom right, ${BLANCO_HUESO}, #f8f9fa)` }}
                >
                    <div className="mb-4">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl" style={{ backgroundColor: VERDE_PRINCIPAL }}>
                            🎁
                        </div>
                        <h3 className="text-xl font-semibold mb-2" style={{ color: CASI_NEGRO }}>
                            Donaciones en especie
                        </h3>
                        <p className="text-sm mb-4" style={{ color: CASI_NEGRO + '99' }}>
                            ¿Tenés alimento, medicamentos, mantas o productos de limpieza? ¡También nos ayuda mucho!
                        </p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full px-6 py-3 rounded-xl border border-zinc-300 font-semibold hover:bg-white/60 transition-colors cursor-pointer"
                        style={{ color: CASI_NEGRO }}
                    >
                        Registrar Donación
                    </button>
                </div>
            </div>

            <DonationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </section>
    );
}
