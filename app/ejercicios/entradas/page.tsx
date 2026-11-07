// ¿Esta petición aparece en la pestaña Network del navegador?
// NO. El fetch se ejecuta en el servidor (Node), dentro del Server Component, antes de que
// exista HTML que enviar. El navegador solo recibe el HTML ya generado con los títulos, así
// que desde allí no se ve la llamada a WordPress. Solo se vería si el fetch se hiciera en un
// Client Component (por ejemplo, dentro de un useEffect).
// Matiz: al navegar con <Link> el navegador sí pide al servidor de Next.js los datos de la
// página, pero nunca llama directamente a WordPress.

interface EntradaWP {
  id: number;
  date: string;
  title: { rendered: string };
}

// WordPress devuelve los títulos con entidades HTML (&#8217;, &amp;...).
function textoPlano(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&amp;/g, '&')
    .trim();
}

export default async function PaginaEntradas() {
  const base = process.env.WP_API_URL;
  if (!base) {
    throw new Error('Falta WP_API_URL en .env.local');
  }

  // Retardo artificial para ver loading.tsx (quita las // para probar y vuelve a ponerlas):
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  const res = await fetch(`${base}/wp/v2/posts?per_page=10&_fields=id,date,title`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`WordPress respondió ${res.status} al pedir las entradas`);
  }

  const entradas: EntradaWP[] = await res.json();

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-bold text-stone-900">Últimas entradas del blog</h1>

      {entradas.length === 0 ? (
        <p className="mt-6 text-stone-600">Todavía no hay entradas publicadas.</p>
      ) : (
        <ul className="mt-6 space-y-3">
          {entradas.map((entrada) => (
            <li key={entrada.id} className="rounded-xl border border-stone-200 bg-white p-4">
              <p className="font-semibold text-stone-900">{textoPlano(entrada.title.rendered)}</p>
              <p className="text-sm text-stone-500">
                {new Date(entrada.date).toLocaleDateString('es-ES')}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}