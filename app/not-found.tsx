import Link from 'next/link';

export default function NoEncontrada() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 text-center">
      <p className="text-sm font-medium uppercase tracking-widest text-amber-800">Error 404</p>
      <h1 className="mt-3 text-3xl font-bold text-stone-900">No encontramos esa página</h1>
      <p className="mt-4 text-stone-600">Puede que el enlace esté mal escrito o que ya no exista.</p>
      <p className="mt-8">
        <Link href="/" className="font-medium text-amber-800 hover:underline">
          Volver al inicio
        </Link>
      </p>
    </main>
  );
}