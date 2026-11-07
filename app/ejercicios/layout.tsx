import Link from 'next/link';
import type { ReactNode } from 'react';

interface EjerciciosLayoutProps {
  children: ReactNode;
}

const enlaces = [
  { texto: 'Inicio', href: '/ejercicios' },
  { texto: 'Métodos', href: '/ejercicios/metodos' },
  { texto: 'Componentes', href: '/ejercicios/componentes' },
];

export default function EjerciciosLayout({ children }: EjerciciosLayoutProps) {
  return (
    <div>
      <nav className="border-b border-stone-200 bg-white">
        <ul className="mx-auto flex max-w-3xl flex-wrap gap-x-6 gap-y-2 px-6 py-4">
          {enlaces.map((enlace) => (
            <li key={enlace.href}>
              <Link href={enlace.href} className="font-medium text-stone-700 hover:text-amber-800">
                {enlace.texto}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {children}
    </div>
  );
}