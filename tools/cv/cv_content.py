# -*- coding: utf-8 -*-
"""Contenido del CV en ES y EN. El layout es comun a ambos (cv_build.py),
asi que el diseno es identico por construccion y solo cambia el texto."""

# Badges del stack: (texto, destacado?) -> destacado = dorado, si no azul
STACK = {
    'web':    [('TypeScript', 1), ('React', 1), ('Astro', 1), ('Tailwind', 1), ('JavaScript', 0), ('PHP', 0)],
    'mobile': [('Flutter', 1), ('Dart', 1)],
    'games':  [('Unity', 1), ('C#', 1), ('Unreal', 0), ('Blueprints', 0), ('Vuforia', 0), ('Lens Studio', 0)],
    'back':   [('Supabase', 1), ('MySQL', 0), ('Hostinger', 1), ('Vercel', 0), ('Git', 0)],
    'design': [('Figma', 0), ('Illustrator', 0), ('Photoshop', 0), ('Animate', 0), ('VEGAS Pro', 0)],
}

LINKS = [
    ('portfolio', 'alex-d-e-v.vercel.app'),
    ('email',     'alexenriquezvera@gmail.com'),
    ('github',    'github.com/AlexD-E-V'),
    ('linkedin',  'linkedin.com/in/alex-d-e-v'),
    ('behance',   'behance.net/alexenriquez'),
    ('location',  None),
    ('available', None),
]

ES = {
    'lang': 'es',
    'intro': [
        ('Soy ', 0), ('Alex D. Enriquez Vera (DEV)', 1),
        (', desarrollador full-stack multidisciplinario: aplicaciones web, móviles, '
         'videojuegos y XR. Me muevo entre stacks entendiendo primero el problema, para '
         'luego elegir la herramienta adecuada. Con formación formal en animación y '
         'diseño, no solo programo: ', 0),
        ('diseño y construyo experiencias completas', 1), ('.', 0),
    ],
    'stats': [('15+', 'PROYECTOS'), ('25+', 'TECNOLOGÍAS'), ('5', 'AÑOS EXP.'),
              ('4', 'ÁREAS:<br><span class="areas">WEB·MOBILE·GAMES·XR</span>')],
    'role': 'Full-Stack Developer · Game Developer · Creative Technologist',
    'contact_label': 'CONTACTO',
    'labels': {'portfolio': 'PORTAFOLIO', 'email': 'EMAIL', 'github': 'GITHUB',
               'linkedin': 'LINKEDIN', 'behance': 'BEHANCE',
               'location': 'UBICACIÓN', 'available': 'DISPONIBILIDAD'},
    'location': 'Guayaquil, Ecuador (GMT-5)',
    'available': 'Autónomo y tiempo completo',
    'stack_label': 'STACK PRINCIPAL',
    'stack_groups': {'web': 'Web', 'mobile': 'Mobile', 'games': 'Videojuegos / XR',
                     'back': 'Backend / Deploy', 'design': 'Diseño'},
    'langs_label': 'IDIOMAS',
    'langs': [('Español', 'Nativo'), ('Inglés', 'Básico')],
    'exp_title': 'Experiencia',
    'exp': [
        ('Desarrollador Full-Stack', 'Webs · Apps · Videojuegos · XR', '2025 — presente',
         'Desarrollo de productos completos, de la idea inicial al entregable final, '
         'combinando diseño y código en web, mobile, videojuegos y XR.'),
        ('Desarrollador Web y Técnico', 'IDCOM · Ingeniería y Construcciones Metalmecánicas', '2026',
         'Responsable técnico de la empresa: desarrollo y mantenimiento de landing pages, '
         'optimización de velocidad y SEO, e integración de formularios y analítica.'),
        ('Desarrollador Web y de Sistemas', 'CECP · Centro de Especialidades', '2025 — 2026',
         'Evolución digital de la marca: sitio web, landing pages y aplicación móvil/PC. '
         'Administrador de la plataforma EAGLES VISION de historias clínicas electrónicas.'),
        ('Game Developer', 'Indie Games', '2022 — 2024',
         'Proyectos como Trazando Pasos y Plantain Feast marcaron mis primeros pasos en '
         'programación, combinando narrativa, mecánicas y diseño interactivo.'),
    ],
    'proj_title': 'Proyectos destacados',
    'proj': [
        ('idcom.com.ec — Sitio corporativo', None, '2026',
         'Sitio institucional de una empresa metalmecánica: catálogo de servicios en modales, '
         'formulario de contacto y analítica con consentimiento de cookies.',
         'React · Tailwind CSS · SEO técnico · Google Analytics'),
        ('cecponline.com — Centro médico', None, '2026',
         'Sitio comercial para un centro de especialidades: SEO local, fichas de especialistas '
         'con modales, reseñas de Google y agendamiento directo por WhatsApp.',
         'Astro · Tailwind CSS · SEO local · WebP'),
        ('Club de Exploradores — Web gamificada', None, '2026',
         'Sitio gamificado que acompaña un puzzle físico (cliente Print Craft): misiones por QR, '
         'puntos y animales desbloqueables. Aumentó la interacción y las ventas del producto.',
         'Astro · React · Tailwind CSS · TypeScript'),
        ('Trazando Pasos — Videojuego VR', 'Ganador GameJam VRDay Latam 2022', '2022',
         'Experiencia VR sobre la migración: la inmersión hace que el jugador sienta el recorrido, '
         'no solo lo observe. Reconocimiento y certificado de la UCSG.',
         'Unreal Engine · Blueprints · HTC Vive Pro 2'),
        ('ALERTA! — Experiencia AR', 'Prensa', '2024',
         'AR para la exposición sobre salud mental (cliente Pandecato): da vida a ilustraciones. '
         'Cobertura del diario Expreso y réplica en varias ciudades de Ecuador.',
         'Lens Studio · JavaScript · Photoshop'),
    ],
    'edu_title': 'Formación',
    'edu': ('Licenciado en Animación Digital', '2018 — 2023',
            'Universidad Católica Santiago de Guayaquil — base para moverme entre el diseño '
            'visual y el código.'),
}

EN = {
    'lang': 'en',
    'intro': [
        ("I'm ", 0), ('Alex D. Enriquez Vera (DEV)', 1),
        (', a multidisciplinary full-stack developer: web and mobile applications, games '
         'and XR. I move between stacks by understanding the problem first, then choosing '
         'the right tool. With formal training in animation and design, I do not just code: ', 0),
        ('I design and build complete experiences', 1), ('.', 0),
    ],
    'stats': [('15+', 'PROJECTS'), ('25+', 'TECHNOLOGIES'), ('5', 'YEARS EXP.'),
              ('4', 'AREAS:<br><span class="areas">WEB·MOBILE·GAMES·XR</span>')],
    'role': 'Full-Stack Developer · Game Developer · Creative Technologist',
    'contact_label': 'CONTACT',
    'labels': {'portfolio': 'PORTFOLIO', 'email': 'EMAIL', 'github': 'GITHUB',
               'linkedin': 'LINKEDIN', 'behance': 'BEHANCE',
               'location': 'LOCATION', 'available': 'AVAILABILITY'},
    'location': 'Guayaquil, Ecuador (GMT-5)',
    'available': 'Freelance and full-time',
    'stack_label': 'MAIN STACK',
    'stack_groups': {'web': 'Web', 'mobile': 'Mobile', 'games': 'Games / XR',
                     'back': 'Backend / Deploy', 'design': 'Design'},
    'langs_label': 'LANGUAGES',
    'langs': [('Spanish', 'Native'), ('English', 'Basic')],
    'exp_title': 'Experience',
    'exp': [
        ('Full-Stack Developer', 'Webs · Apps · Games · XR', '2025 — present',
         'Building complete products, from the initial idea to the final deliverable, '
         'combining design and code across web, mobile, games and XR.'),
        ('Web & Technical Developer', 'IDCOM · Metalwork Engineering & Construction', '2026',
         'Technical lead for the company: development and maintenance of landing pages, '
         'load-speed and SEO optimisation, and integration of forms and analytics.'),
        ('Web & Systems Developer', 'CECP · Medical Specialties Centre', '2025 — 2026',
         'Digital evolution of the brand: website, landing pages and mobile/PC application. '
         'Administrator of the EAGLES VISION electronic medical records platform.'),
        ('Game Developer', 'Indie Games', '2022 — 2024',
         'Projects like Trazando Pasos and Plantain Feast marked my first steps in '
         'programming, combining narrative, mechanics and interactive design.'),
    ],
    'proj_title': 'Selected projects',
    'proj': [
        ('idcom.com.ec — Corporate site', None, '2026',
         'Institutional site for a metalwork engineering company: service catalogue in modals, '
         'contact form and analytics with cookie consent.',
         'React · Tailwind CSS · Technical SEO · Google Analytics'),
        ('cecponline.com — Medical centre', None, '2026',
         'Commercial site for a medical specialties centre: local SEO, specialist cards with '
         'modals, Google reviews and direct booking through WhatsApp.',
         'Astro · Tailwind CSS · Local SEO · WebP'),
        ('Club de Exploradores — Gamified web', None, '2026',
         'Gamified site accompanying a physical puzzle (client Print Craft): QR missions, points '
         'and unlockable animals. Increased interaction and sales of the product.',
         'Astro · React · Tailwind CSS · TypeScript'),
        ('Trazando Pasos — VR game', 'Winner, VRDay Latam 2022 GameJam', '2022',
         'VR experience about migration: immersion makes the player feel the journey rather than '
         'just watch it. Recognition and certificate from UCSG.',
         'Unreal Engine · Blueprints · HTC Vive Pro 2'),
        ('ALERTA! — AR experience', 'Press', '2024',
         'AR for the mental health exhibition (client Pandecato): brings illustrations to life. '
         'Covered by Expreso newspaper and replicated in several cities across Ecuador.',
         'Lens Studio · JavaScript · Photoshop'),
    ],
    'edu_title': 'Education',
    'edu': ('BA in Digital Animation', '2018 — 2023',
            'Universidad Católica Santiago de Guayaquil — the foundation to move between visual '
            'design and code.'),
}
