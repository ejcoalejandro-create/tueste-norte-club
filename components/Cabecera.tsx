import Link from 'next/link';

const enlaces = [
  { texto: 'Mi suscripción', href: '/' },
  { texto: 'Cafés del mes', href: '/cafes' },
];

export default function Cabecera() {
  return (
    <header className="sticky top-0 z-10 border-b border-stone-200 bg-white">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3" aria-label="Principal">
        <Link href="/" className="text-lg font-bold tracking-wide text-stone-900">
          Club Tueste Norte
        </Link>

        {/* Escritorio: menú en fila */}
        <ul className="hidden gap-6 sm:flex">
          {enlaces.map((enlace) => (
            <li key={enlace.href}>
              <Link href={enlace.href} className="text-stone-600 hover:text-amber-800">
                {enlace.texto}
              </Link>
            </li>
          ))}
        </ul>

        {/* Móvil: desplegable sin JavaScript */}
        <details className="relative sm:hidden">
          <summary className="cursor-pointer list-none rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 [&::-webkit-details-marker]:hidden">
            Menú
          </summary>
          <ul className="absolute right-0 mt-2 w-52 rounded-xl border border-stone-200 bg-white p-2 shadow-lg">
            {enlaces.map((enlace) => (
              <li key={enlace.href}>
                <Link href={enlace.href} className="block rounded-lg px-4 py-3 text-stone-700 hover:bg-amber-50">
                  {enlace.texto}
                </Link>
              </li>
            ))}
          </ul>
        </details>
      </nav>
    </header>
  );
}