// app/adopt/[id]/page.tsx
import AdoptClient from './AdoptClient';


export async function generateMetadata() {
    return { title: `Formulario de Adopción` };
}


export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params; // 👈 evita el error de Next
    return <AdoptClient id={id} />;
}
