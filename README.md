# Club Tueste Norte — prototipo del área de socios

Prototipo de la zona privada del **Club Tueste Norte**, una suscripción mensual de café de la
tostadería Tueste Norte. El socio ve el resumen de su suscripción, los cafés del mes con sus
notas de cata, y puede simular el cambio del número de bolsas de su plan.

Es un **prototipo con datos de mentira**: todavía no hay login, base de datos ni pagos, y no se
guarda ningún cambio. Esas partes llegan en semanas posteriores.

Hecho con **Next.js 16 (App Router)**, **TypeScript** y **Tailwind CSS 4**.

## Cómo arrancarlo

Requisito: Node.js 20.9 o superior (recomendado 22 o 24).

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # compila para producción
npm run start      # sirve la web ya compilada
```

No hacen falta más pasos: los datos del prototipo van incluidos en el código.
Solo el ejercicio 3 necesita un WordPress local (ver más abajo).

## Rutas

| Ruta | Archivo | Contenido |
|---|---|---|
| `/` | `app/page.tsx` | Dashboard del socio: resumen de la suscripción, selector de bolsas y selección del mes |
| `/cafes` | `app/cafes/page.tsx` | Catálogo de los cafés del mes |
| `/cafes/[slug]` | `app/cafes/[slug]/page.tsx` | Detalle de un café; `notFound()` si el slug no existe |
| `/ejercicios/...` | `app/ejercicios/` | Ejercicios de la semana 6 (ver más abajo) |

La cabecera con los enlaces (`<Link>`) está en `app/layout.tsx`, así que aparece en todas las páginas.

## Fuente de datos

Los cafés vienen de un **módulo mock tipado** (`data/cafes.ts`) y los datos del socio de `data/socio.ts`.

Lo elegí porque el proyecto arranca con `npm install && npm run dev` sin depender de que WordPress
esté encendido, y porque la interfaz `Cafe` fija la forma de los datos: si más adelante se conectan
a la API de WordPress, solo cambiaría el interior de `getCafes()` y `getCafe()`, no las páginas.

## Client Components

- **`SelectorBolsas`** (`components/SelectorBolsas.tsx`): es Client Component porque necesita estado
  (`useState`) y reaccionar a los clics del usuario, algo que solo existe en el navegador.
- **`BotonFavorito`** (`components/BotonFavorito.tsx`): mismo motivo, estado y clic.
- **`error.tsx`** del ejercicio 3: los límites de error de Next.js deben ser Client Components.

El resto (layout, páginas, `Cabecera`, `TarjetaCafe`, `EtiquetaTueste`) son Server Components:
no necesitan interactividad, así que no envían JavaScript al navegador. La cabecera usa `<details>`
para el menú móvil precisamente para poder seguir siendo un Server Component.

## Diseño responsive

Tailwind con enfoque mobile first: una columna en móvil y dos o tres desde `sm` y `lg`, y un menú
desplegable en pantallas pequeñas. La identidad visual (crema, marrón y ámbar) es la de la web de
Tueste Norte.

## Ejercicios de la semana 6

Están en este mismo repositorio, dentro de la app, bajo `/ejercicios`, con su propio layout y menú
para no pisar las rutas del club (el enunciado usa `/` y `/metodos`, que aquí corresponden al club).

| Ejercicio | Ruta | Archivos |
|---|---|---|
| 1. Componente con props y estado | `/ejercicios/componentes` | `components/EtiquetaTueste.tsx` (Server), `components/BotonFavorito.tsx` (Client) |
| 2. Rutas y layouts | `/ejercicios/metodos` y `/ejercicios/metodos/[slug]` | `app/ejercicios/layout.tsx`, `data/metodos.ts` |
| 3. Fetch en un Server Component | `/ejercicios/entradas` | `page.tsx`, `loading.tsx` y `error.tsx` |

**Ejercicio 3.** Lee las entradas del WordPress local de las semanas 2-3. Hace falta XAMPP encendido y un
archivo `.env.local` en la raíz (hay una plantilla en `.env.example`):

```
WP_API_URL=http://localhost/tueste-norte-wp/wp-json
```

Si WordPress está apagado, la página muestra el `error.tsx` en lugar de romperse. La respuesta a
«¿aparece esta petición en la pestaña Network?» está en un comentario al principio de `page.tsx`.

## Estructura

```
app/          rutas y layouts (sin carpeta src)
components/   Cabecera, TarjetaCafe, SelectorBolsas, EtiquetaTueste, BotonFavorito
data/         cafes.ts, socio.ts, metodos.ts
```

El proyecto no usa carpeta `src/`: `create-next-app` colocó `app/` en la raíz y el alias `@/*`
apunta a la raíz del proyecto.