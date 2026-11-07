import Link from 'next/link';
import EtiquetaTueste from '@/components/EtiquetaTueste';
import type { Cafe } from '@/data/cafes';

interface TarjetaCafeProps {
  cafe: Cafe;
}

const fondos = {
  claro: 'bg-amber-100',
  medio: 'bg-amber-300',
  oscuro: 'bg-stone-700',
} as const;

export default function TarjetaCafe({ cafe }: TarjetaCafeProps) {
  const precio = cafe.precio.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className={`h-24 ${fondos[cafe.tueste]}`} aria-hidden="true" />

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <EtiquetaTueste nivel={cafe.tueste} />
        </div>

        <h3 className="mt-3 text-xl font-bold text-stone-900">
          <Link href={`/cafes/${cafe.slug}`} className="hover:text-amber-800">
            {cafe.nombre}
          </Link>
        </h3>
        <p className="text-sm text-stone-500">{cafe.origen}</p>

        <p className="mt-3 flex-1 italic text-stone-600">{cafe.notas}</p>

        <p className="mt-4 flex items-center justify-between">
          <span className="font-semibold text-amber-800">{precio}</span>
          <Link href={`/cafes/${cafe.slug}`} className="text-sm font-medium text-amber-800 hover:underline">
            Ver más →
          </Link>
        </p>
      </div>
    </article>
  );
}