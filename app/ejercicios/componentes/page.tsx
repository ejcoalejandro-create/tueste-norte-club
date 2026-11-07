import EtiquetaTueste from '@/components/EtiquetaTueste';
import BotonFavorito from '@/components/BotonFavorito';

export default function PaginaComponentes() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-bold text-stone-900">Ejercicio 1: componentes</h1>

      <section className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold text-stone-800">Etiquetas de tueste</h2>
        <div className="flex flex-wrap gap-3">
          <EtiquetaTueste nivel="claro" />
          <EtiquetaTueste nivel="medio" />
          <EtiquetaTueste nivel="oscuro" />
        </div>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold text-stone-800">Botón de favoritos</h2>
        <BotonFavorito />
      </section>
    </main>
  );
}