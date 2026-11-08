import type { Metadata } from 'next';
import EtiquetaEstado from '@/components/EtiquetaEstado';
import { db } from '@/db';

export const metadata: Metadata = {
  title: 'Pedidos del mes',
};

// Los pedidos se leen de la base de datos en cada visita, no al compilar.
export const dynamic = 'force-dynamic';

function nombreMes(mes: string): string {
  const [anio, numero] = mes.split('-').map(Number);
  const fecha = new Date(Date.UTC(anio, numero - 1, 1));
  const texto = fecha.toLocaleDateString('es-ES', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

export default async function PaginaPedidos() {
  const lista = await db.query.pedidos.findMany({
    with: {
      cliente: {
        with: { plan: true },
      },
    },
    orderBy: (pedido, { asc, desc }) => [desc(pedido.mes), asc(pedido.id)],
  });

  // Agrupamos por mes manteniendo el orden (más reciente primero).
  const porMes = new Map<string, typeof lista>();
  for (const pedido of lista) {
    const grupo = porMes.get(pedido.mes) ?? [];
    grupo.push(pedido);
    porMes.set(pedido.mes, grupo);
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
      <h1 className="text-3xl font-bold text-stone-900 sm:text-4xl">Pedidos del club</h1>
      <p className="mt-3 max-w-2xl text-stone-600">
        Qué café le toca a cada socio cada mes y en qué estado está su pedido.
      </p>

      {lista.length === 0 ? (
        <p className="mt-8 rounded-xl border border-stone-200 bg-white p-6 text-stone-600">
          Todavía no hay pedidos.
        </p>
      ) : (
        <div className="mt-8 space-y-10">
          {[...porMes.entries()].map(([mes, pedidosDelMes]) => (
            <section key={mes} aria-labelledby={`mes-${mes}`}>
              <h2 id={`mes-${mes}`} className="text-xl font-semibold text-stone-900">
                {nombreMes(mes)}
                <span className="ml-2 text-sm font-normal text-stone-500">
                  ({pedidosDelMes.length} {pedidosDelMes.length === 1 ? 'pedido' : 'pedidos'})
                </span>
              </h2>

              <ul className="mt-4 space-y-3">
                {pedidosDelMes.map((pedido) => (
                  <li
                    key={pedido.id}
                    className="flex flex-col gap-3 rounded-xl border border-stone-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="font-semibold text-stone-900">{pedido.cliente.nombre}</p>
                      <p className="text-sm text-stone-500">Plan {pedido.cliente.plan.nombre}</p>
                    </div>
                    <p className="text-stone-700">{pedido.cafe}</p>
                    <EtiquetaEstado estado={pedido.estado} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </main>
  );
}