// Productos propios de NEO-KODEX (construidos end-to-end).
// NOTA: solo información pública. No incluir repos privados, infra interna,
// puertos, nombres de VM, dominios internos ni pipeline de ventas
// (material confidencial del portfolio).

export const products = [
  {
    id: 'rodaxgo',
    name: 'RodaxGo',
    accent: '#E8722B',
    tagline: 'Navegación para motociclistas',
    status: 'En producción',
    link: { href: 'https://rodaxgo.com', label: 'Visitar rodaxgo.com' },
    description:
      'La primera app de navegación pensada exclusivamente para motociclistas en México. Inteligencia comunitaria de seguridad urbana en tiempo real y un ruteo que evita zonas de riesgo.',
    features: [
      'Motor de ruteo híbrido que evita zonas de riesgo en tiempo real',
      'Inteligencia comunitaria: 21 tipos de evento reportados por riders',
      'Sistema de reputación y trust score para reportes confiables',
      'SOS, crews y chat de grupo para rodar acompañado',
      'Mapas y tráfico en vivo con navegación por voz'
    ],
    stack: ['Flutter', 'Spring Boot', 'PostgreSQL + PostGIS', 'Valhalla', 'Mapbox', 'GCP']
  },
  {
    id: 'loop',
    name: 'LOOP',
    accent: '#8B3FA8',
    tagline: 'Seguridad personal con IA',
    status: 'En desarrollo',
    badge: 'B2G · White-label municipal',
    link: { href: '#contacto', label: 'Conocer más' },
    description:
      'Plataforma de seguridad personal y comunitaria, enfocada en mujeres y personas vulnerables. Protección proactiva con IA: actúa sin que el usuario tenga que hacer nada bajo estrés.',
    features: [
      'SOS offline: alerta con tu ubicación sin depender de internet',
      'Detección de impacto por acelerómetro con cuenta regresiva',
      'Acompáñame (Safe Walk) con ubicación en vivo',
      'Red de ayuda comunitaria verificada',
      'IA para predicción de zonas de riesgo'
    ],
    stack: ['NestJS', 'MySQL', 'Qdrant (IA)', 'Python / FastAPI', 'WebSockets', 'GCP']
  },
  {
    id: 'vitaechain',
    name: 'VitaeChain',
    accent: '#C8204E',
    tagline: 'Salud digital con blockchain',
    status: 'En desarrollo',
    link: { href: '#contacto', label: 'Conocer más' },
    description:
      'Plataforma de salud centrada en el paciente: él es dueño de su historial y ningún médico accede sin su consentimiento explícito por QR. Con OCR/IA para digitalizar documentos y blockchain para auditoría inmutable.',
    features: [
      'Consentimiento explícito por QR: acceso temporal y revocable',
      'Digitalización de recetas y laboratorios con OCR + IA',
      'Médicos verificados contra cédula profesional (SEP)',
      'Auditoría inmutable en blockchain (solo hashes, cero datos personales)',
      'Apps para paciente y médico desde un mismo código'
    ],
    stack: ['Spring Boot', 'Flutter', 'Keycloak', 'PostgreSQL', 'Polygon', 'React']
  },
  {
    id: 'suite-multimodulo',
    name: 'Suite Multi-módulo',
    accent: '#8A5A2B',
    tagline: 'Gestión empresarial por verticales',
    status: 'Demo',
    link: { href: '#contacto', label: 'Conocer más' },
    description:
      'Plataforma fullstack con un backend central y cinco módulos especializados —Farmacias, Seguridad, Almacenes, Renta de locales y Talento— cada uno como una app independiente, con IA integrada.',
    features: [
      'Cinco módulos de negocio sobre un backend unificado',
      'Autenticación y permisos centralizados',
      'Módulo de IA integrado',
      'Arquitectura escalable, un frontend por vertical'
    ],
    stack: ['NestJS', 'React', 'Vite', 'PostgreSQL', 'IA / Groq']
  }
];
