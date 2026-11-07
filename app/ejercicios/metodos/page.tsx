import Link from 'next/link';
import { metodos } from '@/data/metodos';

export default function ListaMetodos() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-bold text-stone-900">Métodos de preparación</h1>

      <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {metodos.map((metodo) => (
          <li key={metodo.slug}>
            <Link
              href={`/ejercicios/metodos/${metodo.slug}`}
              className="block h-full rounded-xl border border-stone-200 bg-white p-5 transition-shadow hover:shadow-md"
            >
              <h2 className="text-xl font-semibold text-stone-900">{metodo.nombre}</h2>
              <p className="mt-2 text-stone-600">{metodo.descripcion}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}