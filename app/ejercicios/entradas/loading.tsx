export default function CargandoEntradas() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-bold text-stone-900">Últimas entradas del blog</h1>
      <ul className="mt-6 space-y-3" aria-busy="true">
        {[1, 2, 3].map((n) => (
          <li key={n} className="animate-pulse rounded-xl border border-stone-200 bg-white p-4">
            <div className="h-4 w-2/3 rounded bg-stone-200" />
            <div className="mt-2 h-3 w-24 rounded bg-stone-100" />
          </li>
        ))}
      </ul>
    </main>
  );
}