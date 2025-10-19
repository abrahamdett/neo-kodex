# NEO-KODEX – Más allá del código

Experiencia web moderna construida con React y Vite para la empresa tecnológica **NEO-KODEX**. El proyecto incorpora tendencias de diseño 2025 como efectos inmersivos, microinteracciones y modo oscuro persistente, además de prácticas robustas de accesibilidad.

## Características principales

- Hero inmersivo con efecto parallax, tipografía audaz y CTA claro.
- Modo claro/oscuro con persistencia en `localStorage` mediante un hook personalizado.
- Sección de servicios generada dinámicamente a partir de un arreglo de 11 categorías con iconografía y animaciones.
- Video introductorio y animaciones 3D ligeras en la sección "Acerca de".
- Indicadores de valor con contadores animados para "¿Por qué elegirnos?".
- Carrusel de testimonios accesible con transiciones suaves.
- Formulario de contacto validado con `react-hook-form`, mensajes de error accesibles y enlace directo a WhatsApp.
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
- Microinteracciones y animaciones implementadas con `Framer Motion` cuidando la performance.
- Lazy loading implícito en recursos multimedia (`ReactPlayer` diferido) y `React.memo` en componentes pesados.
- Diseño responsivo con enfoque *mobile-first* y contraste adecuado entre modo claro y oscuro.

## Personalización

- Ajusta los colores del tema en `src/styles/theme.js`.
- Modifica la lista de servicios en `src/data/services.js`.
- Actualiza testimonios en `src/components/Testimonials.jsx` y métricas en `src/components/WhyChooseUs.jsx`.
- Sustituye los activos gráficos dentro de `public/assets/` por imágenes optimizadas propias (idealmente `.webp`).

## Documentación adicional

El prompt original utilizado para definir el alcance del sitio se conserva en [`PROMPT.md`](PROMPT.md). Incluye referencias a tendencias de diseño web 2025 citadas desde IONOS y Aicad.

## Licencia

Este proyecto se entrega como base de trabajo interna para NEO-KODEX. Ajusta los textos y recursos antes de su publicación.
