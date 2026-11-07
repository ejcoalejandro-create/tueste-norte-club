import Link from 'next/link';
import SelectorBolsas from '@/components/SelectorBolsas';
import TarjetaCafe from '@/components/TarjetaCafe';
import { getCafes } from '@/data/cafes';
import { socio } from '@/data/socio';

export default function Dashboard() {
  const proximoEnvio = new Date(socio.proximoEnvio).toLocaleDateString('es-ES', {
    dateStyle: 'long',
    timeZone: 'UTC',
  });
  const socioDesde = new Date(socio.socioDesde).toLocaleDateString('es-ES', {
    dateStyle: 'long',
    timeZone: 'UTC',
  });
  const cafes = getCafes().slice(0, 3);

  const resumen = [
    { etiqueta: 'Plan', valor: socio.plan },
    { etiqueta: 'Bolsas al mes', valor: String(socio.bolsasAlMes) },
    { etiqueta: 'Próximo envío', valor: proximoEnvio },
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
      <p className="text-sm font-medium uppercase tracking-widest text-amber-800">Área de socios</p>
      <h1 className="mt-2 text-3xl font-bold text-stone-900 sm:text-4xl">Hola, {socio.nombre}</h1>
      <p className="mt-2 text-stone-600">Socia desde el {socioDesde}.</p>

      <section className="mt-8" aria-labelledby="resumen">
        <h2 id="resumen" className="text-xl font-semibold text-stone-900">
          Resumen de tu suscripción
        </h2>
        <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {resumen.map((dato) => (
            <div key={dato.etiqueta} className="rounded-xl border border-stone-200 bg-white p-5">
              <dt className="text-sm font-medium text-stone-500">{dato.etiqueta}</dt>
              <dd className="mt-1 text-lg font-semibold text-stone-900">{dato.valor}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="mt-8">
        <SelectorBolsas inicial={socio.bolsasAlMes} precioBolsa={socio.precioBolsa} />
      </div>

      <section className="mt-12" aria-labelledby="seleccion">
        <div className="flex items-end justify-between gap-4">
          <h2 id="seleccion" className="text-xl font-semibold text-stone-900">
            Tu selección de este mes
          </h2>
          <Link href="/cafes" className="shrink-0 text-sm font-medium text-amber-800 hover:underline">
            Ver todos →
          </Link>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cafes.map((cafe) => (
            <TarjetaCafe key={cafe.slug} cafe={cafe} />
          ))}
        </div>
      </section>
    </main>
  );
}