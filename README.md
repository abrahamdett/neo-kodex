# NEO-KODEX – Más allá del código

Experiencia web moderna construida con React y Vite para la empresa tecnológica **NEO-KODEX**. El proyecto incorpora tendencias de diseño 2025 como fondos 3D neuronales, microinteracciones y tematización múltiple (claro, oscuro y sepia) con prácticas robustas de accesibilidad.

## Características principales

- Hero inmersivo con lienzo 3D neuronal reactivo al cursor (renderizado con `@react-three/fiber` + `drei`), tipografía variable y CTA con gradiente animado. Incluye fallback accesible cuando se detecta `prefers-reduced-motion`.
- Modo claro, oscuro y sepia con persistencia en `localStorage` mediante un hook personalizado.
- Sección de servicios (11 categorías) dispuesta en bento grid con mezcla de glassmorphism y neumorfismo, iconos pseudo-3D y animaciones con Framer Motion.
- Contadores ascendentes con iconografía animada tanto en el hero como en "¿Por qué elegirnos?".
- Portafolio interactivo con modal detallado y carga diferida de imágenes (`loading="lazy"`).
- Blog/Recursos con ruta dedicada (`/blog` y `/blog/:slug`) listo para conectar a un CMS o Markdown (ver comentarios en `src/data/blogPosts.js`).
- Sección de equipo y cultura con tarjetas animadas y especialidades destacadas.
- Carrusel de testimonios accesible con transiciones suaves.
- Formulario de contacto dinamizado con selección de servicio, adjuntos opcionales, validación en tiempo real y animación de feedback.
- Chatbot flotante coherente con el diseño, con foco automático, respuesta contextual y cierre por `Escape`.
- Página 404 creativa con microinteracciones.
- Componentes reutilizables y estilos con `styled-components`.

## Requisitos previos

- Node.js 18 o superior
- npm 9 o superior

## Instalación y uso

```bash
npm install
npm start
```

Comandos adicionales:

- `npm run dev` – modo desarrollo con recarga en caliente.
- `npm run build` – genera artefactos listos para producción en `dist/`.
- `npm run preview` – sirve la build de producción para verificación rápida.
- `npm run lint` – ejecuta ESLint sobre el código fuente.

## Estructura del proyecto

```
neo-kodex/
├── index.html
├── package.json
├── public/
│   └── assets/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── components/
│   ├── pages/
│   ├── data/
│   ├── hooks/
│   └── styles/
└── vite.config.js
```

## Accesibilidad y rendimiento

- Navegación por teclado asegurada con `skip link`, estados `:focus-visible` y roles ARIA.
- Microinteracciones y animaciones implementadas con `Framer Motion` respetando `prefers-reduced-motion` (fallback para el canvas 3D).
- Lazy loading en componentes pesados (hero 3D mediante `React.lazy`, imágenes con `loading="lazy"`, división de código para rutas `/blog`).
- Diseño responsivo con enfoque *mobile-first* y contraste adecuado entre modo claro y oscuro.

## Personalización

- Ajusta los colores del tema en `src/styles/theme.js`.
- Modifica la lista de servicios en `src/data/services.js`.
- Actualiza portafolio en `src/data/portfolio.js`, equipo en `src/data/team.js` y blog en `src/data/blogPosts.js` (el comentario `// CMS` indica el punto de integración futura).
- Personaliza testimonios en `src/components/Testimonials.jsx` y métricas en `src/components/WhyChooseUs.jsx`.
- Sustituye los activos gráficos dentro de `public/assets/` por imágenes optimizadas propias (idealmente `.webp`).

## Documentación adicional

El prompt original utilizado para definir el alcance del sitio se conserva en [`PROMPT.md`](PROMPT.md). Incluye referencias a tendencias de diseño web 2025 citadas desde Nicepage, Contra, Interaction Design Foundation e IONOS.

## Licencia

Este proyecto se entrega como base de trabajo interna para NEO-KODEX. Ajusta los textos y recursos antes de su publicación.
