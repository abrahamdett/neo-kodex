# Prompt para CodeX: Rediseño UI "NEO-KODEX – Más allá del código"

Genera un proyecto completo en **ReactJS** listo para ejecutarse con `npm start` que represente a la empresa tecnológica **NEO-KODEX – Más allá del código**. El resultado debe incluir todos los archivos, carpetas y dependencias necesarias (por ejemplo `package.json`, `src/components`, `src/pages`, `public`, etc.). Añade comentarios en el código para explicar partes clave y redacta un `README.md` con instrucciones de configuración, ejecución y construcción del proyecto.

La nueva versión debe ir más allá del rediseño previo e incorporar un fondo 3D inspirado en redes neuronales e inteligencia artificial, animaciones suaves que respondan al usuario y una presentación reforzada de los servicios y del hero principal.

## 1. Objetivo general
Rediseñar por completo la interfaz del sitio para que sea visualmente impactante, moderno y sofisticado, alineado con las tendencias de UI/UX de 2025. Evita la apariencia simple de la versión anterior y apuesta por una experiencia inmersiva que combine 3D, animaciones y micro-interacciones para reforzar la identidad de **NEO-KODEX**.

## 2. Contexto de la empresa
NEO-KODEX ofrece soluciones tecnológicas avanzadas. Usa el eslogan **"Más allá del código"** de forma prominente y comunica innovación, experiencia y atención al cliente.

## 3. Estructura del proyecto
Implementa navegación con **React Router v6** (mínimo Home y 404) y crea componentes reutilizables (`Layout`, `Navbar`, `Hero`, `ServicesGrid`, `WhyChooseUs`, `About`, `Testimonials`, `ContactForm`, `Footer`, `Cursor`, etc.). Organiza el código en carpetas (`src/components`, `src/pages`, `src/hooks`, `src/styles`, `src/assets`, etc.) y prepara el proyecto para escalar. Documenta en el `README` la estructura, librerías utilizadas, animaciones 3D y consideraciones de accesibilidad.

## 4. Fondo 3D temático de IA
- Crea una escena 3D inmersiva que represente una red de nodos y conexiones inspiradas en neuronas y redes de inteligencia artificial. Usa **Three.js** o **react-three-fiber** (con `@react-three/drei`) para renderizar geometría optimizada que funcione con fluidez en escritorio y móviles.
- Diseña animaciones orgánicas: los nodos deben emitir un resplandor suave y las conexiones ondular de manera lenta, evitando movimientos bruscos. El fondo debe transmitir calma y futurismo.
- Implementa interactividad opcional: reacciona al movimiento del cursor o al scroll cambiando levemente la profundidad, el brillo o la orientación de la red neuronal. Mantén las interacciones sutiles para no distraer.
- Aplica una paleta oscura con acentos neón (azul eléctrico, violeta, verde menta) y gradientes que garanticen contraste suficiente con el contenido superpuesto. Ajusta la escena 3D y la UI para modo claro/oscuro refinado.
- Ofrece preferencia de movimiento reducido (`prefers-reduced-motion`) para usuarios que requieran menos animación.

## 5. Secciones y contenido obligatorio
- **Inicio / Hero**: Divide el hero en dos columnas: a la izquierda el texto y CTA; a la derecha un canvas 3D con la escena neuronal. Usa tipografía variable audaz para “NEO-KODEX” y el eslogan "Más allá del código". Añade un subtítulo aspiracional que destaque IA, 3D y diseño accesible, junto con un badge semitransparente (ej. "Más allá del código"). El CTA debe ser un botón con gradiente, icono y efecto hover sutil (sombra animada o pulso). Implementa contadores con animación ascendente e iconos animados al lado de cada métrica.
- **Servicios**: 11 servicios listados abajo usando un arreglo de objetos para mapear cada tarjeta. Reorganiza la cuadrícula en un **bento grid** jerárquico combinando tarjetas grandes y pequeñas. Mantén el glassmorphism y añade rasgos de neumorfismo (bordes internos, sombras suaves) para que parezcan botones táctiles. Incluye iconos 3D o pseudo-3D que roten o cambien de tonalidad al hacer hover y micro-interacciones como desplazamientos del texto o revelado de detalles adicionales.
- **Por qué elegirnos**: Sustituye tarjetas estáticas por contadores animados que incrementen de 0 a su valor final al entrar en el viewport. Añade iconos animados o mini-gráficos para cada métrica y asegura micro-interacciones al pasar el cursor o recibir foco.
- **Acerca de**: Historia, misión/visión y un recuadro con video o animación incrustada (usa `ReactPlayer` o `<video>` accesible) que explique la inspiración detrás del diseño neuronal. Incluye texto y botones con animaciones sutiles y referencias a la filosofía de innovación.
- **Testimonios / Casos de éxito**: Carrusel animado con tarjetas de glassmorphism y micro-interacciones (hover, enfoque, desplazamiento). Asegura navegación accesible por teclado.
- **Contacto**: Formulario validado (nombre, correo, mensaje), animación de feedback y enlace a WhatsApp o correo. Usa validación accesible (mensajes con `aria-live`) e incluye indicadores visuales acordes a la paleta neón.
- **Footer**: Información de contacto, redes sociales, dirección, derechos de autor y enlace rápido a políticas.
- **Página 404 creativa**: Diseña una página 404 con ilustraciones, elementos 3D o mini-juego sencillo coherente con la estética general, incorporando animaciones suaves y CTA para regresar al inicio.

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

## 6. Animaciones, 3D e interactividad avanzada
- Utiliza **Framer Motion** para animaciones de entrada, salida, scroll y micro-interacciones; sincroniza las transiciones con la escena 3D cuando sea pertinente.
- Implementa elementos 3D interactivos en el Hero usando **Three.js** o **react-three-fiber** con shaders o materiales básicos que generen nodos luminosos y conexiones ondulantes.
- Añade micro-interacciones consistentes en todo el sitio (hover en botones, iconos, tarjetas, menú, toggles de tema) y efectos de parallax en el hero.
- Diseña un **cursor personalizado** que cambie de forma o deje un rastro al pasar sobre elementos interactivos; utiliza React Hooks y eventos para ello. Mantén la accesibilidad (tamaño ajustable, contraste suficiente, opción de desactivar si es necesario).

## 7. Estilos, temas y tipografía
- Emplea **Tailwind CSS** o **Styled-Components** para aplicar gradientes, glassmorphism, bordes y sombras personalizadas.
- Define una paleta de colores vibrantes (azules, violetas, acentos neón) y provee múltiples temas: claro, oscuro y uno alternativo (por ejemplo, sepia). Implementa un hook `useTheme` o `useDarkMode` que persista la preferencia en `localStorage` y aplique las clases al `document.documentElement`.
- Refina la paleta oscura para incluir variaciones sutiles y acentos que destaquen sin fatigar la vista. Ajusta el lienzo 3D para cada tema.
- Usa tipografías variables con combinaciones audaces (serif + sans-serif), variando pesos y alturas de línea para crear jerarquía expresiva.

## 8. Accesibilidad, rendimiento y multimedia
- Mantén contraste adecuado, navegación por teclado, `skip links` y etiquetas `aria`.
- Valida formularios con mensajes accesibles y estados visuales claros.
- Implementa lazy loading en imágenes/piezas pesadas, carga diferida del canvas 3D y optimiza el performance (división de código si es necesario).
- Añade soporte básico para i18n (estructura preparada con `react-i18next` u otra librería, sin contenido adicional obligatorio).
- Considera un video corto o animación que explique la inspiración neuronal; optimiza su carga y permite reproducir/pausar con controles accesibles.

## 9. Librerías y dependencias recomendadas
- React 18+ con componentes funcionales y Hooks (`useState`, `useEffect`, `useMemo`, etc.).
- React Router DOM v6.
- Framer Motion para animaciones.
- Three.js o react-three-fiber + drei para elementos 3D.
- Tailwind CSS o Styled-Components para estilos.
- react-icons para iconografía.
- React Hook Form (opcional) para formularios.
- ReactPlayer o `<video>` para multimedia.
- axios (opcional) preparado para futuras integraciones.

## 10. Página 404 especial
- Crea una vista `NotFound` inmersiva con ilustraciones 3D o mini-juego simple, animaciones y botón para volver al inicio.

## 11. Requerimientos finales
- Proyecto listo tras `npm install` y `npm start`.
- Incluye scripts en `package.json` (`start`, `build`, `lint` si aplica).
- `README.md` con requisitos, instalación, scripts, estructura, notas sobre accesibilidad, temas y cómo personalizar las animaciones 3D/cursor.
- Incluye `.gitignore` y cualquier configuración necesaria.
- Añade comentarios relevantes en el código explicando decisiones y puntos clave.

## 12. Referencias y justificación
Al documentar o comentar, cita como origen de tendencias y conceptos:
- [Experiencias inmersivas y objetos flotantes en héroes - Contra](https://contra.com)
- [Tendencias en diseño web 2025: objetos 3D y paletas neón - Nicepage](https://nicepage.com)
- [Glassmorphism y neumorfismo - Interaction Design Foundation](https://www.interaction-design.org/literature/topics/glassmorphism)
- [Videos breves con valor añadido - IONOS](https://www.ionos.com/es-us/digitalguide/paginas-web/diseno-web/tendencias-de-diseno-web/)

---
Este prompt debe guiar a CodeX para generar un sitio web vanguardista, inmersivo y altamente interactivo que refleje la esencia de **NEO-KODEX – Más allá del código** y aproveche las tendencias de diseño 2025, incluyendo elementos 3D, bento grids, glassmorphism, neumorfismo, múltiples temas y experiencias animadas.
