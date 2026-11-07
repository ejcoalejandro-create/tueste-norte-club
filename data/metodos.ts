export interface Metodo {
  slug: string;
  nombre: string;
  descripcion: string;
  molienda: string;
  proporcion: string;
  tiempo: string;
  pasos: string[];
}

export const metodos: Metodo[] = [
  {
    slug: 'v60',
    nombre: 'V60',
    descripcion: 'Filtro de papel en cono: una taza limpia y muy expresiva.',
    molienda: 'Media-fina',
    proporcion: '15 g de café por 250 ml de agua',
    tiempo: '3 minutos',
    pasos: [
      'Moja el filtro con agua caliente y desecha ese agua.',
      'Añade el café molido y haz un pequeño cráter.',
      'Vierte 50 ml y espera 30 segundos (preinfusión).',
      'Vierte el resto en círculos lentos hasta los 250 ml.',
    ],
  },
  {
    slug: 'prensa-francesa',
    nombre: 'Prensa francesa',
    descripcion: 'Inmersión sencilla que perdona errores y da mucho cuerpo.',
    molienda: 'Gruesa',
    proporcion: '30 g de café por 500 ml de agua',
    tiempo: '4 minutos',
    pasos: [
      'Echa el café en la jarra y vierte el agua de golpe.',
      'Remueve suavemente y coloca la tapa sin presionar.',
      'Espera cuatro minutos.',
      'Presiona el émbolo despacio y sirve enseguida.',
    ],
  },
  {
    slug: 'espresso',
    nombre: 'Espresso',
    descripcion: 'Café corto e intenso, extraído a presión.',
    molienda: 'Fina',
    proporcion: '18 g de café para 36 g de bebida',
    tiempo: '25-30 segundos',
    pasos: [
      'Muele y distribuye el café en el portafiltros.',
      'Compacta con el tamper de forma uniforme.',
      'Acopla el portafiltros y empieza la extracción.',
      'Detén la extracción al llegar a unos 36 g en la taza.',
    ],
  },
  {
    slug: 'aeropress',
    nombre: 'AeroPress',
    descripcion: 'Versátil y portátil: mezcla inmersión y presión.',
    molienda: 'Media-fina',
    proporcion: '15 g de café por 225 ml de agua',
    tiempo: '2 minutos',
    pasos: [
      'Coloca el filtro, enjuágalo y monta la AeroPress sobre la taza.',
      'Añade el café y vierte el agua.',
      'Remueve diez segundos y espera un minuto y medio.',
      'Presiona el émbolo despacio hasta el final.',
    ],
  },
];

export function getMetodo(slug: string): Metodo | undefined {
  return metodos.find((metodo) => metodo.slug === slug);
}