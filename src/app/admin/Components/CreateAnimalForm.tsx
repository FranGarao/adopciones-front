'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useCreateAnimalMultipart } from '../../../hooks/useCreateAnimalMultipart';
import type { AnimalSex, AnimalSize, AnimalType } from '@/app/types/animal';
import { useMemo, useState } from 'react';
import { VERDE_PRINCIPAL, VERDE_ACENTO, VERDE_MUY_CLARO, BLANCO_HUESO, CASI_NEGRO, VERDE_GRISACEO } from '../../../Constants/colors';
import Swal from 'sweetalert2';

// Revisado: algunos problemas comunes en Zod y RHF para formularios incluyen:
// - nullable+optional puede causar fallback a `undefined` y RHF puede enviar '' string en vez de `null`
// - Los strings optional().nullable() suelen aceptar '' y ese '' entra como undefined, lo que a veces causa problemas según el schema
// - RHF puede mandar string vacío '' en vez de undefined/null a optional/nullable, sobre todo para inputs vacíos
// - Para boolean RHF, defaults siempre ayudan

const schema = z.object({
    name: z.string().min(2, 'Ingresá un nombre'),
    description: z
        .string()
        .max(2000, 'Máximo 2000 caracteres')
        .transform(val => val === '' ? undefined : val)
        .optional(),
    type: z.enum(['DOG', 'CAT', 'OTHER']),
    sex: z.enum(['MALE', 'FEMALE', 'UNKNOWN']),
    size: z.enum(['SMALL', 'MEDIUM', 'LARGE', 'UNKNOWN']),
    age: z
        .preprocess(
            (v) => {
                // RHF puede mandar '' como string
                if (v === '' || v == null) return undefined;
                const num = Number(v);
                return isNaN(num) ? undefined : num;
            },
            z.number().int('Edad debe ser un número entero').min(0, 'Edad mínima 0').max(600, 'Edad máxima 600').optional()
        )
        .optional(),
    breed: z
        .string()
        .max(120, 'Máximo 120 caracteres')
        .transform(val => val === '' ? undefined : val)
        .optional(),
    // location: z.string().max(120).optional().nullable(),
    imageUrl: z
        .string()
        .url('URL inválida')
        .or(z.literal(''))
        .transform(val => val === '' ? undefined : val)
        .optional(),
    galleryText: z
        .string()
        .transform(val => val === '' ? undefined : val)
        .optional(),
    castrated: z.boolean().default(false),
    with_other_pets: z.boolean().default(false),
    with_children: z.boolean().default(false),
});

// Extra fields para RHF (FileList)
type FormValues = z.infer<typeof schema> & {
    main?: FileList;
    gallery?: FileList;
};

export default function CreateAnimalForm() {
    const [mainFile, setMainFile] = useState<File | null>(null);
    const [galleryFiles, setGalleryFiles] = useState<FileList | null>(null);
    const router = useRouter();
    const { createAnimalMultipart, loading } = useCreateAnimalMultipart();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            type: 'DOG',
            sex: 'UNKNOWN',
            size: 'UNKNOWN',
            castrated: false,
            with_other_pets: false,
            with_children: false,
            // // Todos los strings opcionales en blanco
            // name: '',
            // breed: '',
            // description: '',
            // galleryText: '',
            // imageUrl: '',
            // age: undefined,
        },
    });

    const mainPreview = useMemo(() => (mainFile ? URL.createObjectURL(mainFile) : null), [mainFile]);
    const galleryPreviews = useMemo(
        () => (galleryFiles ? Array.from(galleryFiles).map((f) => URL.createObjectURL(f)) : []),
        [galleryFiles]
    );

    const input =
        'w-full rounded-xl border px-3 py-2 text-sm shadow-sm outline-none focus:ring-2 ' +
        'placeholder:text-zinc-400';
    const label = 'block text-sm font-medium mb-1';
    const card =
        'mx-auto max-w-3xl rounded-3xl border border-zinc-200 shadow-lg overflow-hidden';
    const btnPrimary =
        'inline-flex items-center justify-center px-5 py-2 rounded-xl text-white font-semibold ' +
        'shadow-sm disabled:opacity-60';
    const btnOutline =
        'px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800';

    async function onSubmit(values: FormValues) {
        const fd = new FormData();
        console.log(values.age);

        // 1. Adjuntar campos de texto (usando RHF)
        fd.append('name', values.name);
        if (values.description) fd.append('description', values.description);
        fd.append('type', values.type);
        fd.append('sex', values.sex);
        fd.append('size', values.size);
        if (values.age !== undefined && values.age !== null && values.age !== '') fd.append('age', String(values.age));
        if (values.breed) fd.append('breed', values.breed);

        // 2. Adjuntar la Imagen Principal (USANDO EL ESTADO MANUAL)
        if (mainFile) {
            // La clave 'main' es la que busca Multer en el backend
            fd.append('main', mainFile, mainFile.name);
        }

        // 3. Adjuntar la Galería (USANDO EL ESTADO MANUAL)
        if (galleryFiles && galleryFiles.length > 0) {
            Array.from(galleryFiles).forEach((file) => {
                fd.append('gallery', file, file.name);
            });
        }

        // 4. Flags sanitarios como strings
        fd.append('castrated', String(values.castrated));
        fd.append('with_other_pets', String(values.with_other_pets));
        fd.append('with_children', String(values.with_children));

        console.log(fd);

        await createAnimalMultipart(fd);

        reset();
        Swal.fire({ title: 'Animal creado', text: 'El animal ha sido creado correctamente', icon: 'success' });
        //TODO: router.refresh();
        // router.push(`/animals/${created.id}`);
    }

    return (
        <div className={card} style={{ backgroundColor: BLANCO_HUESO }}>
            {/* Header */}
            <div className="p-6" style={{ background: `linear-gradient(to right, ${VERDE_MUY_CLARO}, ${BLANCO_HUESO})` }}>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: CASI_NEGRO }}>Crear nuevo animal</h1>
                <p className="mt-1 text-sm" style={{ color: CASI_NEGRO + '99' }}>
                    Completá la información y publicá el perfil para adopción.
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                {/* Básicos */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className={label}>Nombre</label>
                        <input className={input} placeholder="Ej: Luna" {...register('name')} style={{ backgroundColor: BLANCO_HUESO, color: CASI_NEGRO, borderColor: VERDE_GRISACEO }} />
                        {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name.message as string}</p>}
                    </div>

                    <div>
                        <label className={label}>Raza (opcional)</label>
                        <input className={input} placeholder="Ej: Mestizo" {...register('breed')} />
                        {errors.breed && <p className="mt-1 text-xs text-rose-600">{errors.breed.message as string}</p>}
                    </div>

                    <div>
                        <label className={label}>Tipo</label>
                        <select className={input} {...register('type')}>
                            <option value="DOG">Perro</option>
                            <option value="CAT">Gato</option>
                            <option value="OTHER">Otro</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label className={label}>Sexo</label>
                            <select className={input} {...register('sex')}>
                                <option value="UNKNOWN">Sin dato</option>
                                <option value="MALE">Macho</option>
                                <option value="FEMALE">Hembra</option>
                            </select>
                        </div>
                        <div>
                            <label className={label}>Tamaño</label>
                            <select className={input} {...register('size')}>
                                <option value="UNKNOWN">Sin dato</option>
                                <option value="SMALL">Chico</option>
                                <option value="MEDIUM">Mediano</option>
                                <option value="LARGE">Grande</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className={label}>Edad (años)</label>
                        <input className={input} type="number" min={0} placeholder="Ej: 18" {...register('age')} />
                        {errors.age && <p className="mt-1 text-xs text-rose-600">{errors.age.message as string}</p>}
                    </div>
                </div>

                {/* Descripción */}
                <div>
                    <label className={label}>Descripción</label>
                    <textarea className={`${input} min-h-28`} placeholder="Historia, temperamento, cuidados…" {...register('description')} />
                    {errors.description && <p className="mt-1 text-xs text-rose-600">{errors.description.message as string}</p>}
                </div>

                {/* Imágenes */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className={label}>Imagen principal (archivo)</label>
                        <input
                            type="file"
                            accept="image/*"
                            // No uses register, usa onChange y value/ref
                            onChange={(e) => setMainFile(e.target.files ? e.target.files[0] : null)}
                            className={input}
                        />
                        {mainPreview && (
                            <img
                                src={mainPreview}
                                alt="Preview"
                                className="mt-2 h-24 w-36 object-cover rounded-lg ring-1 ring-zinc-200 dark:ring-zinc-800"
                            />
                        )}
                        <p className="mt-1 text-xs text-zinc-500">Podés elegir desde la galería del dispositivo.</p>
                    </div>

                    <div>
                        <label className={label}>Galería (archivos múltiples)</label>
                        <input type="file" accept="image/*" multiple onChange={(e) => setGalleryFiles(e.target.files)} className={input} />
                        {galleryPreviews.length > 0 && (
                            <div className="mt-2 flex gap-2 overflow-x-auto">
                                {galleryPreviews.map((src, i) => (
                                    <img
                                        key={i}
                                        src={src}
                                        alt={`g${i}`}
                                        className="h-16 w-24 object-cover rounded-lg ring-1 ring-zinc-200 dark:ring-zinc-800"
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-3">
                    {/* <label className="inline-flex items-center gap-2">
                        <input type="checkbox" className="h-4 w-4" {...register('vaccinated')} />
                        <span>Vacunado</span>
                    </label>
                    <label className="inline-flex items-center gap-2">
                        <input type="checkbox" className="h-4 w-4" {...register('dewormed')} />
                        <span>Desparasitado</span>
                    </label> */}
                    <label className="inline-flex items-center gap-2">
                        <input type="checkbox" className="h-4 w-4" {...register('castrated')} />
                        <span>Castrado</span>
                    </label>
                    <label className="inline-flex items-center gap-2">
                        <input type="checkbox" className="h-4 w-4" {...register('with_other_pets')} />
                        <span>Va con otras mascotas</span>
                    </label>
                    <label className="inline-flex items-center gap-2">
                        <input type="checkbox" className="h-4 w-4" {...register('with_children')} />
                        <span>Va con niños</span>
                    </label>
                </div>

                {/* Acciones */}
                <div className="flex items-center justify-end gap-3 pt-2">
                    <button type="button" className={btnOutline} onClick={() => reset()}>
                        Limpiar
                    </button>
                    <button type="submit" disabled={loading} className={btnPrimary} style={{ backgroundColor: VERDE_PRINCIPAL }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = VERDE_ACENTO} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = VERDE_PRINCIPAL}>
                        {loading ? 'Creando…' : 'Crear'}
                    </button>
                </div>
            </form>
        </div>
    );
}
