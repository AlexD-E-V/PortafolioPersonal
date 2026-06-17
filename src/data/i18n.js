/* ============================================================
   Datos + i18n ES/EN — Portafolio ALEX D.E.V.
   Iteración v1.0.0 (ver docs/iteracion-v1.0.0-portfolio-alex-dev.md)
   ============================================================ */

export const I18N = {
  es: {
    nav: { inicio: 'Inicio', sobre: 'Sobre mí', habilidades: 'Habilidades', proyectos: 'Proyectos', experiencia: 'Experiencia', proceso: 'Proceso', contacto: 'Contacto' },
    status: {
      available: 'Disponible',
      limited: 'Capacidad limitada',
      closed: 'No tomando proyectos'
    },
    heroBadge: {
      available: 'Disponible para nuevos proyectos',
      limited: 'Capacidad limitada este mes',
      closed: 'No tomando proyectos por ahora'
    },
    hero: {
      title: 'Alex D.E.V.',
      subtitle: 'Full Stack Developer',
      desc: 'Diseño y construyo aplicaciones, sitios web y videojuegos donde la lógica del código se cruza con la curiosidad por explorar nuevas formas de crear.',
      ctaPrimary: 'Ver proyectos',
      ctaSecondary: 'Contactarme'
    },
    about: {
      label: '// 01 SOBRE MÍ',
      title: 'Soy Alex D.E.V.',
      p1: '¿Qué tal? Soy **Alex D. Enriquez Vera (D.E.V.)**, desarrollador full-stack multidisciplinario: aplicaciones web, móviles, videojuegos y consultoría técnica. Me muevo entre stacks entendiendo primero el problema, para luego elegir la herramienta más adecuada en cada caso.',
      p2: 'Prefiero proyectos donde el detalle importa: productos con identidad, experiencias interactivas y herramientas que la gente realmente usa. Trabajo de forma independiente, con comunicación directa y entregas visibles.',
      photoPh: '[ foto profesional / avatar ]',
      stats: [
        { value: 15, suffix: '+', label: 'Proyectos completados' },
        { value: 25, suffix: '+', label: 'Tecnologías dominadas' },
        { value: 5, suffix: '', label: 'Años de experiencia' },
        { value: 4, suffix: '', label: 'Áreas de especialización' }
      ]
    },
    skills: {
      label: '// 02 HABILIDADES',
      title: 'Constelaciones de stack',
      desc: 'Cada tipo de proyecto trae su propio **stack** y sus propias **herramientas**. Recorrerlos me ha enseñado a moverme entre entornos distintos y a elegir lo que mejor encaja con cada idea.',
      hint: 'arrastra para explorar · hover: detalle · click: filtrar',
      moreFilters: 'Más filtros',
      projects: 'proyectos',
      project: 'proyecto'
    },
    filters: { all: 'Todos', web: 'Web', apps: 'Apps', games: 'Videojuegos', xr: 'VR/AR', backend: 'Backend', tools: 'Herramientas', design: 'Diseño', deploy: 'Deploy' },
    projects: {
      label: '// 03 PROYECTOS',
      title: 'Los Archivos',
      intro: 'Aquí puedes echar un vistazo a los proyectos que he creado o en los que he participado — al menos los que **no son confidenciales** 🕵️. Cada uno cuenta una historia distinta, con su propio stack y su propia razón de existir.',
      filteringBy: 'Filtrando por:',
      seeMore: 'Mostrar todo',
      seeLess: 'Mostrar menos',
      details: 'Ver detalles',
      visit: 'Visitar',
      inProgress: 'En proceso',
      code: 'Ver código',
      empty: 'No hay proyectos en esta categoría todavía.',
      behance: 'Puedes visitar mis proyectos de animación, ilustración y diseño también'
    },
    modal: {
      summary: 'Resumen',
      challenge: 'El reto',
      solution: 'La solución',
      stack: 'Stack técnico',
      gallery: 'Galería',
      result: 'Resultado',
      role: 'Rol',
      comingSoon: 'Más detalles próximamente',
      live: 'Visitar',
      github: 'Ver código en GitHub',
      close: 'Cerrar',
      prev: 'Proyecto anterior',
      next: 'Proyecto siguiente'
    },
    experience: {
      label: '// 04 EXPERIENCIA',
      title: 'Ruta de viaje'
    },
    process: {
      label: '// 05 PROCESO DE TRABAJO',
      title: 'Cómo trabajo contigo',
      steps: [
        { title: 'Conversación inicial', desc: 'Entendemos juntos qué necesitas, plazos y presupuesto. Sin compromiso.' },
        { title: 'Propuesta y alcance', desc: 'Te envío una propuesta clara con scope, entregables, tiempos y precio fijo.' },
        { title: 'Diseño y validación', desc: 'Mockups o prototipos cuando aplica, para que valides antes de codear.' },
        { title: 'Desarrollo iterativo', desc: 'Construyo en sprints, con avances visibles y feedback frecuente.' },
        { title: 'Entrega y soporte', desc: 'Despliegue, documentación y un periodo de soporte incluido.' }
      ]
    },
    contact: {
      label: '// 06 CONTACTO',
      title: 'Construyamos algo juntos.',
      desc: 'Si tienes un prototipo, un documento o apenas una idea, podemos aterrizarla, construirla y escalarla — ya sea una web, una app, una experiencia interactiva o tu propio videojuego. Solo escríbeme.',
      meta1: 'Respondo en menos de 24h (GMT-5)',
      meta2: 'Español e inglés',
      email: 'Email',
      cv: 'CV (PDF)',
      emailCopied: '¡Email copiado!',
      form: {
        name: 'Nombre', email: 'Correo', type: 'Tipo de proyecto', budget: 'Presupuesto aproximado',
        message: 'Mensaje', send: 'Enviar mensaje', sending: 'Enviando…',
        namePh: 'Tu nombre', emailPh: 'tu@correo.com', messagePh: 'Cuéntame sobre tu proyecto…',
        types: ['Web', 'App', 'Videojuego', 'Consultoría', 'Otro'],
        budgets: ['A definir', '< $500', '$500 – $2,000', '$2,000 – $5,000', '$5,000+'],
        optional: '(opcional)',
        errRequired: 'Este campo es requerido',
        errEmail: 'Ingresa un correo válido',
        errMessage: 'El mensaje debe tener al menos 20 caracteres',
        successTitle: 'Mensaje enviado',
        successDesc: 'Gracias por escribir. Te respondo en menos de 24 horas.',
        sendAnother: 'Enviar otro mensaje',
        errSend: 'No se pudo enviar. Inténtalo de nuevo o escríbeme por correo.'
      }
    },
    footer: {
      tagline: 'Software Developer • Game Developer • Creative Technologist',
      quickLinks: 'Secciones',
      social: 'Redes',
      copyright: '© 2026 — Todos los derechos reservados a Alex D.E.V.',
      builtWith: 'Construido con Astro, React y mucho café',
      version: 'v1.0.0'
    },
    boot: [
      'Inicializando sistema...',
      'Conectando con el cosmos...',
      'Cargando experiencia...',
      'Bienvenido.'
    ],
    bootSkip: 'click o tecla para saltar',
    skipLink: 'Saltar al contenido principal'
  },

  en: {
    nav: { inicio: 'Home', sobre: 'About', habilidades: 'Skills', proyectos: 'Projects', experiencia: 'Experience', proceso: 'Process', contacto: 'Contact' },
    status: {
      available: 'Available',
      limited: 'Limited capacity',
      closed: 'Not taking projects'
    },
    heroBadge: {
      available: 'Available for new projects',
      limited: 'Limited capacity this month',
      closed: 'Not taking projects right now'
    },
    hero: {
      title: 'ALEX D.E.V.',
      subtitle: 'Full Stack Developer',
      desc: 'I design and build applications, websites and games where the logic of code meets the curiosity to explore new ways of creating.',
      ctaPrimary: 'View projects',
      ctaSecondary: 'Contact me'
    },
    about: {
      label: '// 01 ABOUT ME',
      title: "I'm Alex D.E.V.",
      p1: "Hi! I'm **Alex D. Enriquez Vera (D.E.V.)**, a multidisciplinary full-stack developer: web and mobile applications, games and technical consulting. I move between stacks by understanding the problem first, then choosing the most suitable tool for each case.",
      p2: 'I prefer projects where detail matters: products with identity, interactive experiences and tools people actually use. I work independently, with direct communication and visible progress.',
      photoPh: '[ professional photo / avatar ]',
      stats: [
        { value: 15, suffix: '+', label: 'Projects completed' },
        { value: 25, suffix: '+', label: 'Technologies mastered' },
        { value: 5, suffix: '', label: 'Years of experience' },
        { value: 4, suffix: '', label: 'Areas of expertise' }
      ]
    },
    skills: {
      label: '// 02 SKILLS',
      title: 'Stack constellations',
      desc: 'Each type of project brings its own **stack** and its own **tools**. Moving across them has taught me to work in different environments and choose what fits each idea best.',
      hint: 'drag to explore · hover: details · click: filter',
      moreFilters: 'More filters',
      projects: 'projects',
      project: 'project'
    },
    filters: { all: 'All', web: 'Web', apps: 'Apps', games: 'Games', xr: 'VR/AR', backend: 'Backend', tools: 'Tools', design: 'Design', deploy: 'Deploy' },
    projects: {
      label: '// 03 PROJECTS',
      title: 'Our Archives',
      intro: "Here you can take a look at the projects I've created or contributed to — at least the ones that **aren't confidential** 🕵️. Each one tells a different story, with its own stack and its own reason to exist.",
      filteringBy: 'Filtering by:',
      seeMore: 'Show all',
      seeLess: 'Show less',
      details: 'View details',
      visit: 'Visit',
      inProgress: 'In progress',
      code: 'View code',
      empty: 'No projects in this category yet.',
      behance: 'You can also check out my animation, illustration and design work'
    },
    modal: {
      summary: 'Summary',
      challenge: 'The challenge',
      solution: 'The solution',
      stack: 'Tech stack',
      gallery: 'Gallery',
      result: 'Outcome',
      role: 'Role',
      comingSoon: 'More details coming soon',
      live: 'Visit',
      github: 'View code on GitHub',
      close: 'Close',
      prev: 'Previous project',
      next: 'Next project'
    },
    experience: {
      label: '// 04 EXPERIENCE',
      title: 'Journey log'
    },
    process: {
      label: '// 05 WORK PROCESS',
      title: 'How I work with you',
      steps: [
        { title: 'Initial conversation', desc: 'We figure out together what you need, timelines and budget. No commitment.' },
        { title: 'Proposal & scope', desc: 'You get a clear proposal with scope, deliverables, timeline and fixed price.' },
        { title: 'Design & validation', desc: 'Mockups or prototypes where applicable, so you validate before any code.' },
        { title: 'Iterative development', desc: 'I build in sprints, with visible progress and frequent feedback.' },
        { title: 'Delivery & support', desc: 'Deployment, documentation and an included support period.' }
      ]
    },
    contact: {
      label: '// 06 CONTACT',
      title: "Let's build something together.",
      desc: "If you have a prototype, a document or just an idea, we can shape it, build it and scale it — whether it's a website, an app, an interactive experience or your own game. Just write to me.",
      meta1: 'I reply within 24h (GMT-5)',
      meta2: 'Spanish & English',
      email: 'Email',
      cv: 'Resume (PDF)',
      emailCopied: 'Email copied!',
      form: {
        name: 'Name', email: 'Email', type: 'Project type', budget: 'Approximate budget',
        message: 'Message', send: 'Send message', sending: 'Sending…',
        namePh: 'Your name', emailPh: 'you@email.com', messagePh: 'Tell me about your project…',
        types: ['Web', 'App', 'Game', 'Consulting', 'Other'],
        budgets: ['To be defined', '< $500', '$500 – $2,000', '$2,000 – $5,000', '$5,000+'],
        optional: '(optional)',
        errRequired: 'This field is required',
        errEmail: 'Enter a valid email',
        errMessage: 'Message must be at least 20 characters',
        successTitle: 'Message sent',
        successDesc: 'Thanks for writing. I will get back to you within 24 hours.',
        sendAnother: 'Send another message',
        errSend: 'Could not send. Please try again or reach me by email.'
      }
    },
    footer: {
      tagline: 'Software Developer • Game Developer • Creative Technologist',
      quickLinks: 'Sections',
      social: 'Social',
      copyright: '© 2026 — All rights reserved to Alex D.E.V.',
      builtWith: 'Built with Astro, React and a lot of coffee',
      version: 'v1.1.0'
    },
    boot: [
      'Initializing system...',
      'Connecting to the cosmos...',
      'Loading experience...',
      'Welcome.'
    ],
    bootSkip: 'click or press any key to skip',
    skipLink: 'Skip to main content'
  }
};
