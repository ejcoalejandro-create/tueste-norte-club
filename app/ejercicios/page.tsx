import Link from 'next/link';

export default function InicioEjercicios() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-bold text-stone-900">Ejercicios de la semana 6</h1>
      <p className="mt-4 text-stone-600">
        Zona de práctica del App Router: componentes, rutas, layouts y fetch en el servidor.
      </p>
      <p className="mt-6">
        <Link href="/ejercicios/metodos" className="font-medium text-amber-800 hover:underline">
          Ver los métodos de preparación →
        </Link>
      </p>
    </main>
  );
}