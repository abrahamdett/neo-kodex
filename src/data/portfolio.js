export const portfolioProjects = [
  {
    id: 'saore-mystery-shopper',
    title: 'SAORE — Plataforma de mystery shopping',
    client: null,
    sector: 'Mystery shopping',
    year: 2026,
    summary:
      'Plataforma integral de auditorías de punto de venta con 3 roles —auditor de campo, cliente y administrador— y generación de reportes PDF.',
    challenge:
      'Una empresa de mystery shopping necesitaba digitalizar todo el ciclo de auditoría —asignación de visitas, llenado en campo, revisión y reportes— que antes era manual y lento de conciliar.',
    solution:
      'Construí una plataforma completa: app Flutter para shoppers de campo (cuestionarios con fotos y captura offline), portal web en Next.js para administración y clientes, y backend en Spring Boot con generación dinámica de reportes PDF. Incluye módulos de inventarios totales y activo fijo, con captura offline-first, carga masiva desde Excel y reportes en Excel y PDF.',
    result:
      'Sistema en producción que opera el ciclo completo de auditoría de punta a punta, con soporte y evolución continua bajo iguala mensual.',
    impact: [
      'App de campo con captura offline',
      'Reportes PDF con gráficas de score',
      'Inventarios totales y activo fijo'
    ],
    stack: ['Spring Boot', 'Next.js', 'Flutter', 'PostgreSQL', 'GCS']
  },
  {
    id: 'sistema-asistencia',
    title: 'Sistema de asistencia con gamificación',
    client: null,
    sector: 'RRHH',
    year: 2026,
    summary:
      'Control de asistencia empresarial con gamificación, app móvil para empleados y dashboard web para administración.',
    challenge:
      'El cliente necesitaba un control de entradas y salidas del personal que además motivara la puntualidad, no solo que la registrara.',
    solution:
      'Desarrollé una app Flutter para check-in/out con validación de ubicación y horario, un dashboard administrativo en React + Tailwind, y un backend en Spring Boot con un sistema de puntos, rachas y recompensas que dispara webhooks de integración.',
    result:
      'Plataforma en producción que digitaliza la asistencia e incentiva la puntualidad, con soporte continuo bajo retainer.',
    impact: [
      'Check-in/out con validación de ubicación',
      'Gamificación por puntos y rachas',
      'Dashboard con ranking y reportes'
    ],
    stack: ['Spring Boot', 'React', 'Tailwind', 'Flutter', 'MySQL']
  },
  {
    id: 'saore-reclutador',
    title: 'Chatbot de reclutamiento con IA en WhatsApp',
    client: null,
    sector: 'Automatización con IA',
    year: 2026,
    summary:
      'Chatbot conversacional en WhatsApp que recluta y filtra candidatos automáticamente con IA, sin intervención humana hasta la entrevista.',
    challenge:
      'Reclutar personal de campo consumía mucho tiempo del equipo filtrando candidatos manualmente por WhatsApp a toda hora.',
    solution:
      'Construí un flujo en n8n con un agente de IA (Gemini) que conversa en lenguaje natural, califica a los candidatos con preguntas de screening, los clasifica por vacante y notifica automáticamente tanto al candidato aprobado como al responsable de contratación.',
    result:
      'Screening 100% automatizado y disponible 24/7; el equipo humano solo dedica tiempo a candidatos ya calificados.',
    impact: [
      'Screening automatizado 24/7',
      'IA conversacional en lenguaje natural',
      'Self-hosted, sin costo por mensaje'
    ],
    stack: ['n8n', 'WAHA', 'Gemini', 'WhatsApp']
  },
  {
    id: 'penguin-inventarios',
    title: 'App de inventarios y auditorías',
    client: 'Penguin Random House (Macmillan)',
    sector: 'Editorial',
    year: 2021,
    summary:
      'Aplicación móvil y plataforma web para gestión de inventarios y auditorías con escaneo de códigos de barras desde el celular.',
    challenge:
      'El control de inventarios y las auditorías dependían de procesos manuales, lentos de conciliar y propensos a errores de captura.',
    solution:
      'Desarrollé una app móvil en Flutter con escaneo de códigos de barras por cámara, una API REST en Node.js para validar y almacenar los datos, y una interfaz web para gestionar auditorías, cargar catálogos en XLS, controlar permisos y asignar tareas y ubicaciones.',
    result:
      'Inventarios más precisos y auditorías más ágiles, con un flujo 100% digital de punta a punta.',
    impact: [
      '-30% de errores en el registro de inventarios',
      '+25% de eficiencia en las auditorías',
      'Escaneo de códigos directo desde el móvil'
    ],
    stack: ['Flutter', 'Node.js', 'PHP', 'WebSockets']
  },
  {
    id: 'boton-panico',
    title: 'App de botón de pánico y emergencias',
    client: null,
    sector: 'Seguridad',
    year: 2021,
    summary:
      'Aplicación móvil de emergencias con geolocalización en tiempo real, notificaciones, chat en vivo y transmisión RTMP.',
    challenge:
      'Se necesitaba una app capaz de ubicar a los usuarios con precisión y coordinar la respuesta ante emergencias en tiempo real.',
    solution:
      'Construí una app en Flutter con triangulación de ubicación, SDK de Google Maps para visualización en tiempo real, notificaciones con OneSignal, chat en vivo con Socket.IO, transmisión en vivo por RTMP y procesos en segundo plano para seguimiento continuo de ubicación y conexión.',
    result:
      'Respuesta a emergencias en tiempo real con rastreo de ubicación preciso y comunicación inmediata.',
    impact: [
      'Notificaciones y chat en tiempo real',
      'Geolocalización precisa con Google Maps',
      'Transmisión en vivo por RTMP'
    ],
    stack: ['Flutter', 'Node.js', 'PHP', 'MySQL', 'Google Maps', 'Socket.IO']
  },
  {
    id: 'nissim-control',
    title: 'Sistema de control de entradas y salidas',
    client: 'NISSIM SABA',
    sector: 'Comercio',
    year: 2021,
    summary:
      'App móvil y panel administrativo para controlar inventario, con dashboards de entradas, salidas, costos y ventas.',
    challenge:
      'La empresa necesitaba visibilidad en tiempo real de su inventario y automatizar la generación de órdenes de entrada y salida.',
    solution:
      'Desarrollé una app en Flutter con escaneo de códigos de barras, una API REST en Node.js y un panel administrativo en PHP; dashboards interactivos y procesamiento de archivos XML para generar órdenes automáticamente.',
    result:
      'Control de inventario más preciso y menores costos operativos al automatizar los procesos clave.',
    impact: [
      '+35% de precisión en el control de inventario',
      'Órdenes generadas automáticamente desde XML',
      'Dashboards de costos y ventas en tiempo real'
    ],
    stack: ['Flutter', 'Node.js', 'PHP', 'MySQL']
  },
  {
    id: 'bodegas-alianza',
    title: 'Plataforma de auditorías e inventarios',
    client: 'Bodegas Alianza',
    sector: 'Logística',
    year: 2022,
    summary:
      'App móvil y web para auditorías e inventarios de bodega, con escaneo de códigos y carga de catálogos.',
    challenge:
      'Las auditorías e inventarios en bodega eran lentos, manuales y propensos a errores.',
    solution:
      'Creé una app en Flutter con escaneo de códigos de barras, una API REST en Node.js y una interfaz web para gestionar auditorías, cargar catálogos XLS y asignar permisos, con pruebas de funcionamiento, regresión y rendimiento.',
    result:
      'Sistema de inventarios más preciso y eficiente, con una interfaz intuitiva para los auditores.',
    impact: [
      '+40% de precisión y eficiencia en inventarios',
      'Catálogos cargados desde XLS',
      'Flujo de trabajo intuitivo para auditores'
    ],
    stack: ['Flutter', 'Node.js', 'MySQL', 'PHP']
  }
];
