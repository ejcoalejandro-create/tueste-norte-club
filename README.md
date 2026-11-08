# Club Tueste Norte — área de socios

Aplicación del **Club Tueste Norte**, una suscripción mensual de café de la tostaduría Tueste Norte.
Empezó como prototipo con datos de mentira (semana 6) y desde la semana 7 **guarda datos de verdad**:
los socios se dan de alta con un formulario, los planes y los pedidos viven en una base de datos y
hay un endpoint JSON para consultar los pedidos desde fuera.

Hecho con **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS 4** y **Drizzle ORM** sobre **SQLite**.

## Cómo arrancarlo

Requisito: Node.js 20.9 o superior (recomendado 22 o 24).

```bash
npm install
npx drizzle-kit push        # crea las tablas en sqlite/club.db
npx tsx db/seed.ts          # inserta planes, clientes y pedidos de ejemplo
npm run dev                 # http://localhost:3000
```

También hay atajos en `package.json`: `npm run db:push`, `npm run db:seed` y `npm run db:studio`
(este último abre Drizzle Studio, un visor de la base de datos).

`npm run build` compila para producción y `npm run start` sirve la web compilada.

La base de datos **no se sube a Git**: es el archivo `sqlite/club.db`, que se reconstruye con los dos
comandos de arriba. La carpeta `sqlite/` sí está en el repositorio (con un `.gitkeep`) para que SQLite
tenga dónde crear el archivo.

Solo el ejercicio 3 de la semana 6 necesita un WordPress local y un archivo `.env.local`
(hay una plantilla en `.env.example`):

```
WP_API_URL=http://localhost/tueste-norte-wp/wp-json
```

## Rutas

| Ruta | Archivo | Contenido |
|---|---|---|
| `/` | `app/page.tsx` | Dashboard del socio (datos de ejemplo) con el selector de bolsas |
| `/cafes` | `app/cafes/page.tsx` | Catálogo de los cafés del mes |
| `/cafes/[slug]` | `app/cafes/[slug]/page.tsx` | Detalle de un café; `notFound()` si el slug no existe |
| `/alta` | `app/alta/` | Formulario de alta de socios (Server Action) |
| `/pedidos` | `app/pedidos/page.tsx` | Pedidos por mes con su cliente y su estado, leídos de la base de datos |
| `GET /api/pedidos` | `app/api/pedidos/route.ts` | Pedidos en JSON (ver abajo) |
| `/ejercicios/...` | `app/ejercicios/` | Ejercicios de la semana 6 |

## Base de datos

SQLite en un único archivo (`sqlite/club.db`), manejado con Drizzle ORM. El schema está en `db/schema.ts`.

| Tabla | Columnas principales | Relaciones |
|---|---|---|
| `planes` | `id`, `nombre`, `gramos_al_mes`, `precio_mensual` | Un plan tiene muchos clientes |
| `clientes` | `id`, `nombre`, `email` (**único**), `plan_id`, `creado_en` | `plan_id` → `planes.id`; un cliente tiene muchos pedidos |
| `pedidos` | `id`, `cliente_id`, `mes` (`AAAA-MM`), `cafe`, `estado` | `cliente_id` → `clientes.id` |

El `estado` de un pedido es uno de `pendiente`, `tostando`, `enviado` o `entregado`.

- Las **claves foráneas** (`references`) las hace cumplir la base de datos: no se puede crear un cliente
  con un plan que no existe.
- Las **`relations()`** de Drizzle no crean nada en la base de datos: sirven para consultar con `with`
  y traer, por ejemplo, el cliente y su plan de cada pedido en una sola consulta.
- Los planes y sus precios están en la base de datos y no escritos en la página, porque el cliente los
  subirá en septiembre: se cambian ahí y el formulario de alta los refleja sin tocar código.

La conexión está en `db/index.ts` y activa `foreign_keys = ON` (en SQLite es una opción de cada conexión).

**Por qué `sqlite/` y no `data/`:** la carpeta `data/` contiene código que sí se versiona (los cafés del
mes y los datos del socio de ejemplo), así que la base de datos va aparte.

## Alta de socios

`/alta` es un Server Component que lee los planes de la base de datos y se los pasa al formulario
(`FormularioAlta`, Client Component). El formulario llama a la Server Action `altaSocio`
(`app/alta/actions.ts`), que:

1. **Valida en el servidor**: nombre no vacío, email con formato válido y plan existente. La validación
   del navegador (`required`) no sustituye a esta, porque una Server Action es una ruta HTTP pública.
2. **Inserta** el cliente con Drizzle.
3. **Captura el email duplicado**: el índice único de `clientes.email` hace que SQLite rechace el insert
   con el código `SQLITE_CONSTRAINT_UNIQUE`. La acción lo convierte en un mensaje razonable y la
   aplicación no se cae. El email se guarda en minúsculas para que `Ana@mail.com` y `ana@mail.com`
   cuenten como el mismo.
4. **Revalida** `/alta` y `/pedidos` con `revalidatePath`.

## Pedidos

`/pedidos` es un Server Component que consulta con `db.query.pedidos.findMany({ with: { cliente: { with: { plan: true } } } })`,
agrupa por mes y enseña cliente, plan, café y estado. No hay datos escritos en la página: si la tabla
está vacía muestra «Todavía no hay pedidos». Es dinámica (`force-dynamic`) para leer la base de datos en
cada visita. La página no muestra el email de los clientes.

## API: `GET /api/pedidos`

Devuelve los pedidos en JSON, con los datos del cliente y de su plan, del mes más reciente al más antiguo.

| | |
|---|---|
| **URL** | `/api/pedidos` |
| **Método** | `GET` |
| **Parámetro opcional** | `estado`: filtra por estado (`pendiente`, `tostando`, `enviado` o `entregado`) |
| **Respuesta correcta** | `200 OK` con un array JSON |
| **Estado no válido** | `400 Bad Request` con `{ "error": "..." }` |

Probar todos los pedidos:

```bash
curl.exe -i http://localhost:3000/api/pedidos
```

Fragmento de la respuesta real (el array completo tiene seis pedidos):

```json
[
  {
    "id": 4,
    "mes": "2026-11",
    "cafe": "Ceniza Volcánica",
    "estado": "enviado",
    "cliente": {
      "id": 1,
      "nombre": "Lucía Fernández",
      "email": "lucia@example.com",
      "plan": { "nombre": "Habitual", "gramosAlMes": 500, "precioMensual": 22 }
    }
  },
  {
    "id": 5,
    "mes": "2026-11",
    "cafe": "Amanecer",
    "estado": "tostando",
    "cliente": {
      "id": 2,
      "nombre": "Mateo Ruiz",
      "email": "mateo@example.com",
      "plan": { "nombre": "Pequeño", "gramosAlMes": 250, "precioMensual": 11.9 }
    }
  }
]
```

Filtrar por estado (las comillas son necesarias en PowerShell):

```bash
curl.exe -i "http://localhost:3000/api/pedidos?estado=enviado"
```

Devuelve solo los pedidos enviados (en los datos de ejemplo, el de Lucía Fernández).

Estado no válido:

```bash
curl.exe -i "http://localhost:3000/api/pedidos?estado=roto"
```

```
HTTP/1.1 400 Bad Request
{"error":"Estado no válido: \"roto\". Valores admitidos: pendiente, tostando, enviado, entregado."}
```

**Limitación conocida:** la respuesta incluye el email de cada cliente y todavía **no hay autenticación**,
así que cualquiera que conozca la URL puede leerlo. Es aceptable para un prototipo local, y habrá que
protegerlo (login y permisos) antes de publicarlo.

## Fuente de datos

- **Planes, clientes y pedidos:** base de datos SQLite con Drizzle.
- **Cafés del mes y datos del socio de ejemplo del dashboard:** módulos tipados en `data/`
  (`cafes.ts` y `socio.ts`). Siguen así a propósito: el catálogo de cafés no formaba parte del encargo
  de esta semana.

## Client Components

- **`SelectorBolsas`**: necesita estado (`useState`) y reaccionar a clics, algo que solo existe en el navegador.
- **`BotonFavorito`**: mismo motivo.
- **`FormularioAlta`**: usa `useActionState` (para mostrar el resultado de la Server Action) y
  `useFormStatus` (para el botón «Enviando…»), hooks que solo existen en el navegador.
- **`error.tsx`** del ejercicio 3 de la semana 6: los límites de error de Next.js deben ser Client Components.

El resto (layout, páginas, `Cabecera`, `TarjetaCafe`, `EtiquetaTueste`, `EtiquetaEstado`) son Server
Components: no envían JavaScript al navegador. La cabecera usa `<details>` para el menú móvil precisamente
para poder seguir siéndolo.

## Configuración de Next.js

En `next.config.ts` están desactivados `cacheComponents` y `partialPrefetching` (el modo nuevo de Next.js 16,
en el que las páginas son dinámicas por defecto y los datos se envuelven en `<Suspense>`). Se desactivan
porque `/alta` y `/pedidos` usan `export const dynamic = 'force-dynamic'`, que es incompatible con ese modo.
El bloque `turbopack` conecta Tailwind con los archivos CSS.

## Diseño responsive

Tailwind con enfoque mobile first: una columna en móvil y dos o tres desde `sm` y `lg`, y un menú
desplegable en pantallas pequeñas. La identidad visual (crema, marrón y ámbar) es la de Tueste Norte.

## Ejercicios

- **Semana 6**: dentro de esta app, bajo `/ejercicios` (componentes, rutas y layouts, y `fetch` en un
  Server Component con `loading.tsx` y `error.tsx`).
- **Semana 7**: en un repositorio aparte, `ejercicios-semana-07`
  (https://github.com/ejcoalejandro-create/ejercicios-semana-07): Route Handlers, Drizzle con scripts y
  una Server Action.

## Estructura

```
app/          rutas, layouts, Server Actions y Route Handlers (sin carpeta src)
components/   Cabecera, TarjetaCafe, SelectorBolsas, EtiquetaTueste, EtiquetaEstado, BotonFavorito
data/         cafes.ts, socio.ts, metodos.ts (datos de ejemplo tipados)
db/           schema.ts, index.ts y seed.ts (Drizzle)
sqlite/       club.db (no se sube a Git; la carpeta sí, con un .gitkeep)
```