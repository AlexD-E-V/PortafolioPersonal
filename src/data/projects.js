/* ============================================================
   Proyectos — iteración v1.0.0
   - cats: array de categorías. Un proyecto puede pertenecer a
     varias (ej. ['games', 'xr']); aparece en todos esos filtros
     y muestra un badge por cada una. La primera es la principal.
   - catLabels (opcional): override del TEXTO del badge por categoría
     (ej. { xr: 'VR' } o { xr: 'AR' }). Solo cambia la etiqueta visible
     en card y modal; NO afecta a qué filtros pertenece el proyecto.
   - tech: lista COMPLETA de ids de tecnología. Alimenta la
     constelación Y el "Stack técnico" del modal (que muestra TODO,
     incl. herramientas/deploy: vscode, git, github, hostinger…).
     Los nombres se resuelven con TECH_LABELS (skills.js).
   - techLabels: SUBSET curado para la CARD (solo las principales,
     como strings de display). Independiente de `tech`.
   - image / gallery: cada proyecto tiene su propia carpeta en
     /images/projects/<cat>/<id>/ con:
       · cover.webp        → imagen de la card (campo image)
       · 1.webp, 2.webp…   → imágenes de la galería (campo gallery)
     Mientras un archivo no exista, card y galería caen al placeholder.
   - live: URL pública (null si no aplica / en desarrollo).
   - github: null => botón "Ver código" oculto (repos pendientes
     de pasar — ver README).
   - wip: true => proyecto en proceso. El modal oculta galería y
     resultados y muestra un aviso "Más detalles próximamente". Al
     terminar el proyecto, quita el flag y se rellena normal.
   - Los bloques de case study (challenge/solution/result/galería)
     se completan en la iteración del detalle expandido; el modal
     omite los bloques ausentes.
   ============================================================ */

export const PROJECTS = [
  {
    id: 'club-exploradores',
    cats: ['web'],
    image: '/images/projects/web/club-exploradores/cover.webp',
    tech: ['astro', 'react', 'tailwind', 'typescript', 'vscode', 'git', 'github', 'hostinger'],
    techLabels: ['Astro', 'React', 'Tailwind CSS', 'TypeScript'],
    live: 'https://clubdeexploradores.com/',
    github: null, // reservado a propósito: el repo documenta un modo debug que permite
                  // conseguir puntos/desbloqueos. Producto vivo de cliente → no exponer.
    year: 2026,
    gallery: [
      '/images/projects/web/club-exploradores/1.webp',
      '/images/projects/web/club-exploradores/2.webp',
      '/images/projects/web/club-exploradores/3.webp'
    ],
    es: {
      title: 'Club de Exploradores',
      desc: 'Sitio web gamificado que acompaña al puzzle físico Puzzle Animales Ecuador de Print Craft.',
      role: 'Desarrollo y Diseño web', 
      context: 'Cliente: Print Craft — Puzzle Animales Ecuador', 
      summary: 'Sitio web gamificado que acompaña al puzzle físico Puzzle Animales Ecuador de Print Craft. Los niños escanean el QR de la caja, completan misiones organizadas por etapas, ganan puntos y desbloquean a los animales ecuatorianos en una colección digital.',
      challenge: 'Conectar un producto físico (el puzzle) con una experiencia digital que mantuviera enganchados a los niños, sin complicar el acceso desde el QR de la caja.', // [provisional]
      solution: 'Un sitio gamificado por misiones y etapas, con sistema de puntos y una colección desbloqueable de animales ecuatorianos, optimizado para móvil y de carga rápida.', // [provisional]
      result: [
        'Mayor tiempo de interacción de los niños con el producto físico.',
        'Capa digital diferenciadora que refuerza la marca Print Craft.',
        'Aumento en ventas del puzzle gracias a la experiencia digital complementaria.'
      ]
    },
    en: {
      title: 'Club de Exploradores',
      desc: 'Gamified website that accompanies the physical puzzle Puzzle Animales Ecuador by Print Craft.',
      role: 'Web Development and Design', 
      context: 'Client: Print Craft — Puzzle Animales Ecuador',
      summary: 'Gamified website that accompanies the physical puzzle Puzzle Animales Ecuador by Print Craft. Children scan the QR code on the box, complete missions organized by stages, earn points and unlock Ecuadorian animals in a digital collection.',
      challenge: 'Connecting a physical product (the puzzle) with a digital experience that kept kids engaged, without complicating access from the box QR code.', // [provisional]
      solution: 'A mission- and stage-based gamified site with a points system and an unlockable collection of Ecuadorian animals, mobile-first and fast-loading.', // [provisional]
      result: [
        'Increased kids\' interaction time with the physical product.',
        'A differentiating digital layer that reinforces the Print Craft brand.',
        'Sales boost for the puzzle thanks to the complementary digital experience.'
      ]
    }
  },  
  {
    id: 'idcom',
    cats: ['web'],
    image: '/images/projects/web/idcom/cover.webp',
    // TODO(stack): pendiente de definir. Con `tech` vacío la card no muestra
    // badges y el modal omite el bloque "Stack técnico".
    tech: [],
    techLabels: [],
    live: 'https://idcom.com.ec',
    github: null, // producto vivo de cliente
    year: 2026,
    // TODO(imágenes): subir a public/images/projects/web/idcom/
    // Hasta entonces card y galería caen al placeholder automático.
    gallery: [
      '/images/projects/web/idcom/1.webp',
      '/images/projects/web/idcom/2.webp',
      '/images/projects/web/idcom/3.webp'
    ],
    es: {
      title: 'IDCOM',
      desc: 'Sitio corporativo de una empresa de ingeniería y construcciones metalmecánicas.',
      role: 'Desarrollo web y responsable técnico',
      context: 'Cliente: IDCOM — Ingeniería y Construcciones Metalmecánicas',
      summary: 'Sitio corporativo de IDCOM, empresa ecuatoriana de ingeniería mecánica, diseño y construcciones industriales. Presenta su catálogo de servicios —cosechadoras de camarón, reservorios de combustible, plataformas para bines, carretones de carga pesada y mantenimiento industrial— y convierte visitas en consultas comerciales.',
      challenge: 'Traducir un catálogo industrial técnico en una web que generara consultas reales, siendo la mayoría del tráfico móvil y con conexiones no siempre buenas.',
      solution: 'Landing pages por servicio con el catálogo en vista modal, formulario de contacto con validación y consentimiento de datos, atajo a WhatsApp para consultas urgentes, y un trabajo de fondo en velocidad de carga y SEO técnico: metadatos, Open Graph e imágenes en WebP. Analítica con Google Analytics tras consentimiento de cookies.',
      result: [
        'Canal de captación de consultas comerciales propio de la empresa.',
        'Catálogo de servicios navegable y presentable ante clientes industriales.'
      ]
    },
    en: {
      title: 'IDCOM',
      desc: 'Corporate website for a metalwork engineering and industrial construction company.',
      role: 'Web development and technical lead',
      context: 'Client: IDCOM — Metalwork Engineering & Construction',
      summary: 'Corporate site for IDCOM, an Ecuadorian mechanical engineering, design and industrial construction company. It presents their service catalogue —shrimp harvesters, fuel reservoirs, bin platforms, heavy-load carts and industrial maintenance— and turns visits into commercial enquiries.',
      challenge: 'Translating a technical industrial catalogue into a site that generated real enquiries, with mostly mobile traffic and not always good connections.',
      solution: 'Per-service landing pages with the catalogue in a modal view, a validated contact form with data consent, a WhatsApp shortcut for urgent enquiries, and groundwork on load speed and technical SEO: metadata, Open Graph and WebP images. Analytics via Google Analytics after cookie consent.',
      result: [
        "The company's own channel for capturing commercial enquiries.",
        'A browsable service catalogue presentable to industrial clients.'
      ]
    }
  },
  {
    id: 'cecp',
    cats: ['web'],
    image: '/images/projects/web/cecp/cover.webp',
    // TODO(stack): pendiente de definir (ver nota en el proyecto idcom).
    tech: [],
    techLabels: [],
    live: 'https://cecponline.com',
    github: null, // producto vivo de cliente
    year: 2025,
    // TODO(imágenes): subir a public/images/projects/web/cecp/
    gallery: [
      '/images/projects/web/cecp/1.webp',
      '/images/projects/web/cecp/2.webp',
      '/images/projects/web/cecp/3.webp'
    ],
    es: {
      title: 'CECP — Centro de Especialidades',
      desc: 'Sitio y captación de citas para un centro médico de Guayaquil, pionero en cardiogenética.',
      role: 'Desarrollo web y de sistemas',
      context: 'Cliente: CECP — Centro de Especialidades Médicas, Guayaquil',
      summary: 'Sitio web del CECP, primer centro médico de Guayaquil especializado en cardiogenética, con siete especialidades y atención familiar. Además del sitio, el encargo incluyó la aplicación móvil/PC y la administración de EAGLES VISION, su plataforma de historias clínicas electrónicas.',
      challenge: 'Que un paciente buscando "cardiólogo en Guayaquil" llegara al centro y agendara sin fricción, comunicando a la vez una especialidad poco conocida como la cardiogenética.',
      solution: 'Sitio con SEO local, landing pages comerciales por especialidad y fichas de especialistas en modales con sus procedimientos. Agendamiento directo por WhatsApp e integración de reseñas de Google como prueba social. En paralelo, desarrollo de la app móvil/PC y administración de la plataforma EAGLES VISION de historias clínicas.',
      result: [
        'Agendamiento de citas por WhatsApp como canal directo de captación.',
        'Posicionamiento local por especialidad médica en buscadores.',
        'Presencia digital que comunica su diferencial en cardiogenética.'
      ]
    },
    en: {
      title: 'CECP — Medical Specialties Centre',
      desc: 'Website and appointment capture for a Guayaquil medical centre, a pioneer in cardiogenetics.',
      role: 'Web and systems development',
      context: 'Client: CECP — Medical Specialties Centre, Guayaquil',
      summary: "Website for CECP, the first medical centre in Guayaquil specialising in cardiogenetics, with seven specialties and family care. Beyond the site, the engagement included the mobile/PC application and administration of EAGLES VISION, their electronic medical records platform.",
      challenge: 'Getting a patient searching for "cardiologist in Guayaquil" to reach the centre and book without friction, while communicating a little-known specialty such as cardiogenetics.',
      solution: 'A site with local SEO, commercial landing pages per specialty and specialist cards in modals with their procedures. Direct booking through WhatsApp and Google reviews integration as social proof. In parallel, development of the mobile/PC app and administration of the EAGLES VISION medical records platform.',
      result: [
        'WhatsApp appointment booking as a direct capture channel.',
        'Local search positioning per medical specialty.',
        'A digital presence that communicates their cardiogenetics differentiator.'
      ]
    }
  },
  {
    id: 'rompamos-el-tabu',
    cats: ['web'],
    image: '/images/projects/web/rompamos-el-tabu/cover.webp',
    tech: ['joomla', 'javascript', 'css', 'php', 'mysql', 'hostinger'],
    techLabels: ['Joomla', 'JavaScript', 'CSS', 'MySQL'],
    live: 'https://rompamoseltabu.com/',
    github: null,
    year: 2025,
    gallery: [
      '/images/projects/web/rompamos-el-tabu/1.webp',
      '/images/projects/web/rompamos-el-tabu/2.webp',
      '/images/projects/web/rompamos-el-tabu/3.webp'
    ],
    es: {
      title: 'Rompamos el Tabú',
      desc: 'Sitio web educativo enfocado en la concienciación y prevención de ETS en jóvenes.',
      role: 'Desarrollo web',
      context: 'Campaña de salud sexual',
      summary: 'Sitio web educativo que sirve como campaña enfocada en la concienciación y prevención de enfermedades de transmisión sexual (ETS) en jóvenes para la ciudad de Ambato. Ofrece información accesible y recursos de apoyo, comunicándose con el público mayormente joven a través de una plataforma orientada a la salud sexual.',
      challenge: 'Tratar un tema sensible como las ETS con un tono accesible y sin estigma, presentando información clara y recursos de apoyo para un público joven.', // [provisional]
      solution: 'Un sitio educativo sobre Joomla, con integración de redes, tienda de merchandising, contenido organizado por temas y un diseño que prioriza la legibilidad y la confianza.', // [provisional]
      result: [
        'Recurso de consulta accesible para jóvenes sobre prevención de ETS.',
        'Plataforma reutilizable para campañas de concienciación.'
      ]
    },
    en: {
      title: 'Rompamos el Tabú',
      desc: 'Educational website focused on STD awareness and prevention among young people.',
      role: 'Web development',
      context: 'Sexual health campaign',
      summary: 'Educational website that serves as a campaign focused on awareness and prevention of sexually transmitted diseases (STDs) among young people for the city of Ambato. It offers accessible information and support resources, communicating with a mostly young audience through a platform oriented towards sexual health.',
      challenge: 'Addressing a sensitive topic like STDs with an accessible, stigma-free tone, presenting clear information and support resources for a young audience.', // [provisional]
      solution: 'An educational Joomla site with social media integration, a merchandising store, topic-organized content and a design that prioritizes readability and trust.', // [provisional]
      result: [
        'Accessible reference resource for young people on STD prevention.',
        'Reusable platform for awareness campaigns.'
      ]
    }
  },
  /* ─────────────────────────────────────────────────────────────
     Space DEV: OCULTO temporalmente (rebranding en camino; no tiene
     sentido subir imágenes/datos que van a cambiar). Para reactivarlo,
     borra esta línea de apertura y la línea de cierre del comentario
     que está justo después del objeto (marcada "fin Space DEV oculto").
     ─────────────────────────────────────────────────────────────
  {
    id: 'space-dev',
    cats: ['web'],
    image: '/images/projects/web/space-dev/cover.webp',
    tech: ['astro', 'react', 'tailwind', 'typescript', 'vscode', 'git', 'github'],
    techLabels: ['Astro', 'React', 'Tailwind CSS', 'TypeScript'],
    live: 'https://spacedev.me',
    github: null,
    year: 2025, // [provisional]
    gallery: [
      '/images/projects/web/space-dev/1.webp',
      '/images/projects/web/space-dev/2.webp',
      '/images/projects/web/space-dev/3.webp'
    ],
    es: {
      title: 'Space DEV',
      desc: 'Sitio web corporativo de Space DEV: identidad, servicios y proyectos del estudio.',
      role: 'Diseño y desarrollo full-stack', // [provisional]
      context: 'Estudio propio — Space DEV', // [provisional]
      summary: 'Sitio web corporativo de Space DEV, diseñado para presentar la identidad del estudio, sus servicios y proyectos a través de una experiencia moderna y accesible, con una temática inspirada en el espacio y la creatividad tecnológica.',
      challenge: 'Comunicar la identidad de un estudio creativo-técnico y sus servicios en una experiencia que demostrara, en sí misma, el nivel de trabajo ofrecido.', // [provisional]
      solution: 'Sitio corporativo con temática espacial construido en Astro + React, con foco en rendimiento, accesibilidad y una estética que refuerza la marca.', // [provisional]
      result: [
        '[provisional] Presencia digital propia del estudio para captar clientes.',
        '[provisional] Escaparate vivo de capacidades técnicas y de diseño.'
      ]
    },
    en: {
      title: 'Space DEV',
      desc: "Space DEV's corporate website: the studio's identity, services and projects.",
      role: 'Full-stack design and development', // [provisional]
      context: 'Own studio — Space DEV', // [provisional]
      summary: "Space DEV's corporate website, designed to present the studio's identity, services and projects through a modern, accessible experience themed around space and creative technology.",
      challenge: 'Communicating a creative-technical studio\'s identity and services through an experience that itself demonstrated the level of work offered.', // [provisional]
      solution: 'A space-themed corporate site built with Astro + React, focused on performance, accessibility and a brand-reinforcing aesthetic.', // [provisional]
      result: [
        '[provisional] The studio\'s own digital presence to attract clients.',
        '[provisional] A living showcase of technical and design capabilities.'
      ]
    }
  },
  ───────────────── fin Space DEV oculto ───────────────── */
  {
    id: 'ponte-en-sus-patitas',
    cats: ['web'],
    image: '/images/projects/web/ponte-en-sus-patitas/cover.webp',
    tech: ['joomla', 'javascript', 'css', 'php', 'mysql', 'hostinger'],
    techLabels: ['Joomla', 'JavaScript', 'CSS', 'MySQL'],
    live: 'https://ponteensuspatitas.com/',
    github: null,
    year: 2025,
    gallery: [
      '/images/projects/web/ponte-en-sus-patitas/1.webp',
      '/images/projects/web/ponte-en-sus-patitas/2.webp',
      '/images/projects/web/ponte-en-sus-patitas/3.webp'
    ],
    es: {
      title: 'Ponte en sus Patitas',
      desc: 'Ponte en sus patitas es la campaña de prelanzamiento oficial de Pets.',
      role: 'Desarrollo web',
      context: 'Campaña de prelanzamiento de la app Pets',
      summary: 'Ponte en sus patitas es la campaña de prelanzamiento oficial de Pets. Pensada para construir emociones, identidad y propósito antes del lanzamiento inicial de la app.',
      challenge: 'Generar expectativa, identidad y comunidad alrededor de Pets antes de su lanzamiento, sin tener todavía el producto final disponible.',
      solution: 'Crear una página de campaña centrada en la emoción y el propósito de la marca, con llamadas a la acción para captar interés, merchandising y contenido adicional.',
      result: [
        'Base de interesados antes del lanzamiento de la app.',
        'Identidad de marca consolidada de cara al público.'
      ]
    },
    en: {
      title: 'Ponte en sus Patitas',
      desc: 'Ponte en sus patitas is the official pre-launch campaign for Pets.',
      role: 'Web development',
      context: 'Pre-launch campaign for the Pets app',
      summary: 'Ponte en sus patitas is the official pre-launch campaign for Pets. Designed to build emotions, identity, and purpose before the initial app launch.',
      challenge: 'Building anticipation, identity and community around Pets before launch, without the final product available yet.',
      solution: 'Create a campaign landing page centered on the brand\'s emotion and purpose, with calls to action to capture interest, merchandising, and additional content.',
      result: [
        'A base of interested users ahead of the app launch.',
        'Consolidated brand identity for the public.'
      ]
    }
  },
  {
    id: 'trazando-pasos',
    cats: ['games', 'xr'],
    image: '/images/projects/games/trazando-pasos/cover.webp',
    year: 2022,
    tech: ['unreal', 'blueprints', 'htcvive'],
    techLabels: ['Unreal Engine', 'Blueprints', 'HTC Vive Pro 2'],
    catLabels: { xr: 'VR' }, // badge específico en card/modal (NO afecta filtros)
    live: 'https://www.behance.net/gallery/166470549/Trazando-Pasos-(videojuego-VR)-(2023)',
    github: null,
    // Galería: rutas provisionales; al soltar los .webp en la carpeta se muestran solos.
    gallery: [
      '/images/projects/games/trazando-pasos/1.webp',
      '/images/projects/games/trazando-pasos/2.webp',
      '/images/projects/games/trazando-pasos/3.webp'
    ],
    es: {
      title: 'Trazando Pasos',
      desc: 'Videojuego VR sobre la migración. Ganador del GameJam VRDay Latam 2022.',
      role: 'Desarrollo de gameplay y mecánicas VR',
      context: 'GameJam VRDay Latam 2022 — equipo multidisciplinario', 
      summary: 'Videojuego de realidad virtual que explora los desafíos y experiencias de la migración. Utiliza la inmersión de la VR para que el jugador no solo observe, sino que sienta el recorrido.',
      challenge: 'Comunicar un tema tan sensible como la migración de forma empática, aprovechando la inmersión de la VR sin marear al jugador ni diluir el hilo narrativo.', // [provisional]
      solution: 'Una experiencia guiada por estaciones narrativas, con interacciones simples y locomoción cómoda, donde el entorno y el ritmo refuerzan el mensaje en lugar de competir con él.', // [provisional]
      result: [
        'Ganador del GameJam VRDay Latam 2022.',
        'Reconocimiento y certificado por parte de la Universidad Católica Santiago de Guayaquil, parte organizadora del evento.',
        'Experiencia destacada en medios especializados en videojuegos y tecnología, resaltando su enfoque innovador y su impacto emocional.'
      ]
    },
    en: {
      title: 'Trazando Pasos',
      desc: 'VR game about migration. Winner of the VRDay Latam 2022 GameJam.',
      role: 'VR gameplay and mechanics development', 
      context: 'VRDay Latam 2022 GameJam — multidisciplinary team', 
      summary: 'A virtual reality game that explores the challenges and experiences of migration. It uses VR immersion so the player does not just watch, but feels the journey.',
      challenge: 'Conveying a sensitive topic like migration empathetically, leveraging VR immersion without making the player dizzy or diluting the narrative thread.', // [provisional]
      solution: 'An experience guided by narrative stations, with simple interactions and comfortable locomotion, where the environment and pacing reinforce the message instead of competing with it.', // [provisional]
      result: [
        'Winner of the VRDay Latam 2022 GameJam.',
        'Recognition and certificate from the Universidad Católica Santiago de Guayaquil, part of the event organizers.',
        'Highlighted experience in specialized gaming and technology media, emphasizing its innovative approach and emotional impact.'
      ]
    }
  },
  {
    id: 'plantain-feast',
    cats: ['games'],
    image: '/images/projects/games/plantain-feast/cover.webp',
    tech: ['unreal', 'blueprints', 'photoshop', 'vegas'],
    techLabels: ['Unreal Engine', 'Blueprints'],
    live: 'https://www.behance.net/gallery/166078851/Plantain-Feast',
    github: null,
    year: 2023,
    gallery: [
      '/images/projects/games/plantain-feast/1.webp',
      '/images/projects/games/plantain-feast/2.webp',
      '/images/projects/games/plantain-feast/3.webp'
    ],
    es: {
      title: 'Plantain Feast',
      desc: 'Juego móvil de cocina 2D inspirado en la gastronomía ecuatoriana.',
      role: 'Edición, desarrollo y diseño de gameplay y mecánicas',
      context: 'Proyecto de videojuego — gastronomía ecuatoriana',
      summary: 'Videojuego móvil de cocina en 2D inspirado en la gastronomía ecuatoriana creada por 2 personas, diseñador y desarrollador (yo). Los jugadores preparan recetas tradicionales utilizando el plátano como ingrediente principal, promoviendo la cultura culinaria local.',
      challenge: 'Convertir recetas tradicionales en un loop de juego divertido y rápido de entender, manteniendo el sabor cultural sin caer en lo didáctico.',
      solution: 'Un juego creado en Unreal Engine de cocina 2D, complementando Photoshop para estilizar algunos assets ya creados y edición del trailer en VEGAS Pro 17, programación de mecánicas, progresión de recetas con el plátano como hilo conductor.',
      result: [
        'Demo jugable que rescata la gastronomía nacional.',
        'Publicado en Behance como pieza de portafolio.'
      ]
    },
    en: {
      title: 'Plantain Feast',
      desc: '2D mobile cooking game inspired by Ecuadorian gastronomy.',
      role: 'Editing, development and design of gameplay and mechanics',
      context: 'Game project — Ecuadorian gastronomy',
      summary: '2D mobile cooking game inspired by Ecuadorian gastronomy created by 2 people, designer and developer (me). Players prepare traditional recipes using plantain as the main ingredient, promoting local culinary culture.',
      challenge: 'Turning traditional recipes into a fun, quick-to-grasp gameplay loop, keeping the cultural flavor without becoming didactic.',
      solution: 'A 2D cooking game created in Unreal Engine, complementing Photoshop for enhancing some existing assets and editing the trailer in VEGAS Pro 17, with programming of mechanics and progression of recipes using the plantain as the connecting thread.', // [provisional]
      result: [
        'Playable demo that rescues national gastronomy.',
        'Published on Behance as a portfolio piece.'
      ]
    }
  },
    {
    id: 'alfareria-metalurgia-ar',
    cats: ['games', 'xr'],
    catLabels: { xr: 'AR' }, // badge específico (NO afecta filtros)
    image: '/images/projects/games/alfareria-metalurgia-ar/cover.webp',
    tech: ['unity', 'csharp', 'vuforia', 'vscode', 'git', 'github'],
    techLabels: ['Unity', 'C#', 'Vuforia'],
    live: null,
    github: 'https://github.com/AlexD-E-V/ArAlfareriayMetalurgia',
    year: 2026,
    gallery: [
      '/images/projects/games/alfareria-metalurgia-ar/1.webp',
      '/images/projects/games/alfareria-metalurgia-ar/2.webp',
      '/images/projects/games/alfareria-metalurgia-ar/3.webp'
    ],
    es: {
      title: 'Alfarería y Metalurgia AR',
      desc: 'Juego AR para Android sobre la alfarería y metalurgia tradicionales del Ecuador.',
      role: 'Desarrollo completo: gameplay, AR y arquitectura',
      context: 'Experiencia AR educativa — patrimonio ecuatoriano',
      summary: 'Juego educativo de realidad aumentada para Android sobre dos artes tradicionales ecuatorianas: la alfarería y la metalurgia. El jugador recorre dos rutas, desbloquea coleccionables con modelos 3D y descubre cada oficio de forma interactiva, con distintos finales según su recorrido.',
      challenge: 'Convertir el patrimonio cultural en una experiencia interactiva y rejugable: integrar AR estable en Android con dos rutas de aprendizaje, puntaje, progreso guardado y varios finales, sin abrumar al usuario.',
      solution: 'Un juego en Unity 6 con AR por reconocimiento de imágenes (Vuforia), sobre una arquitectura modular de sistemas: rutas de alfarería y metalurgia, coleccionables 3D desbloqueables, guardado automático del progreso, puntaje y finales que cambian según las decisiones del jugador.',
      result: [
        'Aplicación AR funcional para Android (Unity 6 + Vuforia) con dos rutas de aprendizaje: alfarería y metalurgia.',
        'Coleccionables 3D desbloqueables, progreso guardado automáticamente y múltiples finales según la ruta.',
        'Acercamiento interactivo y rejugable al patrimonio cultural ecuatoriano.'
      ]
    },
    en: {
      title: 'Alfarería y Metalurgia AR',
      desc: 'Android AR game about traditional Ecuadorian pottery and metallurgy.',
      role: 'Full development: gameplay, AR and architecture',
      context: 'Educational AR experience — Ecuadorian heritage',
      summary: 'Educational augmented reality game for Android about two traditional Ecuadorian crafts: pottery and metallurgy. The player follows two routes, unlocks collectibles with 3D models and discovers each craft interactively, with different endings depending on their path.',
      challenge: 'Turning cultural heritage into an interactive, replayable experience: integrating stable AR on Android with two learning routes, scoring, saved progress and multiple endings, without overwhelming the user.',
      solution: 'A Unity 6 game with image-target AR (Vuforia) built on a modular systems architecture: pottery and metallurgy routes, unlockable 3D collectibles, automatic progress saving, scoring and endings that change based on the player\'s decisions.',
      result: [
        'Functional AR app for Android (Unity 6 + Vuforia) with two learning routes: pottery and metallurgy.',
        'Unlockable 3D collectibles, automatically saved progress and multiple endings depending on the route.',
        'An interactive, replayable approach to Ecuadorian cultural heritage.'
      ]
    }
  },
  {
    id: 'pets',
    cats: ['apps'],
    image: '/images/projects/apps/pets/cover.webp',
    tech: ['flutter', 'dart', 'supabase', 'vscode', 'git', 'github'],
    techLabels: ['Flutter', 'Dart', 'Supabase'],
    live: null,
    github: null,
    wip: true, // en proceso: el modal oculta galería/resultados y muestra "próximamente"
    year: 2025,
    gallery: [
      '/images/projects/apps/pets/1.webp',
      '/images/projects/apps/pets/2.webp',
      '/images/projects/apps/pets/3.webp'
    ],
    es: {
      title: 'Pets',
      desc: 'App móvil para el cuidado y seguimiento de mascotas.',
      role: 'Desarrollo y diseño de app móvil full-stack',
      context: 'Equipo multidisciplinario — en desarrollo', 
      summary: 'Aplicación móvil enfocada en el cuidado y seguimiento de mascotas. Permite gestionar calendarios de vacunación, recordatorios de alimentación, citas veterinarias y otros aspectos de la salud y bienestar animal.',
      challenge: 'Centralizar el cuidado de mascotas (vacunas, alimentación, citas) en una app simple que cualquier dueño pueda usar sin fricción.',
      solution: 'En desarrollo - App en Flutter con backend en Supabase: recordatorios, calendarios y seguimiento de salud animal en una interfaz cercana.',
      result: [
        'En desarrollo — primera versión en construcción.',
        'Base técnica (Flutter + Supabase) lista para escalar.'
      ]
    },
    en: {
      title: 'Pets',
      desc: 'Mobile app for pet care and tracking.',
      role: 'Full-stack mobile development and design',
      context: 'Multidisciplinary team — in development',
      summary: 'Mobile app focused on pet care and tracking. It lets you manage vaccination calendars, feeding reminders, vet appointments and other aspects of animal health and wellbeing.',
      challenge: 'Centralizing pet care (vaccines, feeding, appointments) in a simple app any owner can use frictionlessly.',
      solution: 'In development - A Flutter app with a Supabase backend: reminders, calendars and animal health tracking in a friendly interface.',
      result: [
        'In development — first version under construction.',
        'Technical base (Flutter + Supabase) ready to scale.'
      ]
    }
  },
  {
    id: 'alerta',
    cats: ['xr'],
    catLabels: { xr: 'AR' }, // badge específico (NO afecta filtros)
    image: '/images/projects/xr/alerta/cover.webp',
    tech: ['lensstudio', 'javascript', 'photoshop'],
    techLabels: ['Lens Studio', 'JavaScript'],
    live: 'https://www.expreso.ec/guayaquil/arte-interactivo-busca-sensibilizar-enos-salud-mental-213527.html',
    github: null,
    year: 2024,
    gallery: [
      '/images/projects/xr/alerta/1.webp',
      '/images/projects/xr/alerta/2.webp',
      '/images/projects/xr/alerta/3.webp'
    ],
    es: {
      title: 'ALERTA!',
      desc: 'Experiencia AR para la exposición "ALERTA! Reflexiones gráficas en torno a la salud mental".',
      role: 'Desarrollo AR e interactividad',
      context: 'Exposición sobre salud mental — Cliente: Pandecato',
      summary: 'Experiencia de realidad aumentada creada para la exposición "ALERTA! Reflexiones gráficas en torno a la salud mental". Combina ilustración, animación y tecnología interactiva para enriquecer la experiencia artística y fomentar la reflexión sobre la salud mental.',
      challenge: 'Enriquecer una exposición artística sobre salud mental con AR, sumando una capa interactiva que invitara a la reflexión sin distraer de la obra.', 
      solution: 'Filtros y experiencias AR en Lens Studio que daban vida a las ilustraciones hechas por Pandecato, retoques en Photoshop, animación e interacción sobre las piezas físicas.',
      result: [
        'Experiencia cubierta por prensa local (diario Expreso).',
        'Mayor engagement del público con la exposición.',
        'Se replicó la experiencia AR de la exposición "ALERTA!" en varias ciudades de Ecuador.'
      ]
    },
    en: {
      title: 'ALERTA!',
      desc: 'AR experience for the exhibition "ALERTA! Graphic reflections on mental health".',
      role: 'AR development and interactivity',
      context: 'Exhibition on mental health — Client: Pandecato',
      summary: 'Augmented reality experience created for the exhibition "ALERTA! Graphic reflections on mental health". It combines illustration, animation and interactive technology to enrich the artistic experience and encourage reflection on mental health.',
      challenge: 'Enhancing an art exhibition on mental health with AR, adding an interactive layer that invited reflection without distracting from the artwork.',
      solution: 'AR filters and experiences in Lens Studio that brought to life the illustrations made by Pandecato, retouching in Photoshop, animation and interaction on the physical pieces.',
      result: [
        'Experience covered by local press (Expreso newspaper).',
        'Increased audience engagement with the exhibition.',
        'The AR experience of the "ALERTA!" exhibition was replicated in several cities in Ecuador.'
      ]
    }
  },
  {
    id: 'soldadura-vr',
    cats: ['xr'],
    catLabels: { xr: 'VR' }, // badge específico (NO afecta filtros)
    image: '/images/projects/xr/soldadura-vr/cover.webp',
    tech: ['unity', 'csharp', 'xrtoolkit', 'metaquest', 'vscode'],
    techLabels: ['Unity', 'C#', 'Meta Quest 2'],
    live: null, // documentación privada / presentación del proyecto
    github: null,
    year: 2024,
    gallery: [
      '/images/projects/xr/soldadura-vr/1.webp',
      '/images/projects/xr/soldadura-vr/2.webp',
      '/images/projects/xr/soldadura-vr/3.webp'
    ],
    es: {
      title: 'Simulación de Soldadura VR',
      desc: 'Simulador VR de prácticas de soldadura industrial para entornos universitarios, en Meta Quest 2.',
      role: 'Desarrollo VR y simulación',
      context: 'Universidad Politécnica Salesiana — estudiantes de Mecatrónica',
      summary: 'Entorno de realidad virtual para Meta Quest 2 que permite a estudiantes de Mecatrónica practicar el proceso de soldadura industrial de forma segura. Recrea una cabina de soldadura y guía al usuario por las distintas etapas, desde el equipo de protección hasta las técnicas, dentro de un entorno inmersivo y controlado.',
      challenge: 'Permitir que estudiantes universitarios practiquen soldadura industrial sin los riesgos, costos ni límites de material de un taller real, replicando con fidelidad el equipo y las etapas del proceso en un entorno seguro y repetible.',
      solution: 'Un simulador VR para Meta Quest 2 hecho en Unity con XR Interaction Toolkit, que recrea la cabina de soldadura y guía al estudiante paso a paso —equipo de protección, preparación y técnicas— mediante interacciones manuales inmersivas, pensado para integrarse en las prácticas de laboratorio de la carrera de Mecatrónica.',
      result: [
        'Herramienta de práctica segura, sin riesgo ni costo de material para los estudiantes.',
        'Réplica del 85% de los componentes de una cabina de soldadura real.',
        '+13% en el uso del laboratorio de Mecatrónica gracias al simulador (dato de la Universidad Politécnica Salesiana, parte interesada del proyecto).',
        '72% de aprobación en la encuesta de satisfacción de los estudiantes que lo usaron (dato de la Universidad Politécnica Salesiana).'
      ]
    },
    en: {
      title: 'VR Welding Simulation',
      desc: 'VR simulator for industrial welding practice in university settings, on Meta Quest 2.',
      role: 'VR development and simulation',
      context: 'Universidad Politécnica Salesiana — Mechatronics students',
      summary: 'A virtual reality environment for Meta Quest 2 that lets Mechatronics students practice the industrial welding process safely. It recreates a welding booth and guides the user through the different stages, from protective equipment to techniques, within an immersive, controlled environment.',
      challenge: 'Letting university students practice industrial welding without the risks, costs or material limits of a real workshop, faithfully replicating the equipment and process stages in a safe, repeatable environment.',
      solution: 'A VR simulator for Meta Quest 2 built in Unity with the XR Interaction Toolkit, recreating the welding booth and guiding the student step by step —protective gear, setup and techniques— through immersive hands-on interactions, designed to fit into the Mechatronics program\'s lab practices.',
      result: [
        'A safe practice tool, with no risk or material cost for students.',
        'Replicates 85% of the components of a real welding booth.',
        '+13% in Mechatronics lab usage thanks to the simulator (data from Universidad Politécnica Salesiana, project stakeholder).',
        '72% approval in the satisfaction survey among students who used it (data from Universidad Politécnica Salesiana).'
      ]
    }
  }
];
