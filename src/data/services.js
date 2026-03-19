import {
  FaMobileAlt,
  FaGlobe,
  FaDatabase,
  FaServer,
  FaCubes,
  FaExchangeAlt,
  FaChalkboardTeacher,
  FaLaptopCode,
  FaTools,
  FaNetworkWired,
  FaShoppingCart
} from 'react-icons/fa';

export const services = [
  {
    id: 1,
    title: 'Software a la medida',
    description: 'Desarrollamos software personalizado que se adapta exactamente a las necesidades de tu negocio, optimizando procesos y aumentando la productividad.',
    icon: FaLaptopCode,
    benefits: [
      'Análisis detallado de tus procesos para diseñar la solución ideal.',
      'Desarrollo ágil con entregas incrementales para que veas avances rápidos.',
      'Integración con tus sistemas existentes sin interrumpir operaciones.'
    ],
    question: '¿Necesitas un software que se ajuste a tu negocio?'
  },
  {
    id: 2,
    title: 'Aplicaciones móviles',
    description: 'Creamos apps nativas e híbridas para iOS y Android que conectan con tus clientes y agilizan tus operaciones desde cualquier lugar.',
    icon: FaMobileAlt,
    benefits: [
      'Diseño intuitivo centrado en la experiencia del usuario.',
      'Rendimiento optimizado para funcionar en cualquier dispositivo.',
      'Publicación y mantenimiento en App Store y Google Play.'
    ],
    question: '¿Listo para llevar tu negocio al bolsillo de tus clientes?'
  },
  {
    id: 3,
    title: 'Desarrollo web profesional',
    description: 'Diseñamos y desarrollamos sitios web y plataformas que convierten visitantes en clientes con diseño moderno y velocidad de carga óptima.',
    icon: FaGlobe,
    benefits: [
      'Diseño responsive adaptado a todos los dispositivos.',
      'SEO optimizado para posicionar tu marca en buscadores.',
      'Paneles de administración para que gestiones tu contenido fácilmente.'
    ],
    question: '¿Quieres una web que trabaje por tu negocio 24/7?'
  },
  {
    id: 4,
    title: 'Soporte técnico especializado',
    description: 'Brindamos soporte técnico preventivo y correctivo para mantener tus sistemas funcionando sin interrupciones.',
    icon: FaTools,
    benefits: [
      'Atención remota y presencial con tiempos de respuesta garantizados.',
      'Mantenimiento preventivo para evitar fallas costosas.',
      'Monitoreo proactivo de tus sistemas críticos.'
    ],
    question: '¿Necesitas un equipo técnico confiable a tu lado?'
  },
  {
    id: 5,
    title: 'Instalación de redes y cableado',
    description: 'Instalamos y configuramos redes empresariales, cableado estructurado y puntos de acceso para una conectividad confiable.',
    icon: FaNetworkWired,
    benefits: [
      'Diseño de red optimizado para tu espacio y necesidades.',
      'Cableado estructurado categoría 5e, 6 y 6A certificado.',
      'Configuración de switches, routers y puntos de acceso WiFi.'
    ],
    question: '¿Tu red actual soporta el crecimiento de tu empresa?'
  },
  {
    id: 6,
    title: 'Bases de datos y servidores',
    description: 'Administramos, optimizamos y migramos bases de datos y servidores para que tu información esté segura y siempre disponible.',
    icon: FaDatabase,
    benefits: [
      'Configuración y optimización de servidores físicos y en la nube.',
      'Respaldos automatizados y planes de recuperación ante desastres.',
      'Monitoreo 24/7 de rendimiento y seguridad.'
    ],
    question: '¿Tus datos están protegidos y bien administrados?'
  },
  {
    id: 7,
    title: 'Infraestructura y nube',
    description: 'Migramos y gestionamos tu infraestructura en la nube (AWS, Azure, Google Cloud) para escalar sin complicaciones.',
    icon: FaServer,
    benefits: [
      'Migración planificada sin interrupciones en tu operación.',
      'Optimización de costos en servicios cloud.',
      'Alta disponibilidad y escalabilidad automática.'
    ],
    question: '¿Estás aprovechando el potencial de la nube?'
  },
  {
    id: 8,
    title: 'Integraciones y APIs',
    description: 'Conectamos tus sistemas, plataformas y herramientas para que la información fluya automáticamente entre todos tus procesos.',
    icon: FaCubes,
    benefits: [
      'Integración con ERPs, CRMs y sistemas de facturación.',
      'Desarrollo de APIs robustas y bien documentadas.',
      'Automatización de flujos de trabajo entre aplicaciones.'
    ],
    question: '¿Tus sistemas se comunican entre sí de forma eficiente?'
  },
  {
    id: 9,
    title: 'Modernización de sistemas',
    description: 'Actualizamos tus sistemas heredados a tecnologías modernas sin perder datos ni detener tu operación.',
    icon: FaExchangeAlt,
    benefits: [
      'Evaluación completa de riesgos antes de iniciar la migración.',
      'Migración gradual con respaldos en cada fase.',
      'Capacitación a tu equipo en la nueva plataforma.'
    ],
    question: '¿Tu sistema actual frena el crecimiento de tu negocio?'
  },
  {
    id: 10,
    title: 'Consultoría tecnológica',
    description: 'Te asesoramos para elegir las mejores soluciones tecnológicas y definir una estrategia digital que impulse tus resultados.',
    icon: FaChalkboardTeacher,
    benefits: [
      'Diagnóstico de madurez tecnológica de tu empresa.',
      'Plan de acción con prioridades claras y presupuesto estimado.',
      'Acompañamiento ejecutivo durante la implementación.'
    ],
    question: '¿Sabes qué tecnología necesita realmente tu negocio?'
  },
  {
    id: 11,
    title: 'Venta e instalación de equipo',
    description: 'Seleccionamos, vendemos e instalamos el hardware ideal para tu empresa: computadoras, servidores, impresoras y más.',
    icon: FaShoppingCart,
    benefits: [
      'Asesoría personalizada para elegir el equipo correcto.',
      'Instalación, configuración y puesta en marcha incluida.',
      'Garantía y soporte post-venta para tu tranquilidad.'
    ],
    question: '¿Necesitas equipar tu empresa con tecnología confiable?'
  }
];
