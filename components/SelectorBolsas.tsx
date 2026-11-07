'use client';

import { useState } from 'react';

interface SelectorBolsasProps {
  inicial: number;
  precioBolsa: number;
}

const MINIMO = 1;
const MAXIMO = 6;

function aEuros(valor: number): string {
  return valor.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });
}

export default function SelectorBolsas({ inicial, precioBolsa }: SelectorBolsasProps) {
  const [bolsas, setBolsas] = useState(inicial);

  const hayCambios = bolsas !== inicial;

  return (
    <section className="rounded-xl border border-stone-200 bg-white p-5 sm:p-6">
      <h2 className="text-xl font-semibold text-stone-900">Juega con tu plan</h2>
      <p className="mt-1 text-sm text-stone-500">
        Cambia el número de bolsas para ver cuánto costaría. Es una simulación: todavía no se guarda nada.
      </p>

      <div className="mt-5 flex items-center gap-4">
        <button
          type="button"
          onClick={() => setBolsas((n) => Math.max(MINIMO, n - 1))}
          disabled={bolsas <= MINIMO}
          aria-label="Una bolsa menos"
          className="h-11 w-11 rounded-full border border-stone-300 text-xl font-bold text-stone-700 hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          −
        </button>

        <p className="min-w-24 text-center" aria-live="polite">
          <span className="block text-3xl font-bold text-stone-900">{bolsas}</span>
          <span className="text-sm text-stone-500">{bolsas === 1 ? 'bolsa' : 'bolsas'} al mes</span>
        </p>

        <button
          type="button"
          onClick={() => setBolsas((n) => Math.min(MAXIMO, n + 1))}
          disabled={bolsas >= MAXIMO}
          aria-label="Una bolsa más"
          className="h-11 w-11 rounded-full border border-stone-300 text-xl font-bold text-stone-700 hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          +
        </button>
      </div>

      <p className="mt-5 text-lg text-stone-700">
        Total mensual: <strong className="text-amber-800">{aEuros(bolsas * precioBolsa)}</strong>
        <span className="text-sm text-stone-400"> ({aEuros(precioBolsa)} por bolsa)</span>
      </p>

      {hayCambios && (
        <button
          type="button"
          onClick={() => setBolsas(inicial)}
          className="mt-4 text-sm font-medium text-amber-800 hover:underline"
        >
          Volver a mi plan actual ({inicial})
        </button>
      )}
    </section>
  );
}