import type { EstadoPedido } from '@/db/schema';

interface EtiquetaEstadoProps {
  estado: EstadoPedido;
}

const estilos: Record<EstadoPedido, string> = {
  pendiente: 'bg-stone-200 text-stone-800',
  tostando: 'bg-amber-200 text-amber-900',
  enviado: 'bg-sky-100 text-sky-900',
  entregado: 'bg-emerald-100 text-emerald-800',
};

export default function EtiquetaEstado({ estado }: EtiquetaEstadoProps) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize ${estilos[estado]}`}
    >
      {estado}
    </span>
  );
}