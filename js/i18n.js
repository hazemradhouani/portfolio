/* ============================================================
   Hazem Radhouani · Portfolio 2026 · i18n.js v1
   Three-language translation system: EN / FR / AR
   ============================================================ */
(function () {
  'use strict';

  /* ─────────────────────────────────────────────────────────
     TRANSLATIONS
  ───────────────────────────────────────────────────────── */
  var T = {

    /* ── ENGLISH (default) ─────────────────────────────── */
    en: {
      /* Navigation */
      'nav.work':    'Work',
      'nav.videos':  'Videos',
      'nav.about':   'About',
      'nav.contact': 'Contact',
      'nav.books':   'Books',

      /* Footer */
      'footer.id':      'Hazem Radhouani · Architect',
      'footer.contact': 'Contact',
      'footer.copy':    '© 2026',
      'footer.linkedin':'LinkedIn ↗',

      /* Hero (index) */
      'hero.role':   'Architect',
      'hero.scroll': 'Selected Works',

      /* Project — common labels */
      'proj.back':     'All Work',
      'proj.location': 'Location',
      'proj.year':     'Year',
      'proj.studio':   'Studio',
      'proj.type':     'Type',
      'proj.surface':  'Surface',
      'proj.swipe':    'swipe to navigate',
      'proj.prev':     'Previous',
      'proj.next':     'Next',
      'proj.video':    'Watch the animation',

      /* Arrows */
      'arr.forward': '→',
      'arr.back':    '←',

      /* ── La Villette ─────────────────────────────────── */
      'lav.tag':         'PRO · Rehabilitation',
      'lav.type.val':    'Residential Rehabilitation',
      'lav.surface.val': '—',
      'lav.body1':       'A new residential building on an infill plot in central Paris, designed within the constraints of the PLU local urban plan and the Paris architectural guidelines for new construction in a dense historic context. The project addresses the street alignment, manages the transition between party walls of differing heights, and produces a facade composition that speaks to its immediate neighbours without imitation.',
      'lav.body2':       'The programme distributes six residential units across four levels with a shared courtyard at ground floor. The structural system is concrete with masonry infill, detailed in Revit for direct handover to the engineer. All PC documentation was prepared by the team at Studio BELEM with Hazem contributing from concept through to technical drawings and regulatory compliance checks.',
      'lav.gallery.west.label': 'West Facade, Passage Foubert',
      'lav.gallery.east.label': 'East Facade, Passage Foubert',
      'lav.gallery.plans.label': 'Floor Plans',
      'lav.gallery.section.label': 'Section and Facade Elevations',

      /* ── Foubert ─────────────────────────────────────── */
      'fou.tag':         'PRO · New Build',
      'fou.type.val':    'New Build Residential',
      'fou.body1':       'A new residential building on an infill plot in central Paris, designed within the constraints of the PLU local urban plan and the Paris architectural guidelines for new construction in a dense historic context. The project addresses the street alignment, manages the transition between party walls of differing heights, and produces a facade composition that speaks to its immediate neighbours without imitation.',
      'fou.body2':       'The programme distributes six residential units across four levels with a shared courtyard at ground floor. The structural system is concrete with masonry infill, detailed in Revit for direct handover to the engineer. All PC documentation was prepared by the team at Studio BELEM with Hazem contributing from concept through to technical drawings and regulatory compliance checks.',
      'fou.gallery.west.label':    'West Facade, Passage Foubert',
      'fou.gallery.east.label':    'East Facade, Passage Foubert',
      'fou.gallery.plans.label':   'Floor Plans',
      'fou.gallery.section.label': 'Section and Facade Elevations',

      /* ── Bolivar ─────────────────────────────────────── */
      'bol.tag':         'PRO · Mixed-Use',
      'bol.type.val':    'Hotel and Student Residence',
      'bol.body1':       'A mixed-use programme combining a boutique hotel and a student residence on a complex urban site adjacent to the Bolivar metro station. The project navigates a dual occupancy logic: the hotel seeks an urban and transient relationship with the city, while the student housing requires durability, community, and a domestic scale within the same envelope.',
      'bol.body2':       'The building section resolves this tension vertically, with hotel rooms occupying the lower floors at street level and student accommodation arranged around a shared interior courtyard at the upper levels. The facade system is designed to read as a coherent architectural gesture while modulating its openings and materiality to signal the change in programme. The project involves significant coordination with structural engineers and the urban planning authority.',
      'bol.gallery.aerial.label':    'Render, Aerial View',
      'bol.gallery.volumetric.label':'Volumetric Strategy',
      'bol.gallery.section.label':   'Longitudinal Section',

      /* ── Belhomme ─────────────────────────────────────── */
      'bel.tag':         'PRO · Rehabilitation',
      'bel.type.val':    'Residential Rehabilitation',
      'bel.body1':       'A corner residential building in Paris, its particular condition at the intersection of two streets creating a geometry that generates both problems and opportunities: obtuse room angles, a chamfered corner that reads as a landmark on the block, and party wall situations on two sides that require careful structural dialogue with adjacent buildings.',
      'bel.body2':       'The rehabilitation addresses the envelope, the common areas, and the redistribution of the upper-floor apartments. The chamfered corner is treated as the compositional centre of the facade renovation, reinforcing its urban role. The project was conducted within the ABF regulatory framework, requiring close coordination with the heritage authority throughout the design and permitting stages.',
      'bel.gallery.render.label':     'Render, Proposed Courtyard Facade',
      'bel.gallery.facades.label':    'Existing Facade Survey and Selective Demolition Plans',
      'bel.gallery.plu.label':        'Regulatory Compliance, PLU Sections',

      /* ── Zenata ───────────────────────────────────────── */
      'zen.tag':         'PRO · Infrastructure',
      'zen.type.val':    'Regional Rail Station',
      'zen.body1':       'A regional rail station for the Casablanca metropolitan network, designed as part of a feasibility study for a new RER-type line connecting the eastern suburbs of Casablanca to the city centre. The station serves as a multimodal interchange, integrating intercity rail, bus, and soft mobility within a single covered structure at the edge of the Zenata industrial and residential development zone.',
      'zen.body2':       'The architectural proposal addresses the civic dimension of infrastructure at the city scale: the station is designed to be legible from the highway approach and to create a covered public space that functions beyond train times as a place of urban activity. The project was developed at Yassir Khalil Studio with Hazem co-authoring the structural coordination and the organisation of passenger flows, and was recognised with second place in the competition organised by the Casablanca metropolitan transport authority.',
      'zen.distinction':              'Competition: 2nd Place · Casablanca Metropolitan Rail',
      'zen.gallery.programme.label':  'Programme and Longitudinal Section',

      /* ── Sentry ───────────────────────────────────────── */
      'sen.tag':         'PRO · Small Scale',
      'sen.type.val':    'Guard Pavilion',
      'sen.body1':       'A guard pavilion at Casablanca Finance City, the major financial district developed on the edge of Casablanca. The building performs within an extremely constrained footprint: access control, covered waiting, and a clear visual presence that marks the entry threshold to the complex.',
      'sen.body2':       'The pavilion is positioned at the boundary between the public road and the controlled domain, its geometry derived from this threshold condition. The structure is detailed to respond to the urban and institutional scale of Casablanca Finance City, with a compact material palette and a folded roof profile that gives the building a precise, legible silhouette.',
      'sen.gallery.aerial.label':  'Render, Aerial View',
      'sen.gallery.section.label': 'Section B-B',

      /* ── Villa Papillon ───────────────────────────────── */
      'pap.tag':         'PRO · Residential',
      'pap.type.val':    'Contemporary Villa',
      'pap.body1':       'A contemporary villa in Morocco for a private client, organised around a central courtyard that brings light and ventilation to the interior while maintaining privacy from the street. The plan unfolds from a compressed entry sequence into generous living spaces that open progressively toward the garden and pool on the south side, calibrating the relationship between interior, semi-exterior, and exterior according to the daily rhythms of occupation and the seasonal movement of the sun.',
      'pap.body2':       'The architectural language draws on the spatial logic of Moroccan domestic architecture while employing a contemporary material palette: reinforced concrete structure with white plaster, raw stone from the region, and timber elements. The villa was designed and produced in Revit at Yassir Khalil Studio, with Hazem responsible for the architectural development and client coordination from schematic design through to construction documentation.',

      /* ── Tamansourt ───────────────────────────────────── */
      'tam.tag':         'PRO · Healthcare',
      'tam.type.val':    'Hospital and Wellness Campus',
      'tam.body1':       'A hospital and wellness campus on the outskirts of Tamansourt, a planned city in the Marrakech metropolitan region. The programme combines a general hospital, a specialist wellness centre, and ancillary support facilities on a greenfield site, with the master plan organised to allow phased construction while maintaining functional coherence at each stage.',
      'tam.body2':       'The architectural proposal structures the campus around a central landscaped spine that connects arrival, administration, and clinical zones in a legible sequence. Patient wards are oriented to maximise natural light and ventilation while minimising solar gain in the summer months. The wellness centre is separated from the hospital by a planted courtyard, creating a clear spatial and experiential distinction between the two programmes. The project was developed by the team at Yassir Khalil Studio at feasibility and schematic design level, with full BIM coordination between architectural and engineering disciplines.',
      'tam.gallery.aerial.label': 'Render, Campus Aerial',
      'tam.gallery.facade.label': 'Render, Street Facade',

      /* ── Hay Mohammadi ────────────────────────────────── */
      'hay.tag':         'PRO · Infrastructure',
      'hay.type.val':    'RER Station',
      'hay.body1':       'A rapid transit station in the Hay Mohammadi district of Casablanca, one of the city\'s oldest and most densely inhabited popular neighbourhoods. The station is embedded within a complex urban fabric and is designed to act as a civic infrastructure in a double sense: functional as a transport node and spatial as a public threshold for a district that has historically lacked investment in its public realm.',
      'hay.body2':       'The project resolves a challenging site condition where the rail line runs at grade through a constrained urban corridor, requiring the station building to negotiate between the rail platform level and the existing street network. The covered concourse is designed to extend the street life of the neighbourhood into the station itself, with the canopy structure creating a sheltered public space that is active throughout the day. The project was produced in Revit with full structural and services coordination at Yassir Khalil Studio.',
      'hay.gallery.aerial.label':    'Render, Aerial View',
      'hay.gallery.structure.label': 'Structural System',
      'hay.gallery.section.label':   'Section, Street Facade',

      /* ── Al-Arg ───────────────────────────────────────── */
      'alarg.tag':         'Academic · Thesis',
      'alarg.type.val':    'Heritage Rehabilitation · Abandoned Village',
      'alarg.body1':       'Degree thesis awarded Highest Honours with a unanimous jury at ENAU, Université de Carthage, 2024. The project proposes a strategy for the rehabilitation of the village of ARG, an abandoned settlement in the Tunisian interior whose population evacuated over the course of the twentieth century, leaving behind an intact but deteriorating fabric of vernacular stone architecture.',
      'alarg.body2':       'The thesis operates at three scales simultaneously: a territorial analysis of the conditions that produced the abandonment, an urban proposal for the reactivation of the village as a place of memory, culture, and temporary dwelling, and an architectural intervention on a key building within the fabric. The research draws on the theories of Carlo Scarpa, Giorgio Grassi, and the Italian school of urban morphology, and proposes a practice of rehabilitation that listens to the existing before adding anything new.',
      'alarg.body3':       'The project was founded on field surveys and heritage documentation carried out with the Société de Préservation du Village d\'ARG over two years prior to the thesis, grounding the design work in direct material knowledge of the site.',
      'alarg.distinction': 'Highest Honours · Unanimous Jury · ENAU, Université de Carthage · June 2024',
      'alarg.gallery.renders.label':    'Renders, Project Atmosphere',
      'alarg.gallery.territory.label':  'Territory',
      'alarg.gallery.plans.label':      'Plans, Existing and Project',
      'alarg.gallery.structure.label':  'Section and Structural Systems',

      /* ── Corallum ─────────────────────────────────────── */
      'cor.tag':         'Academic · Cultural',
      'cor.type.val':    'Research and Exhibition Centre',
      'cor.body1':       'A coral research and exhibition centre on the northern Tunisian coast, designed as an academic project at ENAU to explore the relationship between scientific infrastructure and public space in a coastal landscape. The programme brings together a marine biology research laboratory, an exhibition space accessible to the public, and an outdoor platform for observation and education.',
      'cor.body2':       'The project is organised around the relationship between water and land, with the building positioned at the edge of the sea on a rocky promontory. The research facilities are embedded into the topography, partially submerged to control temperature and light, while the public exhibition spaces rise above the rock to offer views of the sea. The structural system is reinforced concrete cast against rock formwork, with openings calibrated to frame specific views and filter the intense coastal light.',
      'cor.body3':       'The project was developed through physical model-making and hand drawing alongside digital production, exploring the tectonic possibilities of a building built in and with the materials of its site.',
      'cor.gallery.renders.label':          'Renders',
      'cor.gallery.site.label':             'Site',
      'cor.gallery.volume.label':           'Formal Research, Volume',
      'cor.gallery.facade.label':           'Formal Research, Facade',

      /* ── Cinephile ────────────────────────────────────── */
      'cin.tag':         'Academic · Cultural',
      'cin.type.val':    'Cinema Complex',
      'cin.body1':       'A cinema complex in central Tunis, designed as an academic project at ENAU exploring the typology of the cultural institution as a piece of urban fabric. The project responds to a site at the intersection of the medina and the colonial city, a condition that demands a building capable of speaking to two distinct urban grammars without resolving them into a false synthesis.',
      'cin.body2':       'The programme distributes four cinema screens, a film library and archive, a cafe, and public circulation spaces across a building that is simultaneously urban and introverted. The primary public space is a covered interior street that runs through the building from one facade to the other, accessible outside of cinema hours and acting as a shortcut through the block. This device allows the building to contribute to the pedestrian life of the neighbourhood rather than withdrawing from it.',
      'cin.body3':       'The project was produced at the end of the first architectural cycle at ENAU and represents the first design work at urban scale, engaging seriously with questions of site, programme, and the relationship between architecture and the city.',
      'cin.gallery.renders.label':   'Renders, Interior Spaces',
      'cin.gallery.site.label':      'Site Study',
      'cin.gallery.sketches.label':  'Design Sketches',
      'cin.gallery.plan.label':      'Ground Floor Plan, N01',
      'cin.gallery.section.label':   'Section and Facade',

      /* ── About page ───────────────────────────────────── */
      'about.label':     'About',
      'about.role':      'Architect · Heritage & Rehabilitation · International Practice',
      'about.bio1':      'Architect graduated with Highest Honours (ENAU, 2026), drawn to the architecture of the existing: the inhabited, the deteriorated, the overlooked. My practice spans Paris, Casablanca, and Tokyo, cities where I have read how buildings hold memory, resist erasure, and remain rooted in place. I am determined to make heritage rehabilitation a speciality, and the breadth of my work reflects that commitment at every scale, from regional rail infrastructure in Morocco to residential rehabilitation in Paris and comparative heritage research in Japan.',
      'about.exp.title': 'Experience',
      'about.edu.title': 'Education',
      'about.skills.title':      'Skills',
      'about.lang.title':        'Languages',
      'about.dist.title':        'Distinctions',
      'about.contact.title':     'Contact',

      /* Experience items */
      'about.exp1.title':  'Studio BELEM · Paris',
      'about.exp1.role':   'Architectural Intern · Ongoing',
      'about.exp1.note':   'Residential, cultural, and rehabilitation projects from sketch to building permit. Full BIM production; coordination with structural and MEP consultants; French regulatory framework, PC, ABF prescriptions, listed monuments.',
      'about.exp2.title':  'Sakura Science Program · Japan',
      'about.exp2.role':   'Saga University & Waseda University · Invited researcher · Sole Tunisian representative',
      'about.exp2.note':   'Competitive international selection, Japanese government-funded. Intensive workshops on historic district rehabilitation and adaptive reuse. Comparative analysis: North African medinas and Japanese machiya, focused on spatial identity and heritage resilience.',
      'about.exp2.award':  'Most Appreciated Research',
      'about.exp3.title':  'Yassir Khalil Studio · Casablanca',
      'about.exp3.role':   'Architectural Intern · Full time',
      'about.exp3.note':   'Co-authored feasibility study and concept for a regional RER-type rail hub: urban integration, multimodal circulation, structural coordination. BIM deliverables in Revit; coordination with Moroccan municipal authorities and engineering offices.',
      'about.exp4.title':  '2ADP Salim Ben Rejeb Architectes · Tunis',
      'about.exp4.role':   'Architectural Intern',
      'about.exp4.note':   'Technical drawings and documentation for residential and civic projects (AutoCAD, ArchiCAD). Client presentation renders.',
      'about.exp5.title':  'Société de Préservation du Village d\'ARG · Tunisia',
      'about.exp5.role':   'Intern & Volunteer',
      'about.exp5.note':   'Field surveys and heritage assessment of an abandoned village, foundational documentation for the award-winning thesis.',

      /* Education */
      'about.edu1.title':   'National Architecture Diploma (DNA) · Master\'s equivalent',
      'about.edu1.inst':    'ENAU, Université de Carthage, Tunis · 11 February 2026',
      'about.edu1.note':    'Thesis: Between the Poetics of Place and the Value of Heritage',
      'about.edu1.mention': 'Highest Honours',
      'about.edu2.title':   'Final Year Architectural Thesis',
      'about.edu2.inst':    'ENAU, Université de Carthage · 14 June 2024',
      'about.edu2.note':    'Unanimous jury',
      'about.edu2.mention': 'Highest Honours',
      'about.edu3.title':   'First Cycle Diploma · Bachelor\'s equivalent',
      'about.edu3.inst':    'ENAU, Université de Carthage, Tunis',
      'about.edu3.note':    'With Distinction',

      /* Skills */
      'about.skill.bim':   'BIM & Design',
      'about.skill.vis':   'Visualisation',
      'about.skill.doc':   'Documentation',
      'about.skill.mot':   'Motion',

      /* Languages */
      'about.lang.arabic':   'Arabic',
      'about.lang.french':   'French',
      'about.lang.english':  'English',
      'about.lang.native':   'Native',
      'about.lang.fluent':   'Fluent',

      /* Distinctions */
      'about.dist1.title': 'Highest Honours · Unanimous Jury',
      'about.dist1.sub':   'National Architecture Diploma · ENAU, Université de Carthage',
      'about.dist2.title': 'Best Research Award',
      'about.dist2.sub':   'Sakura Science Program · Saga University & Waseda University, Japan',
      'about.dist3.title': '2nd Place · Competition',
      'about.dist3.sub':   'Zenata Station · Casablanca Metropolitan Rail, Morocco',
      'about.dist4.title': 'Highest Honours · Unanimous Jury',
      'about.dist4.sub':   'Final Year Architectural Thesis · ENAU, Université de Carthage',

      /* Contact form */
      'contact.name.label':    'Name',
      'contact.name.ph':       'Your name',
      'contact.email.label':   'Email',
      'contact.email.ph':      'your@email.com',
      'contact.subject.label': 'Subject',
      'contact.subject.ph':    'What is this about?',
      'contact.message.label': 'Message',
      'contact.message.ph':    'Your message…',
      'contact.send':          'Send',

      /* Books page */
      'books.label':     'Publications',
      'books.title':     'Books',
      'books.sub':       'Architectural thesis and internship report produced between 2024 and 2026.',
      'books.thesis.tag':   'Academic · Thesis · 2024',
      'books.thesis.title': 'Between the Poetics of Place\nand the Value of Heritage',
      'books.thesis.sub':   'To Revive the Spirit of Al Erg Village, Hammat Al Jarid',
      'books.thesis.inst.label':  'Institution',
      'books.thesis.inst.val':    'ENAU · Université de Carthage',
      'books.thesis.super.label': 'Supervisors',
      'books.thesis.super.val':   'Prof. Monsef Al-Fourati · Prof. Adnan Ben Nejma',
      'books.thesis.dist.label':  'Distinction',
      'books.thesis.dist.val':    'Mention Très Bien à l\'unanimité · June 2024',
      'books.thesis.body1': 'Degree thesis in architecture submitted at the National School of Architecture and Urban Planning of Tunis, Université de Carthage. Awarded Highest Honours with a unanimous jury. The project proposes a rehabilitation strategy for the abandoned ksar village of ARG in the Jérid oasis system of southern Tunisia, working simultaneously across territorial, urban, and architectural scales.',
      'books.thesis.body2': 'The research draws on heritage documentation carried out with the Société de Préservation du Village d\'ARG over two years prior to the thesis, grounding the design work in direct material knowledge of the site. The theoretical framework engages the Italian school of urban morphology and the practices of Carlo Scarpa and Giorgio Grassi.',
      'books.thesis.body3': 'Highest Honours · Unanimous Jury · ENAU, Université de Carthage · June 2024',
      'books.thesis.cta':   'Read the thesis',
      'books.thesis.open':  'Open',
      'books.report.tag':   'Professional · Report · 2026',
      'books.report.title': 'Internship Report',
      'books.report.sub':   'Professional practice across Paris, Casablanca, and Tokyo',
      'books.report.host.label':  'Host organisations',
      'books.report.host.val':    'Studio BELEM, Paris · Yassir Khalil Studio, Casablanca',
      'books.report.research.label': 'Research',
      'books.report.research.val':   'Sakura Science Program, Tokyo · Best Research Award · 2025',
      'books.report.super.label': 'Supervisor',
      'books.report.super.val':   'Prof. Moncef Fourati · February 2026',
      'books.report.body1': 'Internship report documenting professional architectural practice across three cities between 2024 and 2026. The report covers project work at Studio BELEM in Paris — residential rehabilitation, mixed-use, and heritage projects within the ABF regulatory framework — and at Yassir Khalil Studio in Casablanca, across infrastructure, residential, and healthcare programmes.',
      'books.report.body2': 'A chapter is dedicated to research conducted within the Sakura Science Program in Japan, 2025, for which the Best Research Award was received. The report is submitted in partial fulfilment of the requirements for the National Architecture Diploma at ENAU, Université de Carthage.',
      'books.report.cta':   'Read the report',
      'books.report.open':  'Open',

      /* Videos page */
      'videos.label':   'Motion Work',
      'videos.title':   'Videos',
      'videos.sub':     'Architectural renders and animations produced alongside project development.',
      'videos.sentry.tag':  'PRO · Small Scale · Morocco · 2024',
      'videos.sentry.title':'Sentry',
      'videos.sentry.desc': 'Guard pavilion at Casablanca Finance City. Animation exploring the threshold condition between public approach and controlled access.',
      'videos.sidi.tag':    'PRO · Infrastructure · Morocco · 2025',
      'videos.sidi.title':  'Sidi Maârouf Station',
      'videos.sidi.desc':   'Animation for the Sidi Maârouf RER station, canopy structure, passenger flows, and urban integration within the Casablanca metropolitan rail network.',
      'videos.zenata.tag':  'PRO · Infrastructure · Morocco · 2025',
      'videos.zenata.title':'Zenata Station',
      'videos.zenata.desc': 'Architectural animation for the Zenata regional rail station, covered concourse, structural canopy, and multimodal connections at the edge of Casablanca.',
    },

    /* ── FRENCH ─────────────────────────────────────────── */
    fr: {
      'nav.work':    'Projets',
      'nav.videos':  'Vidéos',
      'nav.about':   'À propos',
      'nav.contact': 'Contact',
      'nav.books':   'Publications',

      'footer.id':      'Hazem Radhouani · Architecte',
      'footer.contact': 'Contact',
      'footer.copy':    '© 2026',
      'footer.linkedin':'LinkedIn ↗',

      'hero.role':   'Architecte',
      'hero.scroll': 'Sélection',

      'proj.back':     'Tous les projets',
      'proj.location': 'Lieu',
      'proj.year':     'Année',
      'proj.studio':   'Studio',
      'proj.type':     'Type',
      'proj.surface':  'Surface',
      'proj.swipe':    'glisser pour naviguer',
      'proj.prev':     'Précédent',
      'proj.next':     'Suivant',
      'proj.video':    'Voir l\'animation',

      'arr.forward': '→',
      'arr.back':    '←',

      /* La Villette */
      'lav.tag':         'PRO · Réhabilitation',
      'lav.type.val':    'Réhabilitation résidentielle',
      'lav.body1':       'Un immeuble résidentiel neuf sur un terrain enclavé au cœur de Paris, conçu dans les contraintes du PLU et des règles architecturales de la Ville de Paris pour les constructions neuves en secteur historique dense. Le projet traite l\'alignement de rue, gère la transition entre des murs mitoyens de hauteurs différentes et compose une façade qui dialogue avec le bâti environnant sans l\'imiter.',
      'lav.body2':       'Le programme distribue six logements sur quatre niveaux avec une cour partagée en rez-de-chaussée. La structure est en béton armé avec remplissage maçonné, dessinée en BIM Revit pour remise directe à l\'ingénieur. L\'ensemble du dossier de permis de construire a été réalisé par l\'équipe de Studio BELEM, Hazem ayant contribué de l\'esquisse aux plans techniques et aux vérifications de conformité réglementaire.',
      'lav.gallery.west.label': 'Façade ouest, Passage Foubert',
      'lav.gallery.east.label': 'Façade est, Passage Foubert',
      'lav.gallery.plans.label': 'Plans de niveaux',
      'lav.gallery.section.label': 'Coupe et élévations de façades',

      /* Foubert */
      'fou.tag':         'PRO · Construction neuve',
      'fou.type.val':    'Résidentiel neuf',
      'fou.body1':       'Un immeuble résidentiel neuf sur un terrain enclavé au cœur de Paris, conçu dans les contraintes du PLU et des règles architecturales de la Ville de Paris pour les constructions neuves en secteur historique dense. Le projet traite l\'alignement de rue, gère la transition entre des murs mitoyens de hauteurs différentes et compose une façade qui dialogue avec le bâti environnant sans l\'imiter.',
      'fou.body2':       'Le programme distribue six logements sur quatre niveaux avec une cour partagée en rez-de-chaussée. La structure est en béton armé avec remplissage maçonné, dessinée en BIM Revit pour remise directe à l\'ingénieur. L\'ensemble du dossier PC a été réalisé par l\'équipe de Studio BELEM, Hazem contribuant de l\'esquisse aux plans techniques et aux vérifications de conformité réglementaire.',
      'fou.gallery.west.label':    'Façade ouest, Passage Foubert',
      'fou.gallery.east.label':    'Façade est, Passage Foubert',
      'fou.gallery.plans.label':   'Plans de niveaux',
      'fou.gallery.section.label': 'Coupe et élévations de façades',

      /* Bolivar */
      'bol.tag':         'PRO · Mixte',
      'bol.type.val':    'Hôtel et résidence étudiante',
      'bol.body1':       'Un programme mixte combinant un hôtel boutique et une résidence étudiante sur un site urbain complexe adjacent à la station de métro Bolivar. Le projet navigue une logique de double occupation : l\'hôtel cherche une relation urbaine et transitoire avec la ville, tandis que le logement étudiant requiert durabilité, communauté et échelle domestique au sein d\'une même enveloppe.',
      'bol.body2':       'La coupe du bâtiment résout cette tension verticalement : les chambres d\'hôtel occupent les niveaux inférieurs en rez-de-chaussée et le logement étudiant s\'organise autour d\'une cour intérieure commune aux niveaux supérieurs. Le système de façade est conçu pour se lire comme un geste architectural cohérent tout en modulant ses ouvertures et sa matérialité pour signaler le changement de programme. Le projet implique une coordination importante avec les ingénieurs structure et l\'autorité d\'urbanisme.',
      'bol.gallery.aerial.label':    'Rendu, vue aérienne',
      'bol.gallery.volumetric.label':'Stratégie volumétrique',
      'bol.gallery.section.label':   'Coupe longitudinale',

      /* Belhomme */
      'bel.tag':         'PRO · Réhabilitation',
      'bel.type.val':    'Réhabilitation résidentielle',
      'bel.body1':       'Un immeuble résidentiel d\'angle à Paris, dont la situation particulière à l\'intersection de deux rues génère des problèmes et des opportunités : angles de pièces obtus, angle coupé qui se lit comme un repère dans l\'îlot, et situations de murs mitoyens sur deux côtés nécessitant un dialogue structurel attentif avec les constructions voisines.',
      'bel.body2':       'La réhabilitation traite l\'enveloppe, les parties communes et la redistribution des appartements aux étages supérieurs. L\'angle coupé est traité comme le centre compositionnel de la rénovation de façade, renforçant son rôle urbain. Le projet a été mené dans le cadre réglementaire ABF, nécessitant une étroite coordination avec les services du patrimoine tout au long des phases de conception et d\'instruction du permis.',
      'bel.gallery.render.label':     'Rendu, façade sur cour proposée',
      'bel.gallery.facades.label':    'Relevé des façades existantes et plans de démolition sélective',
      'bel.gallery.plu.label':        'Conformité réglementaire, coupes PLU',

      /* Zenata */
      'zen.tag':         'PRO · Infrastructure',
      'zen.type.val':    'Gare ferroviaire régionale',
      'zen.body1':       'Une gare ferroviaire régionale pour le réseau métropolitain de Casablanca, conçue dans le cadre d\'une étude de faisabilité pour une nouvelle ligne de type RER reliant les banlieues est de Casablanca au centre-ville. La gare constitue un pôle d\'échanges multimodal, intégrant le rail, le bus et les mobilités douces au sein d\'une structure couverte unique, en bordure de la zone de développement industrielle et résidentielle de Zenata.',
      'zen.body2':       'La proposition architecturale aborde la dimension civique de l\'infrastructure à l\'échelle de la ville : la gare est conçue pour être lisible depuis l\'approche autoroutière et pour créer un espace public couvert qui fonctionne au-delà des horaires de train comme lieu d\'activité urbaine. Le projet a été développé chez Yassir Khalil Studio, Hazem co-signant la coordination structurelle et l\'organisation des flux voyageurs. Il a été récompensé par la 2ème place au concours organisé par l\'autorité de transport métropolitain de Casablanca.',
      'zen.distinction':              'Concours : 2ème prix · Réseau ferré métropolitain de Casablanca',
      'zen.gallery.programme.label':  'Programme et coupe longitudinale',

      /* Sentry */
      'sen.tag':         'PRO · Petite échelle',
      'sen.type.val':    'Pavillon de gardiennage',
      'sen.body1':       'Un pavillon de gardiennage à Casablanca Finance City, le grand quartier financier développé en périphérie de Casablanca. Le bâtiment répond à un programme extrêmement contraint : contrôle d\'accès, attente couverte et présence visuelle claire marquant le seuil d\'entrée du complexe.',
      'sen.body2':       'Le pavillon est positionné à la limite entre la voie publique et le domaine contrôlé, sa géométrie étant issue de cette condition de seuil. La structure est détaillée à l\'échelle urbaine et institutionnelle de Casablanca Finance City, avec une palette de matériaux compacte et un profil de toiture plié donnant au bâtiment une silhouette précise et lisible.',
      'sen.gallery.aerial.label':  'Rendu, vue aérienne',
      'sen.gallery.section.label': 'Coupe B-B',

      /* Villa Papillon */
      'pap.tag':         'PRO · Résidentiel',
      'pap.type.val':    'Villa contemporaine',
      'pap.body1':       'Une villa contemporaine au Maroc pour un client privé, organisée autour d\'un patio central qui apporte lumière et ventilation à l\'intérieur tout en préservant l\'intimité de la rue. Le plan se déploie depuis une séquence d\'entrée comprimée vers des espaces de vie généreux qui s\'ouvrent progressivement vers le jardin et la piscine au sud, calibrant la relation entre intérieur, semi-extérieur et extérieur selon les rythmes quotidiens d\'occupation et le mouvement saisonnier du soleil.',
      'pap.body2':       'Le langage architectural s\'inspire de la logique spatiale de l\'architecture domestique marocaine tout en employant une palette contemporaine : structure en béton armé avec enduit blanc, pierre brute de la région et éléments en bois. La villa a été conçue en Revit chez Yassir Khalil Studio, Hazem assurant le développement architectural et la coordination client de l\'esquisse à l\'exécution.',

      /* Tamansourt */
      'tam.tag':         'PRO · Santé',
      'tam.type.val':    'Campus hospitalier et bien-être',
      'tam.body1':       'Un campus hospitalier et de bien-être en périphérie de Tamansourt, ville nouvelle dans la région métropolitaine de Marrakech. Le programme associe un hôpital général, un centre de bien-être spécialisé et des équipements annexes sur un terrain vierge, le plan masse étant organisé pour permettre une construction par phases tout en maintenant une cohérence fonctionnelle à chaque étape.',
      'tam.body2':       'La proposition architecturale structure le campus autour d\'une colonne vertébrale paysagère centrale reliant arrivée, administration et zones cliniques dans une séquence lisible. Les ailes d\'hospitalisation sont orientées pour maximiser la lumière naturelle et la ventilation tout en minimisant les apports solaires en été. Le centre de bien-être est séparé de l\'hôpital par une cour plantée, créant une distinction spatiale et expérientielle nette entre les deux programmes. Le projet a été développé chez Yassir Khalil Studio en études de faisabilité et conception, avec coordination BIM complète.',
      'tam.gallery.aerial.label': 'Rendu, vue aérienne du campus',
      'tam.gallery.facade.label': 'Rendu, façade sur rue',

      /* Hay Mohammadi */
      'hay.tag':         'PRO · Infrastructure',
      'hay.type.val':    'Gare RER',
      'hay.body1':       'Une station de transport rapide dans le quartier Hay Mohammadi de Casablanca, l\'un des quartiers populaires les plus anciens et les plus densément habités de la ville. La gare s\'inscrit dans un tissu urbain complexe et est conçue pour agir comme une infrastructure civique dans un double sens : fonctionnelle comme nœud de transport et spatiale comme seuil public pour un quartier qui a historiquement manqué d\'investissement dans son espace public.',
      'hay.body2':       'Le projet résout une condition de site difficile où la ligne ferroviaire passe à niveau dans un couloir urbain contraint, exigeant que le bâtiment de la gare négocie entre le niveau du quai et la trame viaire existante. Le hall couvert est conçu pour prolonger la vie de rue du quartier dans la gare, la structure du auvent créant un espace public couvert actif tout au long de la journée. Le projet a été produit en Revit avec une coordination complète structure et fluides chez Yassir Khalil Studio.',
      'hay.gallery.aerial.label':    'Rendu, vue aérienne',
      'hay.gallery.structure.label': 'Système structurel',
      'hay.gallery.section.label':   'Coupe, façade sur rue',

      /* Al-Arg */
      'alarg.tag':         'Académique · Mémoire',
      'alarg.type.val':    'Réhabilitation patrimoniale · Village abandonné',
      'alarg.body1':       'Mémoire de diplôme couronné de la Mention Très Bien à l\'unanimité du jury à l\'ENAU, Université de Carthage, 2024. Le projet propose une stratégie de réhabilitation du village d\'ARG, un établissement abandonné dans l\'intérieur tunisien dont la population a évacué au cours du vingtième siècle, laissant derrière elle un tissu intact mais dégradé d\'architecture vernaculaire en pierre.',
      'alarg.body2':       'Le mémoire opère simultanément à trois échelles : une analyse territoriale des conditions ayant produit l\'abandon, une proposition urbaine de réactivation du village comme lieu de mémoire, de culture et d\'habitation temporaire, et une intervention architecturale sur un bâtiment clé du tissu. La recherche s\'appuie sur les théories de Carlo Scarpa, Giorgio Grassi et l\'école italienne de morphologie urbaine, proposant une pratique de réhabilitation qui écoute l\'existant avant d\'y ajouter quoi que ce soit.',
      'alarg.body3':       'Le projet s\'est fondé sur des relevés de terrain et une documentation patrimoniale menés avec la Société de Préservation du Village d\'ARG pendant deux ans avant le mémoire, ancrant le travail de conception dans une connaissance matérielle directe du site.',
      'alarg.distinction': 'Mention Très Bien · Jury unanime · ENAU, Université de Carthage · Juin 2024',
      'alarg.gallery.renders.label':   'Rendus, ambiances du projet',
      'alarg.gallery.territory.label': 'Territoire',
      'alarg.gallery.plans.label':     'Plans, état existant et projet',
      'alarg.gallery.structure.label': 'Coupe et systèmes constructifs',

      /* Corallum */
      'cor.tag':         'Académique · Culturel',
      'cor.type.val':    'Centre de recherche et d\'exposition',
      'cor.body1':       'Un centre de recherche et d\'exposition sur le corail sur la côte nord tunisienne, conçu comme projet académique à l\'ENAU pour explorer la relation entre infrastructure scientifique et espace public dans un paysage côtier. Le programme réunit un laboratoire de biologie marine, un espace d\'exposition accessible au public et une plateforme d\'observation et d\'éducation en extérieur.',
      'cor.body2':       'Le projet s\'organise autour de la relation entre eau et terre, le bâtiment étant positionné en bordure de mer sur un promontoire rocheux. Les installations de recherche sont encastrées dans la topographie, partiellement enterrées pour contrôler la température et la lumière, tandis que les espaces publics d\'exposition s\'élèvent au-dessus du rocher pour offrir des vues sur la mer. Le système structural est en béton armé cofré contre le rocher, avec des ouvertures calibrées pour encadrer des vues précises et filtrer la lumière côtière intense.',
      'cor.body3':       'Le projet a été développé à travers la maquette physique et le dessin à la main en parallèle de la production numérique, explorant les possibilités tectoniques d\'un bâtiment construit dans et avec les matériaux de son site.',
      'cor.gallery.renders.label':         'Rendus',
      'cor.gallery.site.label':            'Site',
      'cor.gallery.volume.label':          'Recherche formelle, volume',
      'cor.gallery.facade.label':          'Recherche formelle, façade',

      /* Cinephile */
      'cin.tag':         'Académique · Culturel',
      'cin.type.val':    'Complexe cinématographique',
      'cin.body1':       'Un complexe cinématographique au centre de Tunis, conçu comme projet académique à l\'ENAU explorant la typo­logie de l\'institution culturelle comme pièce du tissu urbain. Le projet répond à un site à l\'intersection de la médina et de la ville coloniale, une condition qui exige un bâtiment capable de parler à deux grammaires urbaines distinctes sans les résoudre en une synthèse artificielle.',
      'cin.body2':       'Le programme distribue quatre salles de cinéma, une cinémathèque, un café et des espaces de circulation publics dans un bâtiment à la fois urbain et introverti. L\'espace public principal est une rue intérieure couverte qui traverse le bâtiment d\'une façade à l\'autre, accessible en dehors des séances et servant de raccourci à travers l\'îlot. Ce dispositif permet au bâtiment de contribuer à la vie piétonne du quartier plutôt que de s\'en retrancher.',
      'cin.body3':       'Le projet a été produit à la fin du premier cycle à l\'ENAU et représente le premier travail de conception à l\'échelle urbaine, engageant sérieusement les questions de site, de programme et de rapport entre architecture et ville.',
      'cin.gallery.renders.label':   'Rendus, espaces intérieurs',
      'cin.gallery.site.label':      'Étude de site',
      'cin.gallery.sketches.label':  'Croquis de conception',
      'cin.gallery.plan.label':      'Plan du rez-de-chaussée N01',
      'cin.gallery.section.label':   'Coupe et façade',

      /* About */
      'about.label':     'À propos',
      'about.role':      'Architecte · Patrimoine & Réhabilitation · Pratique internationale',
      'about.bio1':      'Architecte diplômé avec la Mention Très Bien (ENAU, 2026), attiré par l\'architecture de l\'existant : l\'habité, le dégradé, le délaissé. Ma pratique traverse Paris, Casablanca et Tokyo, villes où j\'ai lu comment les bâtiments portent la mémoire, résistent à l\'effacement et restent ancrés dans leur lieu. Je suis déterminé à faire de la réhabilitation du patrimoine une spécialité, et la diversité de mon travail reflète cet engagement à toutes les échelles, de l\'infrastructure ferroviaire régionale au Maroc à la réhabilitation résidentielle à Paris et à la recherche comparative sur le patrimoine au Japon.',
      'about.exp.title': 'Expérience',
      'about.edu.title': 'Formation',
      'about.skills.title':  'Compétences',
      'about.lang.title':    'Langues',
      'about.dist.title':    'Distinctions',
      'about.contact.title': 'Contact',

      'about.exp1.title': 'Studio BELEM · Paris',
      'about.exp1.role':  'Architecte stagiaire · En cours',
      'about.exp1.note':  'Projets résidentiels, culturels et de réhabilitation de l\'esquisse au permis de construire. Production BIM complète ; coordination avec ingénieurs structure et fluides ; cadre réglementaire français, PC, prescriptions ABF, monuments historiques.',
      'about.exp2.title': 'Programme Sakura Science · Japon',
      'about.exp2.role':  'Université de Saga & Université de Waseda · Chercheur invité · Seul représentant tunisien',
      'about.exp2.note':  'Sélection internationale compétitive, financement gouvernemental japonais. Ateliers intensifs sur la réhabilitation de quartiers historiques et la réutilisation adaptative. Analyse comparative : médinas nord-africaines et machiya japonais, axée sur l\'identité spatiale et la résilience patrimoniale.',
      'about.exp2.award': 'Meilleure recherche',
      'about.exp3.title': 'Yassir Khalil Studio · Casablanca',
      'about.exp3.role':  'Architecte stagiaire · Temps plein',
      'about.exp3.note':  'Co-auteur d\'une étude de faisabilité et d\'un concept pour un pôle ferroviaire régional de type RER : intégration urbaine, circulation multimodale, coordination structurelle. Livrables BIM en Revit ; coordination avec les autorités municipales marocaines et les bureaux d\'études.',
      'about.exp4.title': '2ADP Salim Ben Rejeb Architectes · Tunis',
      'about.exp4.role':  'Architecte stagiaire',
      'about.exp4.note':  'Dessins techniques et documentation pour projets résidentiels et civiques (AutoCAD, ArchiCAD). Rendus pour présentations clients.',
      'about.exp5.title': 'Société de Préservation du Village d\'ARG · Tunisie',
      'about.exp5.role':  'Stagiaire & Bénévole',
      'about.exp5.note':  'Relevés de terrain et diagnostic patrimonial d\'un village abandonné, documentation fondatrice du mémoire primé.',

      'about.edu1.title':   'Diplôme National d\'Architecte (DNA) · Équivalent master',
      'about.edu1.inst':    'ENAU, Université de Carthage, Tunis · 11 février 2026',
      'about.edu1.note':    'Mémoire : Entre la poétique du lieu et la valeur du patrimoine',
      'about.edu1.mention': 'Mention Très Bien',
      'about.edu2.title':   'Mémoire de fin d\'études d\'architecture',
      'about.edu2.inst':    'ENAU, Université de Carthage · 14 juin 2024',
      'about.edu2.note':    'Jury unanime',
      'about.edu2.mention': 'Mention Très Bien',
      'about.edu3.title':   'Diplôme du Premier Cycle · Équivalent licence',
      'about.edu3.inst':    'ENAU, Université de Carthage, Tunis',
      'about.edu3.note':    'Avec félicitations',

      'about.skill.bim': 'BIM & Conception',
      'about.skill.vis': 'Visualisation',
      'about.skill.doc': 'Documentation',
      'about.skill.mot': 'Motion',

      'about.lang.arabic':  'Arabe',
      'about.lang.french':  'Français',
      'about.lang.english': 'Anglais',
      'about.lang.native':  'Langue maternelle',
      'about.lang.fluent':  'Courant',

      'about.dist1.title': 'Mention Très Bien · Jury unanime',
      'about.dist1.sub':   'Diplôme National d\'Architecte · ENAU, Université de Carthage',
      'about.dist2.title': 'Meilleure recherche',
      'about.dist2.sub':   'Programme Sakura Science · Université de Saga & Université de Waseda, Japon',
      'about.dist3.title': '2ème prix · Concours',
      'about.dist3.sub':   'Gare de Zenata · Réseau ferré métropolitain de Casablanca, Maroc',
      'about.dist4.title': 'Mention Très Bien · Jury unanime',
      'about.dist4.sub':   'Mémoire de fin d\'études · ENAU, Université de Carthage',

      'contact.name.label':    'Nom',
      'contact.name.ph':       'Votre nom',
      'contact.email.label':   'E-mail',
      'contact.email.ph':      'votre@email.com',
      'contact.subject.label': 'Objet',
      'contact.subject.ph':    'De quoi s\'agit-il ?',
      'contact.message.label': 'Message',
      'contact.message.ph':    'Votre message…',
      'contact.send':          'Envoyer',

      /* Books */
      'books.label': 'Publications',
      'books.title': 'Publications',
      'books.sub':   'Mémoire de diplôme et rapport de stage produits entre 2024 et 2026.',
      'books.thesis.tag':   'Académique · Mémoire · 2024',
      'books.thesis.title': 'Entre la poétique du lieu\net la valeur du patrimoine',
      'books.thesis.sub':   'Revivifier l\'esprit du village d\'Al Erg, Hammat Al Jarid',
      'books.thesis.inst.label':  'Institution',
      'books.thesis.inst.val':    'ENAU · Université de Carthage',
      'books.thesis.super.label': 'Directeurs',
      'books.thesis.super.val':   'Prof. Monsef Al-Fourati · Prof. Adnan Ben Nejma',
      'books.thesis.dist.label':  'Distinction',
      'books.thesis.dist.val':    'Mention Très Bien à l\'unanimité · Juin 2024',
      'books.thesis.body1': 'Mémoire de diplôme d\'architecture soutenu à l\'École Nationale d\'Architecture et d\'Urbanisme de Tunis, Université de Carthage. Couronné de la Mention Très Bien à l\'unanimité du jury. Le projet propose une stratégie de réhabilitation du village ksar d\'ARG dans le système oasien du Jérid, en Tunisie méridionale, opérant simultanément aux échelles territoriale, urbaine et architecturale.',
      'books.thesis.body2': 'La recherche s\'appuie sur une documentation patrimoniale menée avec la Société de Préservation du Village d\'ARG pendant deux ans avant le mémoire, ancrant le travail de conception dans une connaissance matérielle directe du site. Le cadre théorique engage l\'école italienne de morphologie urbaine et les pratiques de Carlo Scarpa et Giorgio Grassi.',
      'books.thesis.body3': 'Mention Très Bien · Jury unanime · ENAU, Université de Carthage · Juin 2024',
      'books.thesis.cta':   'Lire le mémoire',
      'books.thesis.open':  'Ouvrir',
      'books.report.tag':   'Professionnel · Rapport · 2026',
      'books.report.title': 'Rapport de stage',
      'books.report.sub':   'Pratique professionnelle à Paris, Casablanca et Tokyo',
      'books.report.host.label':     'Organismes d\'accueil',
      'books.report.host.val':       'Studio BELEM, Paris · Yassir Khalil Studio, Casablanca',
      'books.report.research.label': 'Recherche',
      'books.report.research.val':   'Programme Sakura Science, Tokyo · Meilleure recherche · 2025',
      'books.report.super.label':    'Encadrant',
      'books.report.super.val':      'Prof. Moncef Fourati · Février 2026',
      'books.report.body1': 'Rapport de stage documentant la pratique architecturale professionnelle dans trois villes entre 2024 et 2026. Le rapport couvre les travaux menés chez Studio BELEM à Paris — réhabilitation résidentielle, mixte et patrimonial dans le cadre réglementaire ABF — et chez Yassir Khalil Studio à Casablanca, sur des programmes d\'infrastructure, résidentiels et de santé.',
      'books.report.body2': 'Un chapitre est consacré à la recherche menée dans le cadre du Programme Sakura Science au Japon en 2025, pour laquelle le Prix de la Meilleure Recherche a été décerné. Le rapport est soumis en accomplissement partiel des exigences du Diplôme National d\'Architecte à l\'ENAU, Université de Carthage.',
      'books.report.cta':   'Lire le rapport',
      'books.report.open':  'Ouvrir',

      /* Videos */
      'videos.label': 'Motion',
      'videos.title': 'Vidéos',
      'videos.sub':   'Rendus architecturaux et animations produits en accompagnement du développement des projets.',
      'videos.sentry.tag':   'PRO · Petite échelle · Maroc · 2024',
      'videos.sentry.title': 'Sentry',
      'videos.sentry.desc':  'Pavillon de gardiennage à Casablanca Finance City. Animation explorant la condition de seuil entre approche publique et accès contrôlé.',
      'videos.sidi.tag':     'PRO · Infrastructure · Maroc · 2025',
      'videos.sidi.title':   'Gare Sidi Maârouf',
      'videos.sidi.desc':    'Animation pour la gare RER de Sidi Maârouf, structure du auvent, flux voyageurs et intégration urbaine au sein du réseau ferré métropolitain de Casablanca.',
      'videos.zenata.tag':   'PRO · Infrastructure · Maroc · 2025',
      'videos.zenata.title': 'Gare de Zenata',
      'videos.zenata.desc':  'Animation architecturale pour la gare ferroviaire régionale de Zenata, hall couvert, auvent structurel et connexions multimodales à la périphérie de Casablanca.',
    },

    /* ── ARABIC ─────────────────────────────────────────── */
    ar: {
      'nav.work':    'أعمال',
      'nav.videos':  'فيديوهات',
      'nav.about':   'نبذة',
      'nav.contact': 'تواصل',
      'nav.books':   'منشورات',

      'footer.id':      'حازم رضواني · مهندس معماري',
      'footer.contact': 'تواصل',
      'footer.copy':    '© 2026',
      'footer.linkedin':'LinkedIn ↗',

      'hero.role':   'مهندس معماري',
      'hero.scroll': 'أعمال مختارة',

      'proj.back':     'جميع الأعمال',
      'proj.location': 'الموقع',
      'proj.year':     'السنة',
      'proj.studio':   'الأستوديو',
      'proj.type':     'النوع',
      'proj.surface':  'المساحة',
      'proj.swipe':    'اسحب للتنقل',
      'proj.prev':     'السابق',
      'proj.next':     'التالي',
      'proj.video':    'مشاهدة الرسوم المتحركة',

      'arr.forward': '←',
      'arr.back':    '→',

      /* La Villette */
      'lav.tag':         'مهني · إعادة تأهيل',
      'lav.type.val':    'إعادة تأهيل سكني',
      'lav.body1':       'مبنى سكني جديد في قطعة أرض وسط باريس، صُمِّم وفق قيود التخطيط العمراني المحلي والمبادئ التوجيهية المعمارية الباريسية للبناء الجديد في السياقات التاريخية الكثيفة. يُعالج المشروع محاذاة الشارع، وإدارة الانتقال بين جدران الطرف التي تتفاوت في ارتفاعاتها، ويُقدّم تكوينًا للواجهة يتجاوب مع المحيط الفوري دون تقليده.',
      'lav.body2':       'يوزّع البرنامج ستة وحدات سكنية على أربعة طوابق مع فناء مشترك في الطابق الأرضي. نُفِّذ النظام الإنشائي بالخرسانة المسلحة مع حشو بالبناء، وقد تمت معالجته في Revit استعدادًا لتسليمه مباشرةً إلى المهندس. أعدّ فريق Studio BELEM وثائق رخصة البناء كاملة، وقد أسهم حازم في هذا العمل من مرحلة المفهوم حتى الرسومات التقنية ومراجعات الامتثال التنظيمي.',
      'lav.gallery.west.label': 'الواجهة الغربية، Passage Foubert',
      'lav.gallery.east.label': 'الواجهة الشرقية، Passage Foubert',
      'lav.gallery.plans.label': 'مخططات الطوابق',
      'lav.gallery.section.label': 'المقطع وارتفاعات الواجهات',

      /* Foubert */
      'fou.tag':         'مهني · بناء جديد',
      'fou.type.val':    'مبنى سكني جديد',
      'fou.body1':       'مبنى سكني جديد في قطعة أرض وسط باريس، صُمِّم وفق قيود التخطيط العمراني المحلي والمبادئ التوجيهية المعمارية للبناء الجديد في السياقات التاريخية الكثيفة. يُعالج المشروع محاذاة الشارع، وإدارة الانتقال بين جدران الطرف المتفاوتة الارتفاعات، ويُقدّم تكوين واجهة يتجاوب مع المحيط الفوري دون تقليده.',
      'fou.body2':       'يوزّع البرنامج ستة وحدات سكنية على أربعة طوابق مع فناء مشترك. نُفِّذ النظام الإنشائي بالخرسانة المسلحة وحُرِّر في Revit لتسليمه مباشرةً إلى المهندس. أسهم حازم في العمل من المفهوم حتى الرسومات التقنية ومراجعات الامتثال التنظيمي.',
      'fou.gallery.west.label':    'الواجهة الغربية، Passage Foubert',
      'fou.gallery.east.label':    'الواجهة الشرقية، Passage Foubert',
      'fou.gallery.plans.label':   'مخططات الطوابق',
      'fou.gallery.section.label': 'المقطع وارتفاعات الواجهات',

      /* Bolivar */
      'bol.tag':         'مهني · متعدد الاستخدامات',
      'bol.type.val':    'فندق ومسكن طلابي',
      'bol.body1':       'برنامج متعدد الاستخدامات يجمع بين فندق بوتيك ومسكن طلابي في موقع حضري معقد مجاور لمحطة مترو Bolivar. يتعامل المشروع مع منطق إشغال مزدوج: يسعى الفندق إلى علاقة حضرية وعابرة مع المدينة، في حين يتطلب السكن الطلابي المتانة والمجتمعية والمقياس المنزلي ضمن الغلاف ذاته.',
      'bol.body2':       'يحلّ المقطع البنائي هذا التوتر عموديًا، إذ تشغل غرف الفندق الطوابق السفلية على مستوى الشارع، ويتنظّم السكن الطلابي حول فناء داخلي مشترك في الطوابق العليا. يُصمَّم نظام الواجهة بوصفه إيماءة معمارية متماسكة مع تنويع فتحاتها ومادتها للتعبير عن التغيير في البرنامج. يستلزم المشروع تنسيقًا واسعًا مع المهندسين الإنشائيين وهيئة التخطيط العمراني.',
      'bol.gallery.aerial.label':    'تجسيد، منظور جوي',
      'bol.gallery.volumetric.label':'الاستراتيجية الحجمية',
      'bol.gallery.section.label':   'المقطع الطولي',

      /* Belhomme */
      'bel.tag':         'مهني · إعادة تأهيل',
      'bel.type.val':    'إعادة تأهيل سكني',
      'bel.body1':       'مبنى سكني زاوية في باريس، وضعه الخاص عند تقاطع شارعين يخلق هندسةً تولّد مشاكل وفرصًا في آن: زوايا غرف منفرجة، وزاوية مشطوفة تُقرأ كعلامة مرجعية في المبنى، وحالات جدران طرف على جانبين تستدعي حوارًا إنشائيًا دقيقًا مع المباني المجاورة.',
      'bel.body2':       'تعالج عملية إعادة التأهيل الغلاف الخارجي والمساحات المشتركة وإعادة توزيع شقق الطوابق العليا. تُعامَل الزاوية المشطوفة بوصفها مركزًا تكوينيًا لتجديد الواجهة، مما يعزز دورها الحضري. نُفِّذ المشروع في إطار منظومة ABF التنظيمية، مما استدعى تنسيقًا وثيقًا مع هيئة التراث طوال مراحل التصميم والحصول على التصاريح.',
      'bel.gallery.render.label':     'تجسيد، واجهة الفناء المقترحة',
      'bel.gallery.facades.label':    'مسح الواجهات الحالية وخطط الهدم الانتقائي',
      'bel.gallery.plu.label':        'الامتثال التنظيمي، مقاطع PLU',

      /* Zenata */
      'zen.tag':         'مهني · بنية تحتية',
      'zen.type.val':    'محطة سكة حديد إقليمية',
      'zen.body1':       'محطة سكة حديد إقليمية لشبكة الدار البيضاء الحضرية، صُمِّمت ضمن دراسة جدوى لخط جديد من نوع RER يربط الضواحي الشرقية للدار البيضاء بمركز المدينة. تُشكِّل المحطة مركز تبادل متعدد الوسائط يدمج السكك الحديدية والحافلات وخيارات التنقل الرشيق ضمن بنية مسقوفة واحدة، على أطراف منطقة التطوير الصناعي والسكني بزناتة.',
      'zen.body2':       'تُعالج الاقتراح المعماري البُعد المدني للبنية التحتية على مستوى المدينة: صُمِّمت المحطة لتكون مقروءة من المقترَب السريع وتخلق فضاءً عامًا مسقوفًا يعمل بعد أوقات القطارات كمكان للنشاط الحضري. طُوِّر المشروع في Yassir Khalil Studio بمشاركة حازم في تأليف التنسيق الإنشائي وتنظيم تدفقات الركاب، وحصل على المرتبة الثانية في المسابقة.',
      'zen.distinction':              'مسابقة: المرتبة الثانية · شبكة السكك الحديدية الحضرية بالدار البيضاء',
      'zen.gallery.programme.label':  'البرنامج والمقطع الطولي',

      /* Sentry */
      'sen.tag':         'مهني · مقياس صغير',
      'sen.type.val':    'جناح حراسة',
      'sen.body1':       'جناح حراسة في Casablanca Finance City، المنطقة المالية الكبرى المطوَّرة على أطراف الدار البيضاء. يؤدي المبنى وظيفته ضمن بصمة معمارية بالغة الضيق: مراقبة الوصول، والانتظار المسقوف، والحضور البصري الواضح الذي يُعلِّم عتبة الدخول إلى المجمع.',
      'sen.body2':       'يتموضع الجناح عند الحد الفاصل بين الطريق العام والحرم المحكوم، وتنبثق هندسته من هذه الحالة الانتقالية. تُعالَج التفاصيل الإنشائية بما يتناسب مع المقياس الحضري والمؤسساتي لـ Casablanca Finance City، بلوحة مواد مدمجة ومحيط سقفٍ مطوي يمنح المبنى صورة ذهنية دقيقة ومقروءة.',
      'sen.gallery.aerial.label':  'تجسيد، منظور جوي',
      'sen.gallery.section.label': 'المقطع B-B',

      /* Villa Papillon */
      'pap.tag':         'مهني · سكني',
      'pap.type.val':    'فيلا معاصرة',
      'pap.body1':       'فيلا معاصرة في المغرب لعميل خاص، مُنظَّمة حول فناء مركزي يجلب الضوء والتهوية إلى الداخل مع الحفاظ على الخصوصية من الشارع. يتكشّف المخطط من تسلسل دخول مضغوط نحو فضاءات معيشة رحبة تنفتح تدريجيًا نحو الحديقة والمسبح في الجهة الجنوبية، مما يُعايَر العلاقة بين الداخل وشبه الخارج والخارج وفق الإيقاعات اليومية للإشغال وحركة الشمس الموسمية.',
      'pap.body2':       'يستلهم اللغة المعمارية منطق الحيز الداخلي للعمارة المنزلية المغربية مع توظيف لوحة مواد معاصرة: هيكل خرسانة مسلحة مع طلاء أبيض، وحجر خام من المنطقة، وعناصر خشبية. صُمِّمت الفيلا وأُنتجت في Revit لدى Yassir Khalil Studio، وتولى حازم التطوير المعماري والتنسيق مع العميل من التصميم الأولي حتى رسومات التنفيذ.',

      /* Tamansourt */
      'tam.tag':         'مهني · رعاية صحية',
      'tam.type.val':    'حرم مستشفى ومركز صحة',
      'tam.body1':       'حرم مستشفى ومركز صحة في أطراف تمنصورت، مدينة مخططة في المنطقة الحضرية لمراكش. يجمع البرنامج بين مستشفى عام ومركز صحة متخصص ومرافق دعم تكميلية على موقع غير مستغل، مع تنظيم المخطط الرئيسي للسماح ببناء متدرج على مراحل مع الحفاظ على التماسك الوظيفي في كل مرحلة.',
      'tam.body2':       'تُهيكل الاقتراح المعماري الحرم حول عمود فقري مشجّر مركزي يربط مناطق الوصول والإدارة والرعاية الإكلينيكية في تسلسل مقروء. توجَّه أجنحة المرضى لتعظيم الضوء الطبيعي والتهوية مع تقليل الاكتساب الحراري في أشهر الصيف. يُفصل مركز الصحة عن المستشفى بفناء مزروع يخلق تمييزًا مكانيًا وتجريبيًا واضحًا بين البرنامجين.',
      'tam.gallery.aerial.label': 'تجسيد، منظور جوي للحرم',
      'tam.gallery.facade.label': 'تجسيد، واجهة على الشارع',

      /* Hay Mohammadi */
      'hay.tag':         'مهني · بنية تحتية',
      'hay.type.val':    'محطة RER',
      'hay.body1':       'محطة نقل سريع في حي حي محمدي بالدار البيضاء، أحد أقدم الأحياء الشعبية الأكثر كثافة في المدينة. تنغرس المحطة في نسيج حضري معقد وصُمِّمت لتكون بنية تحتية مدنية بمعنى مزدوج: وظيفيًا كعقدة نقل، ومكانيًا كعتبة عامة لحيّ ظل تاريخيًا يفتقر إلى الاستثمار في فضائه العام.',
      'hay.body2':       'يحلّ المشروع حالة موقع صعبة حيث يسير الخط السككي على مستوى الأرض عبر ممر حضري مقيَّد، مما يستدعي من مبنى المحطة التفاوضَ بين مستوى الرصيف وشبكة الشوارع القائمة. يُصمَّم الرواق المسقوف لامتداد الحياة الشارعية للحيّ داخل المحطة، إذ يخلق هيكل المظلة فضاءً عامًا مسقوفًا ناشطًا على مدار اليوم.',
      'hay.gallery.aerial.label':    'تجسيد، منظور جوي',
      'hay.gallery.structure.label': 'النظام الإنشائي',
      'hay.gallery.section.label':   'المقطع، الواجهة على الشارع',

      /* Al-Arg */
      'alarg.tag':         'أكاديمي · مذكرة تخرج',
      'alarg.type.val':    'إعادة تأهيل تراثي · قرية مهجورة',
      'alarg.body1':       'مذكرة تخرج حاصلة على أعلى تقدير بإجماع لجنة التحكيم في المدرسة الوطنية للهندسة المعمارية والتعمير، جامعة قرطاج، 2024. يقترح المشروع استراتيجية لإعادة تأهيل قرية ARG، وهي موطن مهجور في الداخل التونسي أخلاه سكانه خلال القرن العشرين تاركين وراءهم نسيجًا سليمًا لكنه آيل للتدهور من العمارة الحجرية العمرانية المحلية.',
      'alarg.body2':       'تعمل المذكرة في آنٍ واحد على ثلاثة مقاييس: تحليل إقليمي للأسباب التي أنتجت الهجران، واقتراح حضري لإعادة تنشيط القرية بوصفها موطنَ ذاكرة وثقافة وإقامة مؤقتة، وتدخلٌ معماري على مبنى محوري في النسيج. يستند البحث إلى نظريات كارلو سكاربا وجورجيو غراسي والمدرسة الإيطالية في المورفولوجيا الحضرية.',
      'alarg.body3':       'تأسّس المشروع على مسوحات ميدانية وتوثيق تراثي أُجري مع جمعية الحفاظ على قرية ARG على مدى عامين قبل المذكرة، مما أرسخ العمل التصميمي في معرفة مادية مباشرة بالموقع.',
      'alarg.distinction': 'أعلى تقدير · إجماع لجنة التحكيم · ENAU، جامعة قرطاج · يونيو 2024',
      'alarg.gallery.renders.label':   'تجسيدات، أجواء المشروع',
      'alarg.gallery.territory.label': 'الإقليم',
      'alarg.gallery.plans.label':     'المخططات، الوضع الراهن والمشروع',
      'alarg.gallery.structure.label': 'المقطع والأنظمة الإنشائية',

      /* Corallum */
      'cor.tag':         'أكاديمي · ثقافي',
      'cor.type.val':    'مركز بحث ومعارض',
      'cor.body1':       'مركز بحث ومعارض للمرجان على الساحل الشمالي التونسي، صُمِّم كمشروع أكاديمي في ENAU لاستكشاف العلاقة بين البنية التحتية العلمية والفضاء العام في مشهد ساحلي. يجمع البرنامج مختبر علم الأحياء البحرية وفضاء معارض للجمهور ومنصة خارجية للملاحظة والتعليم.',
      'cor.body2':       'يتنظّم المشروع حول العلاقة بين الماء والبر، مع تموضع المبنى على حافة البحر فوق رأس صخري. تنغرس مرافق البحث في التضاريس، مدفونةً جزئيًا للتحكم في الحرارة والضوء، في حين ترتفع فضاءات المعارض العامة فوق الصخر لتقديم إطلالات على البحر.',
      'cor.body3':       'طُوِّر المشروع عبر النمذجة المادية والرسم اليدوي جنبًا إلى جنب مع الإنتاج الرقمي، مستكشفًا الإمكانيات التكتونية لمبنى مشيَّد في مواد موقعه ومعها.',
      'cor.gallery.renders.label':        'تجسيدات',
      'cor.gallery.site.label':           'الموقع',
      'cor.gallery.volume.label':         'البحث الشكلي، الحجم',
      'cor.gallery.facade.label':         'البحث الشكلي، الواجهة',

      /* Cinephile */
      'cin.tag':         'أكاديمي · ثقافي',
      'cin.type.val':    'مجمع سينمائي',
      'cin.body1':       'مجمع سينمائي في وسط تونس، صُمِّم كمشروع أكاديمي في ENAU لاستكشاف نموذج المؤسسة الثقافية بوصفها قطعةً من النسيج الحضري. يستجيب المشروع لموقع عند تقاطع المدينة العتيقة والمدينة الاستعمارية، وهي حالة تستدعي مبنىً قادرًا على الحديث إلى قواعد حضرية مختلفة دون تفريغها في تركيب مصطنع.',
      'cin.body2':       'يوزّع البرنامج أربع قاعات سينمائية وسينماتيك وكافيه وفضاءات تداول عام في مبنى حضري في آنٍ ومنكفئ على ذاته. الفضاء العام الرئيسي هو شارع داخلي مسقوف يعبر المبنى من واجهة إلى أخرى، يمكن الوصول إليه خارج أوقات العروض ليكون اختصارًا عبر الحي.',
      'cin.body3':       'أُنجز المشروع في نهاية الحلقة الأولى في ENAU ويمثّل أول عمل تصميمي بالمقياس الحضري.',
      'cin.gallery.renders.label':   'تجسيدات، الفضاءات الداخلية',
      'cin.gallery.site.label':      'دراسة الموقع',
      'cin.gallery.sketches.label':  'رسوم مفاهيمية',
      'cin.gallery.plan.label':      'مخطط الطابق الأرضي N01',
      'cin.gallery.section.label':   'المقطع والواجهة',

      /* About */
      'about.label':     'نبذة',
      'about.role':      'مهندس معماري · التراث وإعادة التأهيل · ممارسة دولية',
      'about.bio1':      'مهندس معماري تخرج بأعلى تقدير (ENAU، 2026)، منجذب إلى عمارة القائم: المسكون والمتدهور والمغفَل. تمتد ممارستي عبر باريس والدار البيضاء وطوكيو، مدنٌ قرأت فيها كيف تحمل المباني الذاكرة وتقاوم المحو وتبقى راسخة في مكانها. أنا عازم على جعل إعادة تأهيل التراث تخصصي، وتعكس رحابة أعمالي هذا الالتزام على جميع المقاييس.',
      'about.exp.title': 'الخبرة',
      'about.edu.title': 'التكوين',
      'about.skills.title':  'المهارات',
      'about.lang.title':    'اللغات',
      'about.dist.title':    'التمييزات',
      'about.contact.title': 'التواصل',

      'about.exp1.title': 'Studio BELEM · باريس',
      'about.exp1.role':  'متدرب معماري · جارٍ',
      'about.exp1.note':  'مشاريع سكنية وثقافية وتأهيلية من الفكرة الأولى حتى رخصة البناء. إنتاج BIM كامل؛ تنسيق مع مهندسي الهياكل والمرافق؛ الإطار التنظيمي الفرنسي، PC، اشتراطات ABF، المباني المصنّفة.',
      'about.exp2.title': 'برنامج ساكورا للعلوم · اليابان',
      'about.exp2.role':  'جامعة ساغا وجامعة واسيدا · باحث مدعو · الممثل التونسي الوحيد',
      'about.exp2.note':  'اختيار دولي تنافسي بتمويل حكومي ياباني. ورش عمل مكثفة حول إعادة تأهيل الأحياء التاريخية وإعادة التوظيف التكيفي. تحليل مقارن: المدن العتيقة الشمال أفريقية والبيوت التقليدية اليابانية (machiya).',
      'about.exp2.award': 'أفضل بحث',
      'about.exp3.title': 'Yassir Khalil Studio · الدار البيضاء',
      'about.exp3.role':  'متدرب معماري · دوام كامل',
      'about.exp3.note':  'شارك في تأليف دراسة جدوى ومفهوم لمحور سككي إقليمي من نوع RER: التكامل الحضري، التنقل المتعدد الوسائط، التنسيق الإنشائي. مخرجات BIM في Revit؛ تنسيق مع السلطات البلدية المغربية ومكاتب الدراسات.',
      'about.exp4.title': '2ADP Salim Ben Rejeb Architectes · تونس',
      'about.exp4.role':  'متدرب معماري',
      'about.exp4.note':  'رسومات تقنية وتوثيق لمشاريع سكنية ومدنية (AutoCAD, ArchiCAD). تجسيدات لعروض العملاء.',
      'about.exp5.title': 'جمعية الحفاظ على قرية ARG · تونس',
      'about.exp5.role':  'متدرب ومتطوع',
      'about.exp5.note':  'مسوحات ميدانية وتقييم تراثي لقرية مهجورة، توثيق تأسيسي للمذكرة الحائزة على الجوائز.',

      'about.edu1.title':   'الدبلوم الوطني للمعمار (DNA) · معادل الماجستير',
      'about.edu1.inst':    'ENAU، جامعة قرطاج، تونس · 11 فبراير 2026',
      'about.edu1.note':    'مذكرة: بين شعرية المكان وقيمة التراث',
      'about.edu1.mention': 'أعلى تقدير',
      'about.edu2.title':   'مذكرة تخرج معمارية',
      'about.edu2.inst':    'ENAU، جامعة قرطاج · 14 يونيو 2024',
      'about.edu2.note':    'لجنة تحكيم بالإجماع',
      'about.edu2.mention': 'أعلى تقدير',
      'about.edu3.title':   'دبلوم الحلقة الأولى · معادل الليسانس',
      'about.edu3.inst':    'ENAU، جامعة قرطاج، تونس',
      'about.edu3.note':    'بامتياز',

      'about.skill.bim': 'BIM والتصميم',
      'about.skill.vis': 'التصوير المعماري',
      'about.skill.doc': 'التوثيق',
      'about.skill.mot': 'الحركة',

      'about.lang.arabic':  'العربية',
      'about.lang.french':  'الفرنسية',
      'about.lang.english': 'الإنجليزية',
      'about.lang.native':  'اللغة الأم',
      'about.lang.fluent':  'طلاقة',

      'about.dist1.title': 'أعلى تقدير · إجماع لجنة التحكيم',
      'about.dist1.sub':   'الدبلوم الوطني للمعمار · ENAU، جامعة قرطاج',
      'about.dist2.title': 'جائزة أفضل بحث',
      'about.dist2.sub':   'برنامج ساكورا للعلوم · جامعة ساغا وجامعة واسيدا، اليابان',
      'about.dist3.title': 'المرتبة الثانية · مسابقة',
      'about.dist3.sub':   'محطة زناتة · شبكة السكك الحديدية الحضرية، الدار البيضاء، المغرب',
      'about.dist4.title': 'أعلى تقدير · إجماع لجنة التحكيم',
      'about.dist4.sub':   'مذكرة تخرج · ENAU، جامعة قرطاج',

      'contact.name.label':    'الاسم',
      'contact.name.ph':       'اسمك',
      'contact.email.label':   'البريد الإلكتروني',
      'contact.email.ph':      'بريدك@مثال.com',
      'contact.subject.label': 'الموضوع',
      'contact.subject.ph':    'عمَّ يتعلق الأمر؟',
      'contact.message.label': 'الرسالة',
      'contact.message.ph':    'رسالتك…',
      'contact.send':          'إرسال',

      /* Books */
      'books.label': 'منشورات',
      'books.title': 'منشورات',
      'books.sub':   'مذكرة تخرج معمارية وتقرير تدريب، أُنجزا بين عامَي 2024 و2026.',
      'books.thesis.tag':   'أكاديمي · مذكرة تخرج · 2024',
      'books.thesis.title': 'بين شعرية المكان\nوقيمة التراث',
      'books.thesis.sub':   'لإحياء روح قرية الأرق، حمّة الجريد',
      'books.thesis.inst.label':  'المؤسسة',
      'books.thesis.inst.val':    'ENAU · جامعة قرطاج',
      'books.thesis.super.label': 'المشرفون',
      'books.thesis.super.val':   'أ. منصف الفوراتي · أ. عدنان بن نجمة',
      'books.thesis.dist.label':  'التميّز',
      'books.thesis.dist.val':    'Mention Très Bien بالإجماع · يونيو 2024',
      'books.thesis.body1': 'مذكرة تخرج في الهندسة المعمارية مُقدَّمة إلى المدرسة الوطنية للهندسة المعمارية والتعمير بتونس، جامعة قرطاج. حازت على أعلى تقدير بإجماع لجنة التحكيم. يقترح المشروع استراتيجية لإعادة تأهيل قصر قرية ARG المهجورة في منظومة واحة الجريد بتونس الجنوبية، عاملاً في آنٍ واحد على المقاييس الإقليمية والحضرية والمعمارية.',
      'books.thesis.body2': 'يستند البحث إلى توثيق تراثي أُجري مع جمعية الحفاظ على قرية ARG على مدى عامين قبل المذكرة، مما أرسخ العمل التصميمي في معرفة مادية مباشرة بالموقع. يُشرِّك الإطار النظري المدرسةَ الإيطالية في المورفولوجيا الحضرية وممارسات كارلو سكاربا وجورجيو غراسي.',
      'books.thesis.body3': 'أعلى تقدير · إجماع لجنة التحكيم · ENAU، جامعة قرطاج · يونيو 2024',
      'books.thesis.cta':   'قراءة المذكرة',
      'books.thesis.open':  'فتح',
      'books.report.tag':   'مهني · تقرير تدريب · 2026',
      'books.report.title': 'تقرير التدريب',
      'books.report.sub':   'ممارسة مهنية عبر باريس والدار البيضاء وطوكيو',
      'books.report.host.label':     'المؤسسات المضيفة',
      'books.report.host.val':       'Studio BELEM، باريس · Yassir Khalil Studio، الدار البيضاء',
      'books.report.research.label': 'البحث',
      'books.report.research.val':   'برنامج ساكورا للعلوم، طوكيو · جائزة أفضل بحث · 2025',
      'books.report.super.label':    'المشرف',
      'books.report.super.val':      'أ. منصف الفوراتي · فبراير 2026',
      'books.report.body1': 'تقرير تدريب يوثّق الممارسة المعمارية المهنية عبر ثلاث مدن بين عامَي 2024 و2026. يغطي التقرير أعمال المشاريع في Studio BELEM بباريس — إعادة التأهيل السكني والمتعدد الاستخدامات والتراثي ضمن الإطار التنظيمي ABF — وفي Yassir Khalil Studio بالدار البيضاء، عبر برامج البنية التحتية والسكن والرعاية الصحية.',
      'books.report.body2': 'يخصَّص فصل للبحث المُجرى في إطار برنامج ساكورا للعلوم باليابان عام 2025، الذي حاز جائزة أفضل بحث. يُقدَّم التقرير استيفاءً جزئيًا لمتطلبات الدبلوم الوطني للمعمار في ENAU، جامعة قرطاج.',
      'books.report.cta':   'قراءة التقرير',
      'books.report.open':  'فتح',

      /* Videos */
      'videos.label': 'أعمال متحركة',
      'videos.title': 'فيديوهات',
      'videos.sub':   'تجسيدات معمارية ورسوم متحركة أُنتجت بالتوازي مع تطوير المشاريع.',
      'videos.sentry.tag':   'مهني · مقياس صغير · المغرب · 2024',
      'videos.sentry.title': 'Sentry',
      'videos.sentry.desc':  'جناح حراسة في Casablanca Finance City. رسوم متحركة تستكشف حالة العتبة بين الاقتراب العام والوصول المحكوم.',
      'videos.sidi.tag':     'مهني · بنية تحتية · المغرب · 2025',
      'videos.sidi.title':   'محطة سيدي معروف',
      'videos.sidi.desc':    'رسوم متحركة لمحطة RER سيدي معروف، هيكل المظلة وتدفقات الركاب والاندماج الحضري في الشبكة السككية الحضرية للدار البيضاء.',
      'videos.zenata.tag':   'مهني · بنية تحتية · المغرب · 2025',
      'videos.zenata.title': 'محطة زناتة',
      'videos.zenata.desc':  'رسوم متحركة معمارية للمحطة السككية الإقليمية بزناتة، الرواق المسقوف والمظلة الإنشائية والوصلات المتعددة الوسائط على أطراف الدار البيضاء.',
    }

  }; /* end T */


  /* ─────────────────────────────────────────────────────────
     STATE
  ───────────────────────────────────────────────────────── */
  var currentLang = 'en';
  var LANGS = ['en', 'fr', 'ar'];

  /* ─────────────────────────────────────────────────────────
     STORAGE
  ───────────────────────────────────────────────────────── */
  function saveLang(lang) {
    try { localStorage.setItem('hr-lang', lang); } catch (e) {}
  }
  function loadLang() {
    try { return localStorage.getItem('hr-lang') || 'en'; } catch (e) { return 'en'; }
  }

  /* ─────────────────────────────────────────────────────────
     ARABIC FONT LOADER
  ───────────────────────────────────────────────────────── */
  var arabicFontsLoaded = false;
  function loadArabicFonts() {
    if (arabicFontsLoaded) return;
    arabicFontsLoaded = true;
    var link = document.createElement('link');
    link.rel  = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=IBM+Plex+Sans+Arabic:wght@300;400&display=swap';
    document.head.appendChild(link);
  }

  /* ─────────────────────────────────────────────────────────
     DOM TRANSLATION
  ───────────────────────────────────────────────────────── */
  function translate(lang) {
    var t = T[lang] || T.en;

    /* Text content */
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) el.textContent = t[key];
    });

    /* Placeholders */
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-ph');
      if (t[key] !== undefined) el.placeholder = t[key];
    });

    /* aria-label */
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-aria');
      if (t[key] !== undefined) el.setAttribute('aria-label', t[key]);
    });
  }

  /* ─────────────────────────────────────────────────────────
     RTL / LANG CLASS
  ───────────────────────────────────────────────────────── */
  function applyDir(lang) {
    var html = document.documentElement;
    LANGS.forEach(function (l) { html.classList.remove('lang-' + l); });
    html.classList.add('lang-' + lang);

    if (lang === 'ar') {
      html.setAttribute('dir', 'rtl');
      html.setAttribute('lang', 'ar');
      loadArabicFonts();
    } else {
      html.setAttribute('dir', 'ltr');
      html.setAttribute('lang', lang === 'fr' ? 'fr' : 'en');
    }
  }

  /* ─────────────────────────────────────────────────────────
     LANGUAGE TOGGLE BUTTON — build and inject
  ───────────────────────────────────────────────────────── */
  function buildToggle() {
    /* Avoid double-injection */
    if (document.getElementById('hr-lang-toggle')) return;

    var toggle = document.createElement('div');
    toggle.className = 'lang-toggle';
    toggle.id = 'hr-lang-toggle';
    toggle.setAttribute('role', 'group');
    toggle.setAttribute('aria-label', 'Language selector');

    /* Main button */
    var btn = document.createElement('button');
    btn.className = 'lang-toggle__btn';
    btn.type = 'button';
    btn.setAttribute('aria-haspopup', 'listbox');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', 'hr-lang-menu');

    var label = document.createElement('span');
    label.className = 'lang-toggle__label';
    label.textContent = currentLang.toUpperCase();

    var chevron = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    chevron.setAttribute('class', 'lang-toggle__arrow');
    chevron.setAttribute('viewBox', '0 0 10 6');
    chevron.setAttribute('fill', 'none');
    chevron.setAttribute('aria-hidden', 'true');
    chevron.setAttribute('width', '10');
    chevron.setAttribute('height', '6');
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    path.setAttribute('points', '1,1 5,5 9,1');
    path.setAttribute('stroke', 'currentColor');
    path.setAttribute('stroke-width', '1.3');
    path.setAttribute('stroke-linecap', 'square');
    path.setAttribute('stroke-linejoin', 'miter');
    chevron.appendChild(path);

    btn.appendChild(label);
    btn.appendChild(chevron);

    /* Dropdown menu */
    var menu = document.createElement('ul');
    menu.id = 'hr-lang-menu';
    menu.className = 'lang-toggle__menu';
    menu.setAttribute('role', 'listbox');
    menu.setAttribute('aria-label', 'Select language');

    var labels = { en: 'EN', fr: 'FR', ar: 'AR' };
    LANGS.forEach(function (lang) {
      var li = document.createElement('li');
      li.setAttribute('role', 'none');
      var opt = document.createElement('button');
      opt.type = 'button';
      opt.className = 'lang-toggle__option' + (lang === currentLang ? ' is-active' : '');
      opt.setAttribute('role', 'option');
      opt.setAttribute('aria-selected', lang === currentLang ? 'true' : 'false');
      opt.setAttribute('data-lang', lang);
      opt.textContent = labels[lang];
      opt.addEventListener('click', function () {
        switchLang(lang);
        closeToggle(toggle, btn);
      });
      li.appendChild(opt);
      menu.appendChild(li);
    });

    toggle.appendChild(btn);
    toggle.appendChild(menu);

    /* Toggle open/close */
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = toggle.classList.contains('is-open');
      if (isOpen) {
        closeToggle(toggle, btn);
      } else {
        openToggle(toggle, btn);
      }
    });

    /* Close on outside click */
    document.addEventListener('click', function () {
      closeToggle(toggle, btn);
    });

    /* Close on Escape */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeToggle(toggle, btn);
    });

    /* Inject into nav — before the hamburger if it exists */
    var nav = document.querySelector('header.nav');
    if (!nav) return;

    var burger = nav.querySelector('.nav__burger');
    if (burger) {
      nav.insertBefore(toggle, burger);
    } else {
      nav.appendChild(toggle);
    }

    /* Also inject into hero nav on homepage */
    var heroNav = document.querySelector('.hero__nav ul');
    if (heroNav) {
      var heroToggle = buildHeroToggle();
      var heroLi = document.createElement('li');
      heroLi.appendChild(heroToggle);
      heroLi.classList.add('hero__nav-lang-li');
      heroNav.appendChild(heroLi);
    }
  }

  function buildHeroToggle() {
    var wrap = document.createElement('div');
    wrap.className = 'hero__lang-wrap';

    var labels = { en: 'EN', fr: 'FR', ar: 'AR' };
    LANGS.forEach(function (lang) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'hero__lang-btn' + (lang === currentLang ? ' is-active' : '');
      btn.setAttribute('data-hero-lang', lang);
      btn.textContent = labels[lang];
      btn.addEventListener('click', function () {
        switchLang(lang);
        document.querySelectorAll('.hero__lang-btn').forEach(function (b) {
          b.classList.toggle('is-active', b.getAttribute('data-hero-lang') === lang);
        });
      });
      wrap.appendChild(btn);
    });
    return wrap;
  }

  function openToggle(toggle, btn) {
    toggle.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
    /* Focus first option */
    var first = toggle.querySelector('.lang-toggle__option');
    if (first) setTimeout(function () { try { first.focus(); } catch (e) {} }, 10);
  }

  function closeToggle(toggle, btn) {
    toggle.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
  }

  function updateToggleLabel(lang) {
    var label = document.querySelector('.lang-toggle__label');
    if (label) label.textContent = lang.toUpperCase();

    document.querySelectorAll('.lang-toggle__option').forEach(function (opt) {
      var isActive = opt.getAttribute('data-lang') === lang;
      opt.classList.toggle('is-active', isActive);
      opt.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    document.querySelectorAll('.mobile-menu__lang-btn').forEach(function (btn) {
      var isActive = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('is-active', isActive);
    });

    document.querySelectorAll('.hero__lang-btn').forEach(function (btn) {
      var isActive = btn.getAttribute('data-hero-lang') === lang;
      btn.classList.toggle('is-active', isActive);
    });
  }

  /* ─────────────────────────────────────────────────────────
     MOBILE MENU INTEGRATION
  ───────────────────────────────────────────────────────── */
  function injectMobileLangToggle() {
    var menu = document.getElementById('mobile-menu');
    if (!menu) return;
    if (menu.querySelector('.mobile-menu__lang')) return; /* already injected */

    var wrap = document.createElement('div');
    wrap.className = 'mobile-menu__lang';

    var labels = { en: 'EN', fr: 'FR', ar: 'AR' };
    LANGS.forEach(function (lang) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'mobile-menu__lang-btn' + (lang === currentLang ? ' is-active' : '');
      btn.setAttribute('data-lang', lang);
      btn.textContent = labels[lang];
      btn.addEventListener('click', function () { switchLang(lang); });
      wrap.appendChild(btn);
    });

    /* Insert before the footer links block */
    var divider = menu.querySelector('.mobile-menu__divider');
    if (divider) {
      menu.insertBefore(wrap, divider);
    } else {
      menu.appendChild(wrap);
    }
  }

  /* ─────────────────────────────────────────────────────────
     SWITCH LANGUAGE
  ───────────────────────────────────────────────────────── */
  function switchLang(lang) {
    if (!T[lang]) return;
    currentLang = lang;
    saveLang(lang);
    translate(lang);
    applyDir(lang);
    updateToggleLabel(lang);
  }

  /* ─────────────────────────────────────────────────────────
     INIT
  ───────────────────────────────────────────────────────── */
  function init() {
    currentLang = loadLang();
    buildToggle();
    translate(currentLang);
    applyDir(currentLang);

    /* Mobile menu is built async by main.js; wait a tick */
    setTimeout(function () {
      injectMobileLangToggle();
      translate(currentLang); /* re-apply to catch mobile menu items */
    }, 80);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
