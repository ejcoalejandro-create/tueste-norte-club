import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { ESTADOS_PEDIDO, pedidos, type EstadoPedido } from '@/db/schema';

// La respuesta depende de la base de datos y de la URL: se calcula en cada petición.
export const dynamic = 'force-dynamic';

function esEstadoValido(valor: string): valor is EstadoPedido {
  return (ESTADOS_PEDIDO as readonly string[]).includes(valor);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const estado = searchParams.get('estado');

  // Filtro opcional: ?estado=enviado. Un valor desconocido es un error del cliente.
  if (estado !== null && !esEstadoValido(estado)) {
    return Response.json(
      {
        error: `Estado no válido: "${estado}". Valores admitidos: ${ESTADOS_PEDIDO.join(', ')}.`,
      },
      { status: 400 },
    );
  }

  const lista = await db.query.pedidos.findMany({
    where: estado ? eq(pedidos.estado, estado) : undefined,
    with: {
      cliente: {
        with: { plan: true },
      },
    },
    orderBy: (pedido, { asc, desc }) => [desc(pedido.mes), asc(pedido.id)],
  });

  // Devolvemos una forma estable y limpia, no las filas tal cual salen de la base de datos.
  const respuesta = lista.map((pedido) => ({
    id: pedido.id,
    mes: pedido.mes,
    cafe: pedido.cafe,
    estado: pedido.estado,
    cliente: {
      id: pedido.cliente.id,
      nombre: pedido.cliente.nombre,
      email: pedido.cliente.email,
      plan: {
        nombre: pedido.cliente.plan.nombre,
        gramosAlMes: pedido.cliente.plan.gramosAlMes,
        precioMensual: pedido.cliente.plan.precioMensual,
      },
    },
  }));

  return Response.json(respuesta);
}