export type Tueste = 'claro' | 'medio' | 'oscuro';

export interface Cafe {
  slug: string;
  nombre: string;
  origen: string;
  notas: string;
  tueste: Tueste;
  precio: number; // € por paquete de 250 g
  descripcion: string;
}

export const cafes: Cafe[] = [
  {
    slug: 'amanecer',
    nombre: 'Amanecer',
    origen: 'Etiopía — Yirgacheffe',
    notas: 'Jazmín, bergamota y un final largo que recuerda al té negro.',
    tueste: 'claro',
    precio: 12.5,
    descripcion:
      'Un café delicado y floral, pensado para métodos de filtro como la V60. Es el favorito de la casa para empezar el día.',
  },
  {
    slug: 'tierra-alta',
    nombre: 'Tierra Alta',
    origen: 'Colombia — Huila',
    notas: 'Caramelo, manzana roja y un cacao suave de fondo.',
    tueste: 'medio',
    precio: 10.9,
    descripcion:
      'Un café equilibrado y dulce, con un cuerpo medio que gusta a casi todo el mundo. Funciona muy bien en prensa francesa.',
  },
  {
    slug: 'fondo-de-casa',
    nombre: 'Fondo de Casa',
    origen: 'Brasil — Cerrado',
    notas: 'Chocolate con leche, avellana tostada y cuerpo untuoso.',
    tueste: 'medio',
    precio: 9.5,
    descripcion:
      'Un café redondo y con cuerpo, el que no falla para el día a día y para tomar con leche.',
  },
  {
    slug: 'ceniza-volcanica',
    nombre: 'Ceniza Volcánica',
    origen: 'Guatemala — Antigua',
    notas: 'Especias dulces, ciruela madura y un ligero toque ahumado.',
    tueste: 'oscuro',
    precio: 11.2,
    descripcion:
      'Un café intenso y con carácter, de tueste oscuro, para quien busca algo con fuerza. Muy bueno como espresso.',
  },
];

export function getCafes(): Cafe[] {
  return cafes;
}

export function getCafe(slug: string): Cafe | undefined {
  return cafes.find((cafe) => cafe.slug === slug);
}