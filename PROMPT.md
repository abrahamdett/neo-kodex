# Prompt para CodeX: Sitio Web "NEO-KODEX – Más allá del código"

Genera un proyecto completo en **ReactJS** listo para ejecutarse con `npm start` que represente a la empresa tecnológica **NEO-KODEX – Más allá del código**. El resultado debe incluir archivos, carpetas y dependencias necesarias (p. ej. `package.json`, `src/components`, `src/pages`, `public`, etc.). Añade comentarios en el código cuando sea pertinente para explicar partes clave y redacta un `README.md` con instrucciones de instalación, ejecución y construcción.

## 1. Contexto de la empresa
NEO-KODEX ofrece soluciones tecnológicas avanzadas. Usa su eslogan **"Más allá del código"** de forma prominente y comunica innovación, experiencia y atención al cliente.

## 2. Servicios (sección obligatoria)
Crea un arreglo de objetos para mapear las siguientes 11 categorías dentro de una sección de Servicios. Cada servicio debe mostrarse en una tarjeta con icono (`react-icons` o FontAwesome), microinteracciones y un breve texto descriptivo:

1. Desarrollo de aplicaciones móviles – Apps nativas y multiplataforma (React Native, Flutter), integración de APIs, bases de datos y servicios cloud.
2. Desarrollo de sistemas web – Apps con ReactJS (frontend) y NestJS (backend), landing pages para conversiones y PWAs.
3. Gestión de bases de datos – Diseño/implementación con MySQL y PostgreSQL, migración y optimización.
4. Infraestructura y DevOps – Servidores con Docker y Ubuntu, despliegues en AWS, túneles Cloudflare.
5. Servicios de integración y APIs – APIs RESTful/GraphQL, documentación, integración con Supabase.
6. Migraciones y reingeniería – Migración (ej. Flutter → React Native) y modernización de sistemas legacy.
7. Consultoría tecnológica – Arquitectura de sistemas y planeación estratégica.
8. Desarrollo full stack – Proyectos completos (frontend + backend).
9. Soporte y mantenimiento – Monitorización, resolución de incidencias, actualizaciones y soporte continuo.
10. Diseño y UX/UI – Interfaces atractivas con UI Kitten u otros, diseño responsive.
11. Venta e instalación de equipos – Venta de hardware, ensamble de PCs, instalación/configuración de software, redes y servidores.

## 3. Estructura y secciones sugeridas
Implementa navegación con **React Router** (mínimo Home y 404) y crea componentes reutilizables (`Navbar`, `Hero`, `ServiceCard`, `WhyChooseUs`, `Testimonials`, `ContactForm`, `Footer`, `Layout`, etc.). Estructura sugerida:

- **Inicio/Hero**: Nombre NEO-KODEX, eslogan "Más allá del código", CTA (p. ej. "Contáctanos"), elemento visual 3D/parallax y breve texto introductorio.
- **Servicios**: tarjetas generadas con `map`, microinteracciones, iconos, contenido accesible.
- **Acerca de nosotros**: historia, misión/visión, imagen/animación o video (usa `ReactPlayer` o `<video>` optimizado), microinteracciones.
- **Por qué elegirnos**: indicadores con iconos, contadores animados o barras de progreso.
- **Testimonios / Casos de éxito** (opcional pero recomendado): slider o carrusel con testimonios/proyectos.
- **Contacto**: formulario validado (nombre, correo, mensaje), enlace a WhatsApp o email empresarial, animación al enviar y mensaje de confirmación.
- **Footer**: información de contacto, redes sociales, dirección, derechos de autor.
- **Página 404 personalizada**: diseño creativo (puede incluir mini-juego o animación).

## 4. Requisitos de diseño (tendencias web 2025)
Sigue estas pautas de estilo y funcionalidad, justificadas por tendencias actuales:

1. **Efectos 3D e inmersión**: Hero con banner animado, scroll parallax o elementos geométricos 3D.
2. **Microinteracciones**: Hover y focus con transiciones (color, sombra, movimiento) en botones, tarjetas, enlaces y formularios.
3. **Modo oscuro**: Interruptor para alternar modo claro/oscuro, usando `useState` y guardando preferencia en `localStorage`.
4. **Tipografía llamativa**: Usa fuente audaz para títulos (incluido el eslogan) y una segunda fuente legible para el cuerpo.
5. **Animaciones y video**: Añade video corto o animación en "Acerca de" y utiliza librerías como `Framer Motion` o `React Spring`.
6. **Diseño responsivo y accesible**: Enfoque mobile-first, colores con contraste suficiente, navegación por teclado, `aria-label`, `alt` en imágenes.

## 5. Tecnologías y librerías recomendadas
- React 18+ con componentes funcionales y Hooks (`useState`, `useEffect`).
- React Router DOM v6 para navegación.
- `Framer Motion` o `React Spring` para animaciones y microinteracciones.
- `Styled-Components` o `Tailwind CSS` para estilos con soporte de temas claro/oscuro.
- `react-icons`/FontAwesome para iconografía.
- `react-parallax` o CSS para efecto parallax.
- `ReactPlayer` o `<video>` nativo para secciones multimedia.
- `axios` (opcional) preparado para futuras integraciones.
- Lazy loading de imágenes, `React.memo` en componentes pesados y `Suspense` si aplica.

## 6. Accesibilidad y buenas prácticas
- Implementa navegación por teclado y `skip links`.
- Utiliza etiquetas semánticas (`header`, `main`, `section`, `nav`, `footer`).
- Añade mensajes de error accesibles en formularios y estados de carga.
- Optimiza performance (imágenes comprimidas, lazy loading, división de código si es necesario).
- Prepara estructura para i18n (p. ej. `react-i18next`) sin necesidad de contenido adicional.

## 7. Persistencia del modo oscuro
- Implementa un hook personalizado (por ejemplo `useDarkMode`) que lea/escriba en `localStorage` y sincronice la preferencia con el `document.documentElement` o `body` para aplicar clases de tema.

## 8. Animaciones y microinteracciones
- Aplica `Framer Motion` en secciones clave (Hero, tarjetas de servicios, counters).
- Usa transiciones suaves en botones y enlaces (`:hover`, `:focus-visible`).
- Incluye contadores animados en "Por qué elegirnos" usando `useEffect` y `requestAnimationFrame` o librería equivalente.

## 9. Contenido multimedia
- Hero con imagen/ilustración optimizada (`.webp` preferible) y parallax.
- Sección "Acerca de" con video corto embebido o animación (por ejemplo, `ReactPlayer` con autoplay controlado y accesible).

## 10. Formularios y validaciones
- Usa `React Hook Form` o validación manual con `useState`.
- Validar campos requeridos, formato de correo y longitud mínima del mensaje.
- Mostrar feedback visual accesible (mensajes de error, bordes coloreados) y animación de éxito.

## 11. Página 404
- Crea una vista `NotFound` con diseño creativo alineado a la marca (puede incluir animación 3D simple o ilustración).
- Añade botón para volver al inicio.

## 12. Requerimientos finales
- Proyecto listo para ejecutarse tras `npm install` y `npm start`.
- Incluye scripts en `package.json` (`start`, `build`, `lint` si aplica).
- Proporciona `README.md` con requisitos, instalación, scripts, estructura y notas sobre accesibilidad y personalización.
- Sube archivos de configuración necesarios (`.gitignore`, etc.).

## 13. Referencias de tendencias
Al documentar o comentar, cita como origen de tendencias:
- [Tendencias en diseño web 2025: 15 ideas de diseño para tu web - IONOS](https://www.ionos.com/es-us/digitalguide/paginas-web/diseno-web/tendencias-de-diseno-web/)
- [8 tendencias que impactarán el diseño web en 2025 | Aicad](https://www.aicad.es/8-tendencias-que-impactaran-el-diseno-web-en-2025)

---
Este prompt debe guiar a CodeX para generar un sitio web moderno, dinámico y accesible que refleje la esencia de **NEO-KODEX – Más allá del código** siguiendo las tendencias de diseño web 2025.
