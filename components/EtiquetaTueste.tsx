type Nivel = 'claro' | 'medio' | 'oscuro';

interface EtiquetaTuesteProps {
  nivel: Nivel;
}

const estilos: Record<Nivel, string> = {
  claro: 'bg-amber-100 text-amber-900',
  medio: 'bg-amber-300 text-amber-950',
  oscuro: 'bg-stone-700 text-stone-50',
};

export default function EtiquetaTueste({ nivel }: EtiquetaTuesteProps) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${estilos[nivel]}`}
    >
      tueste {nivel}
    </span>
  );
}