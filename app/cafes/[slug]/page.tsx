import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BotonFavorito from '@/components/BotonFavorito';
import EtiquetaTueste from '@/components/EtiquetaTueste';
import { getCafe, getCafes } from '@/data/cafes';

interface PaginaCafeProps {
  params: Promise<{ slug: string }>;
}

// Genera por adelantado las páginas de los cafés que existen.
export function generateStaticParams() {
  return getCafes().map((cafe) => ({ slug: cafe.slug }));
}

export async function generateMetadata({ params }: PaginaCafeProps): Promise<Metadata> {
  const { slug } = await params;
  const cafe = getCafe(slug);
  return { title: cafe ? cafe.nombre : 'Café no encontrado' };
}

export default async function PaginaCafe({ params }: PaginaCafeProps) {
  const { slug } = await params;
  const cafe = getCafe(slug);

  if (!cafe) {
    notFound();
  }

  const precio = cafe.precio.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <Link href="/cafes" className="text-sm text-amber-800 hover:underline">
        ← Cafés del mes
      </Link>

      <h1 className="mt-4 text-3xl font-bold text-stone-900 sm:text-4xl">{cafe.nombre}</h1>
      <p className="mt-1 text-lg text-stone-600">{cafe.origen}</p>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <EtiquetaTueste nivel={cafe.tueste} />
        <BotonFavorito />
      </div>

      <p className="mt-6 text-lg text-stone-700">{cafe.descripcion}</p>

      <dl className="mt-8 grid grid-cols-1 gap-4 rounded-xl border border-stone-200 bg-white p-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <dt className="text-sm font-medium text-stone-500">Notas de cata</dt>
          <dd className="mt-1 italic text-stone-800">{cafe.notas}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-stone-500">Origen</dt>
          <dd className="mt-1 text-stone-800">{cafe.origen}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-stone-500">Precio de la bolsa de 250 g</dt>
          <dd className="mt-1 text-xl font-bold text-amber-800">{precio}</dd>
        </div>
      </dl>
    </main>
  );
}