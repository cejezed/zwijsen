
export const BRAND_NAME = "ARCHITECTENBUREAU JULES ZWIJSEN";
export const PHONE_NUMBER = "+31 (0) 6 44 97 62 09";
export const PHONE_LINK = "tel:+31644976209";
export const WHATSAPP_LINK = "https://wa.me/31644976209";
export const EMAIL = "info@zwijsen.net";
export const ADDRESS = {
  street: "Bastertlaan 3",
  city: "3632JH Loenen aan de Vecht",
  country: "Nederland"
};

import type { HeroSlide } from './data/types';

export const HERO_SLIDES: HeroSlide[] = [
  {
    url: "/images/vrijstaande moderne villa architect bouwgrond kavel zandvoort.jpg",
    title: "BOUW ZONDER ZORGEN.",
    subtitle: "Van eerste schets tot de laatste steen: wij regelen alles voor u."
  },
  {
    url: "/images/moderne rieten kap villa architect ontwerp moderne-rietkap-woning-glazen-gevel-gezinsleven.jpg",
   title: "UW DROOM, ONZE REGIE.",
    subtitle: "Wij vertalen uw persoonlijke woonwensen naar een haalbaar en uniek ontwerp."
  },
  {
    url: "/images/architekt moderne villa in het bos luxe bosvilla architect glazen paviljoen 6.png",
    title: "RUST EN OVERZICHT.",
    subtitle: "Geen verrassingen in budget of proces. Alleen puur woongenot vanaf de eerste dag."
  }
];

export const VISION_PILLARS = [
  {
    id: "01",
    title: "Visie",
    subtitle: "Van binnenuit ontwerpen",
    text: "Wij ontwerpen altijd van binnen naar buiten. Ruimtes worden eerst functioneel geordend, waarna de omgeving betrokken wordt tot een veilige haven.",
    quote: "Uw interieur als persoonlijke haven.",
    img: "/images/interieur luxe villa achterhoek vrijstaand landhuis architect.jpg"
  },
  {
    id: "02",
    title: "Ordening",
    subtitle: "Explosieve ruimtelijkheid",
    text: "Open vides, glasopeningen in binnenwanden en zichtlijnen versterken de relaties tussen ruimtes zonder dat de rust verloren gaat.",
    quote: "Zichtlijnen die de ruimte verbinden.",
    img: "/images/verbouw_villa_zandvoort_moderne_villa_in_de_duinen_architect_zandvoort.jpg"
  },
  {
    id: "03",
    title: "Licht",
    subtitle: "Natuurlijk welbevinden",
    text: "Licht geeft een gevoel van welbehagen en zorgt voor contact met de buitenwereld. De zon ervaren is essentieel voor mens en milieu.",
    quote: "Een waterval aan daglicht.",
    img: "/images/architect_almere_bouwgrond_kavel_villa_kreekbos.jpg"
  },
  {
    id: "04",
    title: "Materialen",
    subtitle: "Verfijning & Balans",
    text: "Beeldbepalende constructies zoals zichtbare houten spanten of ruw metselwerk maken het contrast spannend.",
    quote: "Balans tussen ruw en afgewerkt.",
    img: "/images/verbouw_boerderij_amstelland_luxe_interieur_oude_materialen_ontwerp.jpg"
  }
];

export const PROCESS_STEPS = [
  {
    id: "01",
    title: "Kennismaking",
    subtitle: "Wensen & Levensritme",
    duration: "1-2 weken",
    description: "Een persoonlijk gesprek waarin ik uw wensen, stijl en levensritme leer kennen. Ter plaatse voel ik wat de kavel of bestaande woning vraagt. De start van uw ontwerp op maat – na dit gesprek weet u precies waar u aan toe bent en of er een klik is.",
    deliverables: ["Intakegesprek", "Locatie-analyse", "Budgetindicatie"],
    img: "/images/kennismaking_architect_werkwijze_kosten.jpg"
  },
  {
    id: "02",
    title: "Schetsontwerp",
    subtitle: "Inspiratie & Concept",
    duration: "4-6 weken",
    description: "Ik vertaal uw woonwensen naar een krachtig concept dat functioneert én inspireert. Een ontwerp waar u blij van wordt en wat energie geeft! Duidelijke schetsen en 3D visualisaties helpen u het eindresultaat al te ervaren.",
    deliverables: ["3D visualisaties", "Plattegronden", "Materiaalkeuze"],
    img: "/images/schetsontwerp_architect_moderne_villa_zandvoort_duinen.jpg"
  },
  {
    id: "03",
    title: "Voorlopig Ontwerp",
    subtitle: "Prijsvorming & Regie",
    duration: "3-4 weken",
    description: "De eerste set werkbare tekeningen gaat naar aannemers, constructeurs en installatie adviseurs. Ik regel de offertes en eventueel vooroverleg met de gemeente. Zo weet u tijdig wat het écht gaat kosten – en kunnen we bijsturen voordat het te laat is.",
    deliverables: ["Bouwtekeningen", "Offerteaanvraag", "Kostenraming"],
    img: "/images/bouwkundige_tekening_patio_villa_achterhoek.jpg"
  },
  {
    id: "04",
    title: "Definitief Ontwerp",
    subtitle: "Detail & Verfijning",
    duration: "6-8 weken",
    description: "Uw nieuwe thuis krijgt vorm tot in detail. Ik zorg dat alles klopt: qua ruimte, uitstraling én afwerking. U krijgt een bouwrijp dossier waar aannemers direct mee aan de slag kunnen.",
    deliverables: ["Technische tekeningen", "Constructieberekeningen", "Vergunningsdossier"],
    img: "/images/verbouw_boerderij_amstelland_luxe_interieur_oude_materialen_ontwerp.jpg"
  },
  {
    id: "05",
    title: "Bouwvoorbereiding",
    subtitle: "Zekerheid op Papier",
    duration: "2-4 weken",
    description: "Alles uitgebreid op papier: een complete set tekeningen, gedetailleerde omschrijvingen en heldere afspraken met de aannemer. Voor de bouw begint, weet iedereen exact wat er gebouwd wordt, hoe het eruit ziet en wat het kost. Geen verrassingen.",
    deliverables: ["Bestek & beschrijving", "Uitvoeringstekeningen", "Aannemersovereenkomst"],
    img: "/images/architect_almere_bouwgrond_kavel_villa_kreekbos.jpg"
  },
  {
    id: "06",
    title: "Bouwbegeleiding",
    subtitle: "Kwaliteit & Controle",
    duration: "6-18 maanden",
    description: "Ik ben wekelijks op de bouw, zodat u dat niet hoeft te zijn. Kwaliteitscontrole op elke fase, direct contact met aannemers, en uw belangen voorop. Rust en vertrouwen tijdens de realisatie.",
    deliverables: ["Wekelijks bouwtoezicht", "Kwaliteitscontrole", "Directievoering"],
    img: "/images/combinatie_steen_houten_lamellen_pleisterwerk_luxe_villa_lelystad_architect.jpg"
  },
  {
    id: "07",
    title: "Oplevering",
    subtitle: "Uw Droom Gerealiseerd",
    duration: "Het eindresultaat",
    description: "Een bijzonder moment: uw woning is klaar. Samen lopen we door uw nieuwe thuis, checken elk detail, en pas bij de sleuteloverdracht ben ik tevreden. Een resultaat dat u elke dag opnieuw laat glimlachen.",
    deliverables: ["Eindoplevering", "Sleuteloverdracht", "Nazorg"],
    img: "/images/interieur luxe villa achterhoek vrijstaand landhuis architect.jpg",
    isLast: true
  }
];

export const SERVICES = [
  {
    title: "Architectuur",
    description: "Nieuwbouw en complexe verbouwingen. Van stedelijke villa's tot landelijke hofwoningen.",
    features: ["Nieuwbouw", "Verbouw", "Uitbreiding"]
  },
  {
    title: "Interieur & Licht",
    description: "We ontwerpen van binnen naar buiten. Maatwerk interieurs en daglichtplannen als fundament.",
    features: ["Interieurontwerp", "Lichtplan", "Materiaalkeuze"]
  },
  {
    title: "Projectregie",
    description: "Vergunningen, aannemersselectie en toezicht op de bouw. Eén aanspreekpunt, van schets tot sleutel.",
    features: ["Vergunningen", "Bouwbegeleiding", "Oplevering"]
  }
];

export const IMAGES = {
  blueprint: "/images/interieur luxe villa achterhoek vrijstaand landhuis architect.jpg",
  living_room: "/images/verbouw_villa_zandvoort_moderne_villa_in_de_duinen_architect_zandvoort.jpg",
  stairs: "/images/architect_almere_bouwgrond_kavel_villa_kreekbos.jpg",
  window_view: "/images/architect_almere_bouwgrond_kavel_villa_kreekbos.jpg",
  wood_detail: "/images/verbouw_boerderij_amstelland_luxe_interieur_oude_materialen_ontwerp.jpg",
  facade_modern: "/images/combinatie_steen_houten_lamellen_pleisterwerk_luxe_villa_lelystad_architect.jpg",
  portrait: "/images/jules-zwijsen.jpg", 
  villa_forest: "/images/combinatie_steen_houten_lamellen_pleisterwerk_luxe_villa_lelystad_architect.jpg",
  minimalist_glass: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=2000&auto=format&fit=crop",
  interior_luxe: "/images/interieur luxe villa achterhoek vrijstaand landhuis architect.jpg"
};

// Helper: probeer een lokale bestandsnaam te leveren voor een image key of URL.
// Geeft `/images/<key>.jpg` terug wanneer de waarde overeenkomt met een sleutel in IMAGES,
// anders valt het terug op een conservatieve bestandsnaam gebaseerd op een hash.
export const imageLocal = (value: string) => {
  const entry = Object.entries(IMAGES).find(([, v]) => v === value);
  if (entry) return `/images/${entry[0]}.jpg`;
  // fallback: probeer een eenvoudige bestandsnaam op basis van laatste path-segment
  try {
    const u = new URL(value);
    const seg = u.pathname.split('/').pop() || 'image';
    const clean = seg.split('?')[0].replace(/[^a-zA-Z0-9-_\.]/g, '_');
    return `/images/${clean}`;
  } catch (e) {
    return `/images/image.jpg`;
  }
};

export const PROJECTS = [
  {
    id: 3,
    title: "Moderne Rietkapvilla",
    location: "'t Gooi",
    slug: "moderne-rietkapvilla-het-gooi",
    image: "https://www.zwijsen.net/wp-content/uploads/2025/11/architect-luxe-villa-blaricum-moderne-rietkapvilla-keldergarage-sousterrain.jpg",
    size: "wide" as const,
    year: "2025",
    area: "450m²",
    tag: "Nieuwbouw",
    description: "Een strakke interpretatie van de Gooise villa: tijdloze klasse, maximale lichtbeleving en een discreet geïntegreerd souterrain.",
    gallery: [
      "https://www.zwijsen.net/wp-content/uploads/2025/11/architect-luxe-villa-blaricum-moderne-rietkapvilla-keldergarage-sousterrain.jpg",
      "https://www.zwijsen.net/wp-content/uploads/2025/11/modern-interieur-villa-architect-interieur-luxe-villa-vide-hoog-plafond-hout.jpg",
      "https://www.zwijsen.net/wp-content/uploads/2025/11/uitkragende-rietkapvilla-sousterrain-garage.jpg"
    ]
  },
  {
    id: 2,
    title: "Levensloopbestendige Seniorenwoningen",
    location: "Loenen aan de Vecht",
    slug: "levensloopbestendige-seniorenwoningen-loenen-aan-de-vecht",
    image: "https://www.zwijsen.net/wp-content/uploads/2025/12/circulair-gebouwde-houten-schuurwoning-gevel.jpg",
    size: "portrait" as const,
    year: "2025",
    area: "9 woningen",
    tag: "Nieuwbouw",
    description: "Transformatie van 12 recreatiewoningen naar 9 energieneutrale, circulaire seniorenwoningen. Architectuur met tijdloze klasse.",
    gallery: [
      "https://www.zwijsen.net/wp-content/uploads/2025/12/circulair-gebouwde-houten-schuurwoning-gevel.jpg",
      "https://www.zwijsen.net/wp-content/uploads/2025/12/architect-schuurwoning-eikenhouten-constructie.jpg",
      "https://www.zwijsen.net/wp-content/uploads/2025/12/levensloopbestendig-woningbouw-project-overzicht.jpg"
    ]
  },
  {
    id: 1,
    title: "Transparante Bosvilla",
    location: "Rhenen",
    slug: "transparante-bosvilla-rhenen",
    image: "https://www.zwijsen.net/wp-content/uploads/2025/11/moderne-bosvilla-architect-moderne-woning-4.jpg",
    size: "landscape" as const,
    year: "2025",
    area: "N.N.B.",
    tag: "Nieuwbouw",
    description: "Glasarchitectuur voor maximale natuurbeleving: wonen met het bos als decor, het hele jaar door.",
    gallery: [
      "https://www.zwijsen.net/wp-content/uploads/2025/11/moderne-bosvilla-architect-moderne-woning-4.jpg",
      "https://www.zwijsen.net/wp-content/uploads/2025/11/moderne-bosvilla-architect-moderne-woning-3.jpg",
      "https://www.zwijsen.net/wp-content/uploads/2025/11/moderne-bosvilla-architect-moderne-woning-5.jpg"
    ]
  },
  {
    id: 4,
    title: "Villa Gameren",
    location: "Gameren",
    slug: "villa-gameren",
    image: "https://www.zwijsen.net/wp-content/uploads/2025/11/luxe-villa-rietkap-modern-architectuur-gameren.jpg",
    size: "square" as const,
    year: "2025",
    area: "N.N.B.",
    tag: "Nieuwbouw",
    description: "Moderne architectuur met rieten kap en maximale privacy — ontworpen als strategisch antwoord op inkijk, bezonning en uitzicht.",
    gallery: [
      "https://www.zwijsen.net/wp-content/uploads/2025/11/luxe-villa-rietkap-modern-architectuur-gameren.jpg",
      "https://www.zwijsen.net/wp-content/uploads/2025/11/architect-kavel-analyse-inkijk-bezonningsplan.jpg",
      "https://www.zwijsen.net/wp-content/uploads/2025/11/modern-interieur-luxe-villa-architect.jpg"
    ]
  },
  {
    id: 5,
    title: "Verbouw luxe villa in Zandvoort",
    location: "Zandvoort",
    slug: "verbouw-luxe-villa-zandvoort",
    image: "https://www.zwijsen.net/wp-content/uploads/2022/10/moderne-villa-architect-art-of-living-verbouw-1.jpg",
    size: "portrait" as const,
    year: "2022",
    area: "N.N.B.",
    tag: "Verbouw",
    description: "Transformatie van bestaande kustwoning tot hoogwaardige familievilla met eigentijds comfort, ruimtelijke rust en duurzame techniek.",
    gallery: [
      "https://www.zwijsen.net/wp-content/uploads/2022/10/moderne-villa-architect-art-of-living-verbouw-1.jpg",
      "https://www.zwijsen.net/wp-content/uploads/2022/10/duinvilla-zandvoort-modern-duinen-architect-4.jpg",
      "https://www.zwijsen.net/wp-content/uploads/2022/10/interieur-architect-villa-aan-zee.jpg.jpg"
    ]
  },
  {
    id: 6,
    title: "Luxe villa met uitzicht in Waterrijk Woerden",
    location: "Waterrijk Woerden",
    slug: "luxe-villa-uitzicht-waterrijk-woerden",
    image: "https://www.zwijsen.net/wp-content/uploads/2025/06/luxe-villa-architect-woerden-waterrijk-special-villa.jpg",
    size: "wide" as const,
    year: "N.N.B.",
    area: "N.N.B.",
    tag: "Nieuwbouw",
    description: "Bijzondere woning ontworpen voor een unieke waterkavel met 'special'-voorwaarden: uitgesproken architectuur, maximale zichtlijnen en toekomstbestendig comfort.",
    gallery: [
      "https://www.zwijsen.net/wp-content/uploads/2025/06/luxe-villa-architect-woerden-waterrijk-special-villa.jpg",
      "https://www.zwijsen.net/wp-content/uploads/2022/10/luxe-villa-architect-woerden-uitzicht-derde-verdieping.jpg",
      "https://www.zwijsen.net/wp-content/uploads/2022/10/luxe-villa-architect-woerden-maatwerk-interieur.jpg"
    ]
  },
  {
    id: 7,
    title: "Modern paviljoen aan het water",
    location: "Reeuwijk",
    slug: "modern-paviljoen-water-reeuwijk",
    image: "https://www.zwijsen.net/wp-content/uploads/2025/11/Luxe-Villa-Aan-Het-Water-Architect-Waterkavel-2.jpg",
    size: "landscape" as const,
    year: "N.N.B.",
    area: "N.N.B.",
    tag: "Nieuwbouw",
    description: "Strak, horizontaal paviljoen met maximale glastransparantie en een strategisch verhoogde begane grond voor kelderbouw en hoogwaterbescherming — ontworpen voor panoramisch uitzicht en privacy.",
    gallery: [
      "https://www.zwijsen.net/wp-content/uploads/2025/11/Luxe-Villa-Aan-Het-Water-Architect-Waterkavel-2.jpg",
      "https://www.zwijsen.net/wp-content/uploads/2025/11/Luxe-Villa-Aan-Het-Water-Architect-Waterkavel-1.jpg",
      "https://www.zwijsen.net/wp-content/uploads/2025/11/Luxe-Villa-Aan-Het-Water-Architect-Waterkavel-3.jpg"
    ]
  },
  {
    id: 8,
    title: "Moderne vernieuwbouwvilla met uitzicht op groen",
    location: "Lelystad",
    slug: "moderne-vernieuwbouwvilla-uitzicht-groen-lelystad",
    image: "https://www.zwijsen.net/wp-content/uploads/2022/10/01_resize.jpg",
    size: "square" as const,
    year: "N.N.B.",
    area: "N.N.B.",
    tag: "Vernieuwbouw",
    description: "Licht, ruimte en zichtlijnen bepalen deze unieke woning in de Flevopolder — gebouwd op de bestaande fundering, met een verrassend lichte kelder en wellnessgerichte leefkwaliteit.",
    gallery: [
      "https://www.zwijsen.net/wp-content/uploads/2022/10/01_resize.jpg",
      "https://www.zwijsen.net/wp-content/uploads/2022/10/12_resize.jpg",
      "https://www.zwijsen.net/wp-content/uploads/2025/07/71_resize.jpg"
    ]
  },
  {
    id: 9,
    title: "Herbestemming boerderij: oud erfgoed in een modern jasje",
    location: "Laag Keppel, Achterhoek",
    slug: "herbestemming-boerderij-laag-keppel-achterhoek",
    image: "https://www.zwijsen.net/wp-content/uploads/2022/10/280_2160_resize.jpg",
    size: "wide" as const,
    year: "N.N.B.",
    area: "N.N.B.",
    tag: "Herbestemming",
    description: "Een karakteristieke boerderij in het IJssellandschap is getransformeerd tot een comfortabele, toekomstbestendige woning — met respect voor het verleden en een duidelijke, eigentijdse uitbreiding.",
    gallery: [
      "https://www.zwijsen.net/wp-content/uploads/2022/10/280_2160_resize.jpg",
      "https://www.zwijsen.net/wp-content/uploads/2022/10/Mast-Laag-Keppel-06.jpg",
      "https://www.zwijsen.net/wp-content/uploads/2025/06/boerderij-uitbouw-moderne-architectuur3.jpg"
    ]
  },
  {
    id: 10,
    title: "Moderne villa met rieten kap in Blaricum",
    location: "Blaricum, 't Gooi",
    slug: "moderne-villa-rieten-kap-blaricum",
    image: "https://www.zwijsen.net/wp-content/uploads/2022/10/2025-04-12-10.10.47_resize.jpg",
    size: "wide" as const,
    year: "N.N.B.",
    area: "N.N.B.",
    tag: "Nieuwbouw",
    description: "Een stijlvolle woning die volledig opgaat in de bosrijke omgeving van 't Gooi en tegelijk een krachtig eigentijds statement maakt — met riet, pleisterwerk, hout en glas in perfect contrast.",
    gallery: [
      "https://www.zwijsen.net/wp-content/uploads/2022/10/2025-04-12-10.10.47_resize.jpg",
      "https://www.zwijsen.net/wp-content/uploads/2022/10/2025-04-12-10.08.34_resize.jpg",
      "https://www.zwijsen.net/wp-content/uploads/2022/10/Blaricum-SD64-16_resize.jpg"
    ]
  },
  {
    id: 11,
    title: "Uitbreiding en herbestemming van een monumentale boerderij aan de Amstel",
    location: "Amsterdam Amstelland",
    slug: "uitbreiding-herbestemming-monumentale-boerderij-amstel-amstelland",
    image: "https://www.zwijsen.net/wp-content/uploads/2018/04/nieuwbouw-boerderij-stal-zomerhuis-amstel-architect.jpg",
    size: "wide" as const,
    year: "N.N.B.",
    area: "N.N.B.",
    tag: "Monument",
    description: "Een eigentijdse, duurzame woning op historische grond in Amstelland — met herstel van de erfstructuur, een nieuwe woonschuur als ruimtelijk hoogtepunt en een helder spel van patio's, niveauverschillen en daglicht.",
    gallery: [
      "https://www.zwijsen.net/wp-content/uploads/2018/04/nieuwbouw-boerderij-stal-zomerhuis-amstel-architect.jpg",
      "https://www.zwijsen.net/wp-content/uploads/2018/04/amstelland-woonschuur-architect-verbouw-nieuwbouw-boerderijwoning-8.jpg",
      "https://www.zwijsen.net/wp-content/uploads/2018/04/amsterdam-amstel-boerderij-verbouw-architect-1.jpg"
    ]
  },
  {
    id: 12,
    title: "Prefab houten villa met patio's in Ruurlo",
    location: "Ruurlo",
    slug: "prefab-houten-villa-met-patios-ruurlo",
    image: "https://www.zwijsen.net/wp-content/uploads/2024/05/villa-ruurlo-nieuwbouw-woning-architect-achterhoek-1024x546.jpg",
    size: "wide" as const,
    year: "N.N.B.",
    area: "N.N.B.",
    tag: "Nieuwbouw",
    description: "Een eigentijdse villa voor een ruime kavel in de Achterhoek, ontworpen rondom een serie omsloten patio's en zichtlijnen — met maximaal licht, beschutting onder uitkragende daken en een sterke verbinding met het groen.",
    gallery: [
      "https://www.zwijsen.net/wp-content/uploads/2024/05/villa-ruurlo-nieuwbouw-woning-architect-achterhoek.jpg",
      "https://www.zwijsen.net/wp-content/uploads/2022/10/villa-ruurlo-architect-achterhoek-lochem-3.jpg",
      "https://www.zwijsen.net/wp-content/uploads/2024/05/villa-ruurlo-nieuwbouw-woning-architect-achterhoek-by-night.jpg"
    ]
  },
  {
    id: 13,
    title: "Prefab houten villa met patios",
    location: "Bilthoven",
    slug: "prefab-houten-villa-met-patios-bilthoven",
    image: "https://www.zwijsen.net/wp-content/uploads/2025/12/duurzame-boswoning-met-prefan-opbouw.jpg",
    size: "wide" as const,
    year: "N.N.B.",
    area: "N.N.B.",
    tag: "Nieuwbouw",
    description: "Architectuur met perfectie: zero-compromise kwaliteit, prefab precisie en patios als discreet luxe overgang van binnen naar buiten.",
    gallery: [
      "https://www.zwijsen.net/wp-content/uploads/2025/12/duurzame-boswoning-met-prefan-opbouw.jpg",
      "https://www.zwijsen.net/wp-content/uploads/2025/12/duurzame-boswoning-met-vergezichten.jpg",
      "https://www.zwijsen.net/wp-content/uploads/2025/12/luxe-houten-gevel-keuken-zicht.jpg"
    ]
  },
  {
    id: 14,
    title: "Rigoureuze facelift rietkapvilla",
    location: "Breukelen vechtstreek",
    slug: "rigoureuze-facelift-rietkapvilla-breukelen-vechtstreek",
    image: "https://www.zwijsen.net/wp-content/uploads/2025/12/luxe-architectenbureau-rietkapvilla-facelift-riet-hout-glas.jpg",
    size: "wide" as const,
    year: "N.N.B.",
    area: "N.N.B.",
    tag: "Verbouw",
    description: "Van introvert naar extravert: een traditionele villa getransformeerd naar een luxe landhuis met markante dwarskap, panoramische noordgevel en materiaalharmonie.",
    gallery: [
      "https://www.zwijsen.net/wp-content/uploads/2025/12/luxe-architectenbureau-rietkapvilla-facelift-riet-hout-glas.jpg",
      "https://www.zwijsen.net/wp-content/uploads/2025/12/architect-rigoureuze-facelift-rietkapvilla-noordgevel-uitzicht.jpg",
      "https://www.zwijsen.net/wp-content/uploads/2025/12/architect-facelift-rietkapvilla-ontwerp-dwarskap-extra-ruimte.jpg"
    ]
  }
];

// Portfolio projects array
export const TESTIMONIALS = [
  { name: "Anneke en Kees", location: "Almere Homeruskwartier", quote: "Jules zag zichtlijnen in onze kavel die wij nooit voor mogelijk hielden. Het resultaat is elke dag een vakantiegevoel.", role: "Nieuwbouw Villa, Almere Homeruskwartier", image: "/images/combinatie_steen_houten_lamellen_pleisterwerk_luxe_villa_lelystad_architect.jpg" },
  { name: "Anita en Maarten", location: "Leidschendam", quote: "De onzekerheid over het budget werd direct weggenomen door de transparante fasering. Geen verrassingen, wel bewondering.", role: "Renovatie en uitbreiding woning, Leidschendam", image: "/images/interieur luxe villa achterhoek vrijstaand landhuis architect.jpg" },
  { name: "Laura en Edwin", location: "Enschede", quote: "Licht doet echt iets met je humeur. De vide en lichtkanalen zijn de ziel van ons nieuwe huis geworden.", role: "Moderne Stadswoning, Enschede", image: "/images/architect_almere_bouwgrond_kavel_villa_kreekbos.jpg" },
  { name: "Sansy en Marc", location: "Loenen", quote: "Naast dat Jules zeer creatief is, weet hij ook onbewuste en onuitgesproken verlangens te vangen in een prachtig ontwerp, wat ook helemaal niet anders had kunnen zijn.", role: "Moderne Poortwoning, Loenen aan de Vecht", image: "/images/architect_almere_bouwgrond_kavel_villa_kreekbos.jpg" },
];

export const FAQS = [
  {
    tag: "INVESTERING",
    q: "Wat kost een architect voor een woningontwerp?",
    a: "De kosten voor een architect hangen af van de complexiteit en de omvang van het woningontwerp. Wij werken vaak met een percentage van de bouwsom (doorgaans tussen de 3% en 8%) of een vast honorarium per fase. Dit zorgt voor volledige transparantie vanaf de eerste schets.",
    color: "amber"
  },
  {
    tag: "VERBOUW",
    q: "Wat als ik alleen een verbouwing wil?",
    a: "Ook voor een hoogwaardige verbouwing of uitbouw bent u bij ons aan het juiste adres. Wij kijken met een architectonisch oog naar de bestaande structuur om een samenspel te creëren tussen oud en nieuw, inclusief verduurzaming, vergunningsaanvraag en interieurontwerp.",
    color: "stone"
  },
  {
    tag: "START",
    q: "Hoe ziet een eerste gesprek eruit?",
    a: "Het eerste gesprek is een vrijblijvende kennismaking, bij voorkeur op de projectlocatie of kavel. We bespreken uw woonwensen, budget en de mogelijkheden binnen het bestemmingsplan. Dit vormt de fundering voor de verdere samenwerking.",
    color: "emerald"
  },
  {
    tag: "BOUWKOSTEN",
    q: "Wat kost het bouwen van een huis?",
    a: "De bouwkosten variëren sterk per regio en afwerkingsniveau. Voor een luxe vrijstaande villa onder architectuur moet u rekening houden met een vanafprijs van circa €850,- tot €1.200,- per kubieke meter (m³). Wij bewaken dit budget nauwgezet tijdens het ontwerpproces.",
    color: "blue"
  },
  {
    tag: "TIMELINE",
    q: "Hoe lang duurt het bouwen van een huis?",
    a: "Gemiddeld duurt het traject van eerste schets tot oplevering 1,5 tot 2 jaar. Dit is inclusief het ontwerpproces (4-6 maanden), de vergunningsprocedure (3-6 maanden) en de daadwerkelijke bouw (10-14 maanden).",
    color: "amber"
  },
  {
    tag: "REGIO",
    q: "Werken jullie ook in mijn regio?",
    a: "Jules Zwijsen werkt door heel Nederland. Onze projecten bevinden zich voornamelijk in de regio Utrecht, het Gooi (Laren, Blaricum), Amsterdam en Midden-Nederland. Voor bijzondere opgaves reizen we graag het hele land door.",
    color: "stone"
  },
  {
    tag: "AANNEMER",
    q: "Werken jullie altijd met dezelfde aannemer?",
    a: "Nee, we selecteren per project de aannemer die het beste past bij de stijl en het budget. Wel hebben we een netwerk van vertrouwde bouwpartners die gewend zijn aan ons hoge afwerkingsniveau en oog voor detail en toch een concurrerende aanbieding kunnen maken.",
    color: "emerald"
  },
  {
    tag: "TIMING",
    q: "Wanneer kan ik het beste een architect inschakelen?",
    a: "Liefst zo vroeg mogelijk, bij voorkeur al voordat u een kavel koopt. Wij kunnen een aankoopadvies geven over de bouwmogelijkheden en de zonoriëntatie, zodat u zeker weet dat uw droomhuis daar gerealiseerd kan worden.",
    color: "blue"
  }
];

export const NAV_LINKS = [
  { name: "Projecten", label: "Gerealiseerde dromen", href: "#projects" },
  { name: "Regio's", label: "Lokale expertise", href: "/regios" },
  { name: "Info", label: "Wie is Jules Zwijsen?", href: "#info" }
];
