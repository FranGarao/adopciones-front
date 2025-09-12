
import AnimalProfileClient from './AnimalProfileClient';

export async function generateMetadata() {
    return { title: `Ficha Informativa` };
}


export default async function AnimalPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    return <AnimalProfileClient id={id} />;
}
