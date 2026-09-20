# El rincón de no pensar

Proyectos pequeños pero llenos de encanto, hechos con React y Tailwind: una colección de creaciones modestas que, aunque demasiado pequeñas para tener su propio sitio web, merecen ser apreciadas y compartidas.

## 🛋️ Qué contiene

- **Proyectos** — Blog, frases célebres, registro de peso, tabla de ejercicios, lista de tareas y galería de fotos.
- **Componentes** — Reloj, temporizador, calculadora y carrusel de fotos.
- **Juegos** — Clicker, 3 en raya, parejas (memoria), preguntas y piedra, papel o tijeras.

## 🚀 Puesta en marcha

```bash
npm install       # instala dependencias
npm start         # entorno de desarrollo (http://localhost:3000)
npm run build     # build de producción + prerenderizado (react-snap)
npm test          # ejecuta los tests
```

> `npm run build` ejecuta automáticamente `react-snap` (script `postbuild`), que genera HTML estático por ruta para mejorar el SEO.

## 🧰 Stack

- [React 18](https://react.dev/) + [Create React App](https://create-react-app.dev/)
- [Tailwind CSS](https://tailwindcss.com/) (configuración propia de colores y tipografías en `tailwind.config.js`)
- [React Router](https://reactrouter.com/) para el enrutado cliente
- [react-icons](https://react-icons.github.io/react-icons/) e iconos SVG propios
- [Chart.js](https://www.chartjs.org/) para la gráfica del registro de peso

## 📁 Estructura

```
src/
├── Components/    # Componentes reutilizables (Sidebar, Button, Carousel…)
├── Pages/         # Páginas (Home, Projects, Games, BlogPostDetail…)
├── data/          # Datos estáticos (Posts, Quotes, MenuItems, categoryColors)
├── Hooks/         # Hooks propios (useInterval)
├── App.js         # Definición de rutas
└── index.js       # Punto de entrada
```

## 🎨 Accesibilidad y SEO

La web está orientada a cumplir **WCAG 2.2 (nivel AA)**:

- `lang="es"`, skip link, jerarquía de encabezados correcta (un único `<h1>` por página).
- Nombres accesibles en botones de iconos, modal de galería con trampa de foco, indicadores de foco visibles.
- Contraste de color verificado (AA) en todos los textos e interfaces.

SEO:

- **Prerenderizado** con `react-snap`: HTML estático por ruta (títulos y meta descriptions únicos).
- `sitemap.xml` y `robots.txt` con directiva `Sitemap`.
- Canonical, Open Graph, Twitter Cards y datos estructurados JSON-LD (`WebSite` y `BlogPosting`).
- URLs descriptivas con slugs para los artículos del blog.

## ☁️ Despliegue

Desplegado en [Netlify](https://www.netlify.com/):

- **URL:** https://elrincondenopensar.netlify.app/
- **Repo:** https://github.com/irenealcaine/el-rincon-de-no-pensar

Configuración de build en `netlify.toml` (comando `CI= npm run build`, publish en `build/`). El redirect `/* → /index.html` permite el enrutado cliente; los archivos estáticos (`sitemap.xml`, `robots.txt`, HTML prerenderizado) se sirven con prioridad.

## ✍️ Contacto

- **Email:** irenealcainealvarez@gmail.com
- **Web personal:** https://irenealcainealvarez.es/