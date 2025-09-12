'use client';

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import type { Animal } from "../types/animal";
import { useAnimalsStore } from "../store/useAnimalsStore";

const schema = z.object({
    animalId: z.union([z.string(), z.number()]),
    fullName: z.string().min(2, "Ingresá tu nombre completo"),
    email: z.string().email("Email inválido"),
    phone: z.string().regex(/^\+?[0-9\s()-]{7,}$/, "Teléfono inválido"),
    city: z.string().min(1, "Campo requerido"),
    province: z.string().min(1, "Campo requerido"),
    housingType: z.enum(["HOUSE", "APARTMENT", "COUNTRY", "OTHER"]),
    hasOtherPets: z.boolean().default(false),
    message: z.string().optional(),
    acceptTerms: z.literal(true, { errorMap: () => ({ message: "Debes aceptar los términos" }) }),
});

export type AdoptionFormData = z.infer<typeof schema>;

export function AdoptionForm({
    animal,
    onSubmit,
    isSubmitting = false,
}: {
    animal: Animal;
    onSubmit: (data: AdoptionFormData) => void | Promise<void>;
    isSubmitting?: boolean;
}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<AdoptionFormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            animalId: animal.id,
            fullName: "",
            email: "",
            phone: "",
            city: "",
            province: "",
            housingType: "HOUSE",
            hasOtherPets: false,
            message: "",
            acceptTerms: false,
        },
        mode: "onSubmit", // no valida en cada tecla
    });

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 space-y-5"
        >
            <header className="flex items-center gap-4">
                <Image
                    src={animal.imageUrl || "/animals/placeholder.jpg"}
                    alt={animal.name}
                    className="h-16 w-20 object-cover rounded-lg"
                    width={80}
                    height={80}
                />
                <div>
                    <h2 className="text-xl font-semibold">Formulario de adopción</h2>
                    <p className="text-sm text-gray-500">Postulación para: {animal.name}</p>
                </div>
            </header>

            <div className="grid md:grid-cols-2 gap-4">
                <Field label="Nombre y apellido" error={errors.fullName?.message}>
                    <input className="input" {...register("fullName")} placeholder="Ej: María Pérez" />
                </Field>
                <Field label="Email" error={errors.email?.message}>
                    <input className="input" type="email" {...register("email")} placeholder="tu@mail.com" />
                </Field>
                <Field label="Teléfono" error={errors.phone?.message}>
                    <input className="input" {...register("phone")} placeholder="+54 9 11 2222-3333" />
                </Field>
                <Field label="Ciudad" error={errors.city?.message}>
                    <input className="input" {...register("city")} placeholder="CABA" />
                </Field>
                <Field label="Provincia" error={errors.province?.message}>
                    <input className="input" {...register("province")} placeholder="Buenos Aires" />
                </Field>
                <Field label="Tipo de vivienda">
                    <select className="input" {...register("housingType")}>
                        <option value="HOUSE">Casa</option>
                        <option value="APARTMENT">Departamento</option>
                        <option value="COUNTRY">Quinta/Chacra</option>
                        <option value="OTHER">Otro</option>
                    </select>
                </Field>
            </div>

            <Field label="¿Tenés otras mascotas?">
                <label className="inline-flex items-center gap-2">
                    <input type="checkbox" {...register("hasOtherPets")} />
                    <span>Sí</span>
                </label>
            </Field>

            <Field label="Contanos por qué querés adoptar (opcional)">
                <textarea className="input min-h-28" {...register("message")} placeholder="Motivación, experiencia, espacio, etc." />
            </Field>

            <Field error={errors.acceptTerms?.message}>
                <label className="inline-flex items-start gap-2 text-sm">
                    <input type="checkbox" {...register("acceptTerms")} />
                    <span>Acepto los términos y condiciones y autorizo el uso de mis datos para gestionar la adopción.</span>
                </label>
            </Field>

            <div className="flex gap-3 justify-end">
                <button type="button" className="px-4 py-2 rounded-xl border" onClick={() => reset()}>
                    Limpiar
                </button>
                <button type="submit" disabled={isSubmitting} className="px-5 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 disabled:opacity-60">
                    {isSubmitting ? "Enviando…" : "Enviar solicitud"}
                </button>
            </div>
        </form>
    );
}

function Field({ label, error, children }: { label?: string; error?: string; children: React.ReactNode }) {
    return (
        <div>
            {label && <label className="block text-sm font-medium mb-1">{label}</label>}
            {children}
            {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
        </div>
    );
}
