# Prompt para CodeX: Rediseño UI "NEO-KODEX – Más allá del código"

Genera un proyecto completo en **ReactJS** listo para ejecutarse con `npm start` que represente a la empresa tecnológica **NEO-KODEX – Más allá del código**. El resultado debe incluir todos los archivos, carpetas y dependencias necesarias (por ejemplo `package.json`, `src/components`, `src/pages`, `public`, etc.). Añade comentarios en el código para explicar partes clave y redacta un `README.md` con instrucciones de configuración, ejecución y construcción del proyecto.

## 1. Objetivo general
Rediseñar por completo la interfaz del sitio para que sea visualmente impactante, moderno y sofisticado, alineado con las tendencias de UI/UX de 2025. Evita la apariencia simple de la versión anterior y apuesta por una experiencia inmersiva que combine 3D, animaciones y micro-interacciones para reforzar la identidad de **NEO-KODEX**.

## 2. Contexto de la empresa
NEO-KODEX ofrece soluciones tecnológicas avanzadas. Usa el eslogan **"Más allá del código"** de forma prominente y comunica innovación, experiencia y atención al cliente.

## 3. Estructura del proyecto
Implementa navegación con **React Router v6** (mínimo Home y 404) y crea componentes reutilizables (`Layout`, `Navbar`, `Hero`, `ServicesGrid`, `WhyChooseUs`, `About`, `Testimonials`, `ContactForm`, `Footer`, `Cursor`, etc.). Organiza el código en carpetas (`src/components`, `src/pages`, `src/hooks`, `src/styles`, `src/assets`, etc.) y prepara el proyecto para escalar.

## 4. Secciones y contenido obligatorio
- **Inicio / Hero**: Nombre NEO-KODEX, eslogan "Más allá del código", CTA (p. ej. "Contáctanos"), fondo dinámico con gradientes animados y elementos 3D interactivos que reaccionen al cursor o scroll. Incluye tipografías audaces y colores vibrantes.
- **Servicios**: 11 servicios listados abajo usando un arreglo de objetos para mapear cada tarjeta. Utiliza un **bento grid** con tarjetas de **glassmorphism** (efecto cristal esmerilado con `backdrop-filter: blur()`), gradientes suaves detrás y micro-interacciones (iconos animados, movimiento y cambio de color al hacer hover). Añade iconografía de `react-icons` o FontAwesome.
- **Por qué elegirnos**: Sustituye tarjetas estáticas por contadores animados que incrementen de 0 a su valor final al entrar en el viewport. Añade iconos animados o mini-gráficos para cada métrica.
- **Acerca de**: Historia, misión/visión y un recuadro con video o animación incrustada (usa `ReactPlayer` o `<video>` accesible). Incluye texto y botones con animaciones sutiles.
- **Testimonios / Casos de éxito**: Carrusel animado con tarjetas de glassmorphism y micro-interacciones.
- **Contacto**: Formulario validado (nombre, correo, mensaje), animación de feedback y enlace a WhatsApp o correo. Usa validación accesible (mensajes con `aria-live`).
- **Footer**: Información de contacto, redes sociales, dirección, derechos de autor y enlace rápido a políticas.
- **Página 404 creativa**: Diseña una página 404 con ilustraciones, elementos 3D o mini-juego sencillo coherente con la estética general.

### Servicios a incluir en el bento grid
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

## 5. Animaciones, 3D y micro-interacciones
- Utiliza **Framer Motion** para animaciones de entrada, salida, scroll y micro-interacciones.
- Implementa elementos 3D interactivos en el Hero (por ejemplo, usando **Three.js** o **react-three-fiber**) con gradientes dinámicos y figuras abstractas en movimiento.
- Añade animaciones de scroll para que elementos se deslicen, desvanezcan o escalen al entrar al viewport.
- Diseña un **cursor personalizado** que cambie de forma o deje un rastro al pasar sobre elementos interactivos; utiliza React Hooks y eventos para ello. Mantén la accesibilidad (tamaño ajustable, contraste suficiente, opción de desactivar si es necesario).

## 6. Estilos y temas
- Emplea **Tailwind CSS** o **Styled-Components** para aplicar gradientes, glassmorphism, bordes y sombras personalizadas.
- Define una paleta de colores vibrantes (azules, violetas, acentos neón) y provee múltiples temas: claro, oscuro y uno alternativo (por ejemplo, sepia). Implementa un hook `useTheme` o `useDarkMode` que persista la preferencia en `localStorage` y aplique las clases al `document.documentElement`.
- Usa tipografías variables con combinaciones audaces (serif + sans-serif) para encabezados y cuerpo.

## 7. Accesibilidad y rendimiento
- Mantén contraste adecuado, navegación por teclado, `skip links` y etiquetas `aria`.
- Valida formularios con mensajes accesibles y estados visuales claros.
- Implementa lazy loading en imágenes/piezas pesadas y optimiza el performance (división de código si es necesario).
- Añade soporte básico para i18n (estructura preparada con `react-i18next` u otra librería, sin contenido adicional obligatorio).

## 8. Librerías recomendadas
- React 18+ con componentes funcionales y Hooks (`useState`, `useEffect`, `useMemo`, etc.).
- React Router DOM v6.
- Framer Motion para animaciones.
- Three.js o react-three-fiber + drei para elementos 3D.
- Tailwind CSS o Styled-Components para estilos.
- react-icons o FontAwesome para iconos.
- React Hook Form (opcional) para formularios.
- ReactPlayer o `<video>` para multimedia.
- axios (opcional) preparado para futuras integraciones.

## 9. Página 404 especial
- Crea una vista `NotFound` inmersiva con ilustraciones 3D o mini-juego simple, animaciones y botón para volver al inicio.

## 10. Requerimientos finales
- Proyecto listo tras `npm install` y `npm start`.
- Incluye scripts en `package.json` (`start`, `build`, `lint` si aplica).
- `README.md` con requisitos, instalación, scripts, estructura, notas sobre accesibilidad, temas y cómo personalizar las animaciones 3D/cursor.
- Incluye `.gitignore` y cualquier configuración necesaria.
- Añade comentarios relevantes en el código explicando decisiones y puntos clave.

## 11. Referencias y justificación
Al documentar o comentar, cita como origen de tendencias y conceptos:
- [Tendencias en diseño web 2025: 15 ideas de diseño para tu web - IONOS](https://www.ionos.com/es-us/digitalguide/paginas-web/diseno-web/tendencias-de-diseno-web/)
- [8 tendencias que impactarán el diseño web en 2025 | Aicad](https://www.aicad.es/8-tendencias-que-impactaran-el-diseno-web-en-2025)
- [Guías y estudios de Contra sobre interfaces inmersivas 2025](https://contra.com)
- [Glassmorphism: el efecto cristal esmerilado en interfaces - Interaction Design Foundation](https://www.interaction-design.org/literature/topics/glassmorphism)

---
Este prompt debe guiar a CodeX para generar un sitio web vanguardista, inmersivo y altamente interactivo que refleje la esencia de **NEO-KODEX – Más allá del código** y aproveche las tendencias de diseño 2025, incluyendo elementos 3D, bento grids, glassmorphism, múltiples temas y experiencias animadas.
