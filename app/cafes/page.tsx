import type { Metadata } from 'next';
import TarjetaCafe from '@/components/TarjetaCafe';
import { getCafes } from '@/data/cafes';

export const metadata: Metadata = {
  title: 'Cafés del mes',
};

export default function PaginaCafes() {
  const cafes = getCafes();

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
      <h1 className="text-3xl font-bold text-stone-900 sm:text-4xl">Cafés del mes</h1>
      <p className="mt-3 max-w-2xl text-stone-600">
        La selección de este mes para los socios del club. Entra en cada café para leer más.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cafes.map((cafe) => (
          <TarjetaCafe key={cafe.slug} cafe={cafe} />
        ))}
      </div>
    </main>
  );
}