import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getMetodo } from '@/data/metodos';

interface PaginaMetodoProps {
  params: Promise<{ slug: string }>;
}

export default async function PaginaMetodo({ params }: PaginaMetodoProps) {
  const { slug } = await params;
  const metodo = getMetodo(slug);

  if (!metodo) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl p-6">
      <Link href="/ejercicios/metodos" className="text-sm text-amber-800 hover:underline">
        ← Todos los métodos
      </Link>

      <h1 className="mt-4 text-3xl font-bold text-stone-900">{metodo.nombre}</h1>
      <p className="mt-2 text-lg text-stone-600">{metodo.descripcion}</p>

      <dl className="mt-6 grid grid-cols-1 gap-4 rounded-xl border border-stone-200 bg-white p-5 sm:grid-cols-3">
        <div>
          <dt className="text-sm font-medium text-stone-500">Molienda</dt>
          <dd className="mt-1 text-stone-800">{metodo.molienda}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-stone-500">Proporción</dt>
          <dd className="mt-1 text-stone-800">{metodo.proporcion}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-stone-500">Tiempo</dt>
          <dd className="mt-1 text-stone-800">{metodo.tiempo}</dd>
        </div>
      </dl>

      <h2 className="mt-8 text-xl font-semibold text-stone-900">Pasos</h2>
      <ol className="mt-3 list-decimal space-y-2 pl-6 text-stone-700">
        {metodo.pasos.map((paso) => (
          <li key={paso}>{paso}</li>
        ))}
      </ol>
    </main>
  );
}