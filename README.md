# NEO-KODEX – Más allá del código

Experiencia web moderna construida con React y Vite para la empresa tecnológica **NEO-KODEX**. El proyecto incorpora tendencias de diseño 2025 como fondos 3D neuronales, microinteracciones y tematización múltiple (claro, oscuro y sepia) con prácticas robustas de accesibilidad.

## Características principales

- Hero inmersivo con lienzo 3D neuronal reactivo al cursor (renderizado con `@react-three/fiber` + `drei`), ahora con jerarquía tipográfica ampliada, overlay legible y CTA pulsante orientada al diagnóstico temprano. Incluye fallback accesible cuando se detecta `prefers-reduced-motion`.
- Bloque "Personas en el centro" inmediatamente después del hero que muestra retratos reales del equipo, testimonios destacados y CTAs humanizadas para reforzar la confianza temprana.
- Barra superior con CTA más vibrante y control de reducción de movimiento reestilizado para mantener la accesibilidad sin competir con la acción principal.
- Fondo generativo global (`NeuralBackdrop`) que dibuja redes neuronales suaves en todo el sitio y respeta la preferencia de reducir movimiento.
- Modo claro, oscuro y sepia con persistencia en `localStorage` mediante un hook personalizado.
- Sección de servicios (11 categorías) dispuesta en bento grid con mezcla de glassmorphism y neumorfismo, copia centrada en beneficios y CTAs distribuidas en cabecera, modales y pies de sección para maximizar conversión.
- Contadores ascendentes con iconografía animada tanto en el hero como en "¿Por qué elegirnos?".
- Portafolio interactivo que relata reto, solución, resultado e impacto con lenguaje orientado a negocio.
- Blog/Recursos con ruta dedicada (`/blog` y `/blog/:slug`) listo para conectar a un CMS o Markdown (ver comentarios en `src/data/blogPosts.js`) y CTA final reforzada para agendar consulta o seguir explorando.
- Sección de equipo y cultura con tarjetas animadas y especialidades destacadas.
- Carrusel de testimonios accesible con transiciones suaves.
- Formulario de contacto reducido a los campos esenciales (nombre, correo, mensaje) con validación inmediata, opción para agregar servicio de interés bajo demanda y conexión directa con el CRM (Supabase) para registrar leads y newsletter.
- Cadena de confianza con certificaciones/alianzas, badges de seguridad, política de privacidad dedicada y CTAs de beneficio claro (agenda gratuita, descarga de guías, solicitud de propuesta).
- Contexto de experimentación A/B (`ExperimentProvider`) para cambiar copy/estilo de CTAs y medir qué versión convierte mejor.
- Integración de analítica ligera basada en Google Analytics (`gtag`) con eventos personalizados para CTAs, envíos de formulario y suscripciones.
- Formularios de newsletter reutilizables (blog y footer) que ofrecen guías descargables y están sincronizados con el CRM.
- Chatbot flotante coherente con el diseño, con foco automático, respuesta contextual y cierre por `Escape`.
- Página 404 creativa con microinteracciones.
- Componentes reutilizables y estilos con `styled-components`.

## Lineamientos de copywriting

- Cada sección cierra con una pregunta o llamada a la acción que invita al diálogo.
- Los textos se enfocan en beneficios tangibles y resultados medibles, evitando listas de tecnologías específicas.
- Los casos de éxito describen reto, solución y resultado para conectar rápidamente con el valor entregado.

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

## Configuración de entorno

El proyecto lee las siguientes variables de entorno (prefijo `VITE_`) en tiempo de build/ejecución:

| Variable | Descripción |
| --- | --- |
| `VITE_SUPABASE_URL` | URL base de tu instancia Supabase (ej. `https://<project>.supabase.co/rest/v1`). |
| `VITE_SUPABASE_ANON_KEY` | API key anónima con permisos de inserción en las tablas `leads`, `newsletter_subscribers` y `cta_interactions`. |
| `VITE_GA_MEASUREMENT_ID` | ID de Google Analytics 4 para inicializar `gtag`. Si se omite, los eventos se ignoran sin romper la UI. |

Guarda las variables en un archivo `.env.local` (no se versiona) o configúralas en tu plataforma de despliegue.

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
- Microinteracciones y animaciones implementadas con `Framer Motion` respetando `prefers-reduced-motion` (fallback para el canvas 3D) y con interruptor manual "Reducir movimiento" en la barra de navegación.
- Lazy loading en componentes pesados (hero 3D mediante `React.lazy`, imágenes con `loading="lazy"`, división de código para rutas `/blog`).
- Diseño responsivo con enfoque *mobile-first* y contraste adecuado entre modo claro y oscuro.

## Personalización

- Ajusta los colores del tema en `src/styles/theme.js`.
- Modifica la lista de servicios en `src/data/services.js`.
- Actualiza portafolio en `src/data/portfolio.js`, equipo en `src/data/team.js` y blog en `src/data/blogPosts.js` (el comentario `// CMS` indica el punto de integración futura).
- Personaliza testimonios en `src/components/Testimonials.jsx` y métricas en `src/components/WhyChooseUs.jsx`.
- Sustituye los activos gráficos dentro de `public/assets/` por imágenes optimizadas propias (idealmente `.webp`).

## Integración con CRM y automatizaciones

- El servicio `src/services/leadService.js` encapsula las llamadas REST a Supabase. Crea las tablas `leads`, `newsletter_subscribers` y `cta_interactions` con columnas mínimas (`nombre`, `email`, `mensaje`, `servicio`, `fuente`, `variante`, `newsletter`, `intent`, `timestamp`).
- El formulario de contacto (`ContactSection`) envía los leads vía `submitLead`, opcionalmente suscribe al newsletter y abre un modal de confirmación accesible.
- Las interacciones de CTAs (hero, navbar, servicios, portafolio, testimonios, InlineCTA) se registran con `logCtaInteraction` para medir copy y variantes.
- `automation/sendWelcomeEmail.js` es un ejemplo de función serverless (Node 18+) que llama a la API de Resend para enviar el correo de bienvenida. Se incluye un handler listo para Supabase Edge Functions en `supabase/functions/send-welcome-email/index.mjs`.
- Configura en Supabase un trigger `AFTER INSERT` sobre `leads` que invoque la función `send-welcome-email` y, si lo deseas, emita webhooks hacia tu CRM principal.

## Eventos de analítica rastreados

Los eventos se despachan mediante `AnalyticsProvider` (`window.gtag`) y se listan a continuación:

| Evento (`action`) | Categoría | Ubicación / Label | Disparador |
| --- | --- | --- | --- |
| `page_visit` | `navegacion` | Ruta actual | Se emite en cada cambio de ruta (listener en `AnalyticsListener`). |
| `cta_click` | `navbar` | `agenda-diagnostico` | CTA principal del navbar. |
| `cta_agendar_diagnostico` / `cta_propuesta` | `hero` | `hero-cta` | CTA primaria del hero según la variante A/B. |
| `cta_descarga_guia` | `hero` | `guia-exclusiva` | CTA secundaria del hero hacia recursos descargables. |
| `cta_diagnostico_servicios_footer` | `cta_intermedia` | `cta-servicios-footer` | Botón “Agenda diagnóstico estratégico” bajo servicios. |
| `cta_recursos_servicios_footer` | `cta_intermedia` | `cta-servicios-footer` | Link a recursos descargables en servicios. |
| `cta_propuesta_portafolio` | `cta_intermedia` | `cta-portafolio-footer` | CTA al final de casos de éxito. |
| `cta_confianza_portafolio` | `cta_intermedia` | `cta-portafolio-footer` | Link a certificaciones desde portafolio. |
| `cta_propuesta_testimonios_footer` | `cta_intermedia` | `cta-testimonios-footer` | CTA tras testimonios. |
| `lead_enviado` | `formulario` | `contacto-principal` | Envío exitoso del formulario de contacto. |
| `newsletter_registro` | `newsletter` | `newsletter-blog` / `newsletter-footer` | Suscripciones en blog o footer.

Puedes añadir más eventos usando el hook `useAnalytics()` en cualquier componente.

## Documentación adicional

El prompt original utilizado para definir el alcance del sitio se conserva en [`PROMPT.md`](PROMPT.md). Incluye referencias a tendencias de diseño web 2025 citadas desde Nicepage, Contra, Interaction Design Foundation e IONOS.

## Licencia

Este proyecto se entrega como base de trabajo interna para NEO-KODEX. Ajusta los textos y recursos antes de su publicación.
