# MUM · Frontend (React + Vite)

Sitio público del Museo Urbano del Mayaca. SPA en React que consume la API REST de Express.
En producción Nginx sirve el build (`dist/`) y hace de proxy inverso a `/api` (ver *Requisitos_Servidor_React_Express_MySQL*).

## Requisitos
- Node.js 20.19 o superior (LTS)

## Puesta en marcha
```bash
cd frontend
cp .env.example .env      # no subir .env al repositorio
npm install
npm run dev               # http://localhost:5180  (proxy /api -> http://localhost:3000)
npm run build             # genera dist/ para Nginx
```
Sin la API levantada el sitio funciona igual, pero cada sección muestra un aviso controlado (RNF08).

## Estructura
```
frontend/
├── public/                  favicon (isotipo MUM)
└── src/
    ├── main.jsx             punto de entrada
    ├── App.jsx              rutas (páginas con carga diferida)
    ├── assets/logos/        logotipos oficiales (RF11)
    ├── styles/              variables de marca, estilos globales y de fichas
    ├── services/
    │   ├── api.js           cliente HTTP único (timeout + errores controlados)
    │   └── mumApi.js        endpoints de la API
    ├── hooks/useApi.js      estado cargando / error / datos
    ├── components/
    │   ├── layout/          Layout, Header (menú adaptable), Footer
    │   └── ui/              EstadoCarga, ImagenConCredito, Tarjeta, Volver,
    │                        Parrafos, ReproductorVideo, BloquesContenido
    └── pages/               una carpeta por sección del sitio
```

## Rutas y requerimientos
| Ruta | Página | Requerimiento |
|---|---|---|
| `/` | Inicio | RF01 |
| `/biodiversidad?categoria=aves` | Catálogo con filtro | RF03 |
| `/biodiversidad/:slug` | Ficha de especie | RF03, RN02 |
| `/lugares` · `/lugares/:slug` | Lugares y ficha | RF04, RN03 |
| `/galeria` | Fotos y video | RF05, RF06, RN05 |
| `/aplicacion` | App móvil | RF07, RN06 |
| `/visitantes` | Recomendaciones e historia | RF08, RN04 |
| `/creditos` · `/privacidad` | Créditos y aviso de privacidad | RF12, RNF07 |
| `*` | Página no encontrada | RNF08 |

## Contrato esperado de la API (para Backend)
La API **solo devuelve registros con `estado = 'aprobado'`** y archivos con `permiso = 'autorizado'` (RN01, RN05).
Las imágenes se entregan como `{ id_archivo, ruta, texto_alt, credito, es_portada }`.

| Endpoint | Respuesta |
|---|---|
| `GET /api/categorias` | `[{ slug, nombre, orden }]` |
| `GET /api/especies?categoria=slug` | `[{ slug, nombre_comun, nombre_cientifico, portada }]` |
| `GET /api/especies/:slug` | `{ slug, nombre_comun, nombre_cientifico, categoria:{slug,nombre}, descripcion, distribucion_geografica, habitat_ecosistema, alimentacion, habito, reproduccion, fuente:{titulo,autor_institucion}, imagenes:[] }` · 404 si no existe |
| `GET /api/lugares` | `[{ slug, nombre, ciudad, portada }]` ordenado por `orden` |
| `GET /api/lugares/:slug` | `{ slug, nombre, ciudad, descripcion, coordenada:{latitud,longitud,url_mapa,confirmada}, imagenes:[] }` · 404 si no existe |
| `GET /api/galeria` | `[imagen]` con `en_galeria_general = 1`, ordenado por `orden_galeria` |
| `GET /api/videos` | `[{ id_archivo, titulo, ruta, credito }]` |
| `GET /api/contenidos?seccion=inicio` | `[{ id_contenido, titulo, texto, orden }]` |
| `GET /api/enlaces-app` | `[{ plataforma, url, disponible, verificado }]` |
| `GET /api/fuentes` | `[{ id_fuente, titulo, autor_institucion, url }]` |
