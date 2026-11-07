'use client';

interface ErrorEntradasProps {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}

export default function ErrorEntradas({ error, unstable_retry }: ErrorEntradasProps) {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <div className="rounded-xl border border-amber-300 bg-amber-50 p-6">
        <h1 className="text-xl font-bold text-stone-900">No se pudieron cargar las entradas</h1>
        <p className="mt-2 text-stone-700">
          Comprueba que WordPress está encendido e inténtalo de nuevo.
        </p>
        {error.digest && <p className="mt-2 text-xs text-stone-500">Referencia: {error.digest}</p>}
        <button
          type="button"
          onClick={() => unstable_retry()}
          className="mt-4 rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-stone-50 hover:bg-stone-700"
        >
          Reintentar
        </button>
      </div>
    </main>
  );
}