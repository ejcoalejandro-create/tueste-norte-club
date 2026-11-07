'use client';

import { useState } from 'react';

interface BotonFavoritoProps {
  inicial?: boolean;
}

export default function BotonFavorito({ inicial = false }: BotonFavoritoProps) {
  const [favorito, setFavorito] = useState(inicial);

  return (
    <button
      type="button"
      onClick={() => setFavorito((anterior) => !anterior)}
      aria-pressed={favorito}
      className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
        favorito
          ? 'border-amber-500 bg-amber-100 text-amber-900'
          : 'border-stone-300 bg-white text-stone-700 hover:bg-stone-100'
      }`}
    >
      {favorito ? '★ En favoritos' : '☆ Añadir a favoritos'}
    </button>
  );
}