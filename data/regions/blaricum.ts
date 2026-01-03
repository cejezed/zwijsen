import type { RegioConfig } from '../types';
import { PROJECTS_DETAIL } from '../projecten';

// Helpers: veilig velden ophalen uit ProjectDetail (en eventuele varianten)
function getProjectLocationLabel(p: any): string {
  if (p && typeof p === 'object') {
    if ('locationLabel' in p && typeof p.locationLabel === 'string') return p.locationLabel;
    if ('location' in p && typeof p.location === 'string') return p.location;
  }
  return '';
}

function getProjectSubtitle(p: any): string {
  if (p && typeof p === 'object') {
    if ('subtitle' in p && typeof p.subtitle === 'string') return p.subtitle;
    if ('description' in p && typeof p.description === 'string') return p.description;
  }
  return '';
}

function getProjectImageUrl(p: any): string {
  const featuredImage = p && typeof p === 'object' && 'featuredImage' in p ? p.featuredImage : undefined;
  const regularImage = p && typeof p === 'object' && 'image' in p ? p.image : undefined;

  const featuredUrl =
    featuredImage && typeof featuredImage === 'object' && typeof featuredImage.url === 'string'
      ? featuredImage.url
      : '';

  const regularUrl =
    typeof regularImage === 'string'
      ? regularImage
      : regularImage && typeof regularImage === 'object' && typeof regularImage.url === 'string'
        ? regularImage.url
        : '';

  return featuredUrl || regularUrl || '';
}

function getProjectHeroGallery(p: any): string[] {
  const heroImages = p && typeof p === 'object' && 'heroImages' in p ? p.heroImages : [];
  if (!Array.isArray(heroImages)) return [];
  return heroImages
    .map((img: any) => (img && typeof img === 'object' && typeof img.url === 'string' ? img.url : ''))
    .filter(Boolean);
}

function getProjectCategories(p: any): string[] {
  const categories = p && typeof p === 'object' && 'categories' in p ? p.categories : [];
  return Array.isArray(categories) ? categories.filter((c) => typeof c === 'string') : [];
}

function getProjectTags(p: any): string[] {
  const tags = p && typeof p === 'object' && 'tags' in p ? p.tags : [];
  return Array.isArray(tags) ? tags.filter((t) => typeof t === 'string') : [];
}

// Projecten selecteren voor Blaricum / Blaricummermeent
const blaricumProjects = PROJECTS_DETAIL
  .filter((p: any) => {
    if (!p) return false;

    const slug = typeof p.slug === 'string' ? p.slug.toLowerCase() : '';
    const location = getProjectLocationLabel(p).toLowerCase();
    const tags = getProjectTags(p).join(' ').toLowerCase();

    const haystack = `${slug} ${location} ${tags}`;

    return (
      haystack.includes('blaricum') ||
      haystack.includes('blaricummermeent') ||
      haystack.includes('het-gooi') ||
      haystack.includes('gooi')
    );
  })
  .slice(0, 8)
  .map((p: any, index: number) => {
    const sizes = ['wide', 'portrait', 'landscape', 'square'] as const;
    const size = sizes[index % 4];

    const subtitle = getProjectSubtitle(p);
    const categories = getProjectCategories(p);
    const imageUrl = getProjectImageUrl(p);
    const gallery = getProjectHeroGallery(p);

    return {
      id: 600 + index,
      title: p.title,
      location: getProjectLocationLabel(p),
      slug: p.slug,
      image: imageUrl,
      size: size,
      year: 'N.N.B.',
      area: 'N.N.B.',
      tag:
        categories?.[0] === 'nieuwbouw'
          ? 'Nieuwbouw'
          : categories?.[0] === 'verbouw'
            ? 'Verbouw'
            : categories?.[0] === 'aanbouw'
              ? 'Aanbouw'
              : 'Project',
      subtitle: subtitle,
      description: subtitle,
      gallery: gallery
    };
  });

export const blaricumConfig: Partial<RegioConfig> = {
  seoTitle: 'Architect Blaricum | Villa, Nieuwbouw & Verbouw (Het Gooi) | Jules Zwijsen',
  metaDescription:
    'Architect in Blaricum voor villa’s, nieuwbouw en verbouw in Het Gooi. Ontwerpen met rust, zichtlijnen en hoogwaardige detaillering. Begeleiding van schets tot vergunning en uitvoering.',
  canonicalUrl: 'https://www.zwijsen.net/blaricum',

  breadcrumbs: [{ label: 'Blaricum', href: '/blaricum' }],

  faqs: [
    {
      tag: 'WELSTAND',
      q: 'Hoe streng is welstand in Blaricum en Blaricummermeent?',
      a: 'In Blaricum wordt sterk gelet op ruimtelijke kwaliteit: maat en schaal, kapvormen, materialisering en detaillering. In nieuwere gebieden (zoals Blaricummermeent) spelen beeldkwaliteitseisen vaak een grote rol. Wij ontwerpen vanaf dag één met deze kaders in het achterhoofd, zodat het plan overtuigt én soepel door de toets komt.',
      color: 'stone'
    },
    {
      tag: 'VERGUNNING',
      q: 'Wanneer heb ik een omgevingsvergunning nodig in Blaricum?',
      a: 'Dat hangt af van uw ingreep en de ligging (zichtzijden, kap, gevelwijzigingen, bijgebouwen, bomen, inritten, enz.). Wij starten meestal met een haalbaarheidsscan op locatie en pakken waar nodig vooroverleg met de gemeente mee, zodat u vroeg zekerheid krijgt over de route.',
      color: 'amber'
    },
    {
      tag: 'VILLA',
      q: 'Kunnen jullie een moderne villa ontwerpen die past in het Gooise karakter?',
      a: 'Ja. Een moderne villa kan heel “Goois” aanvoelen als proportie, rust en materialisering kloppen. Wij combineren eigentijdse plattegronden en veel daglicht met een tijdloze uitstraling, zodat het ontwerp vanzelfsprekend in de omgeving past.',
      color: 'emerald'
    },
    {
      tag: 'KOSTEN',
      q: 'Wat kost een architect bij een villaverbouw of nieuwbouw in Blaricum?',
      a: 'De kosten hangen af van omvang, complexiteit (welstand/monument) en de gewenste begeleiding. Wij werken in heldere fasen: schets, voorlopig ontwerp (met prijsvorming), definitief ontwerp en begeleiding bij vergunning/uitvoering. Zo houdt u grip op keuzes, planning en budget.',
      color: 'blue'
    }
  ],

  projects: blaricumProjects,

  heroSlides: [
    {
      url: '/images/blaricum/architect-blaricum-villa-het-gooi-exterieur.webp',
      title: 'ARCHITECT IN BLARICUM',
      subtitle: 'Villa’s, verbouw en nieuwbouw in Het Gooi'
    },
    {
      url: '/images/blaricum/architect-blaricum-villa-tuin-gevel-daglicht.webp',
      title: 'WONEN MET ZICHTLIJNEN',
      subtitle: 'Ruimte, daglicht en rust in elke plattegrond'
    },
    {
      url: '/images/blaricum/architect-het-gooi-villa-ruimtelijke-kwaliteit.webp',
      title: 'ONTWERP DAT OVERTUIGT',
      subtitle: 'Kwaliteit die klopt binnen welstand en beeldkwaliteit'
    }
  ],

  processSteps: [
    {
      id: '01',
      title: 'Kennismaking in Blaricum',
      subtitle: 'Wensen & Levensritme',
      duration: '1-2 weken',
      description:
        'Een persoonlijk gesprek in Blaricum waarin ik uw wensen, stijl en levensritme leer kennen. We kijken ter plaatse naar privacy, zichtlijnen, zon, bomen en de relatie met straat en tuin. Na dit gesprek heeft u helderheid over mogelijkheden, aanpak en vervolgstappen.',
      deliverables: ['Intakegesprek', 'Locatie-analyse', 'Budgetindicatie'],
      img: '/images/kennismaking_architect_werkwijze_kosten.jpg'
    },
    {
      id: '02',
      title: 'Schetsontwerp',
      subtitle: 'Inspiratie & Concept',
      duration: '4-6 weken',
      description:
        'Ik vertaal uw woonwensen naar een sterk concept dat functioneert én inspireert. Met schetsen en 3D-beelden ervaart u het huis al voordat het bestaat. In Blaricum sturen we vanaf het begin op rust, proportie en hoogwaardige materialisering.',
      deliverables: ['3D visualisaties', 'Plattegronden', 'Materiaalrichting'],
      img: '/images/schetsontwerp_architect_moderne_villa_zandvoort_duinen.jpg'
    },
    {
      id: '03',
      title: 'Voorlopig Ontwerp',
      subtitle: 'Prijsvorming & Regie',
      duration: '3-4 weken',
      description:
        'De eerste werkbare tekeningen gaan naar aannemers en adviseurs. Ik organiseer offertes en zet het plan in een realistisch kostenkader. Indien nodig doen we vooroverleg met de gemeente om de vergunningstrategie vroeg te borgen.',
      deliverables: ['Bouwtekeningen', 'Offerteaanvraag', 'Kostenraming'],
      img: '/images/bouwkundige_tekening_patio_villa_achterhoek.jpg'
    },
    {
      id: '04',
      title: 'Definitief Ontwerp',
      subtitle: 'Alles sluitend',
      duration: '2-3 weken',
      description:
        'Alle details worden uitgewerkt: constructie, installaties, materialen en afwerkingen. Het plan wordt uitvoerbaar, eenduidig en compleet — zodat de bouw soepel kan starten.',
      deliverables: ['Constructietekeningen', 'Installatieplan', 'Detailtekeningen'],
      img: 'https://www.zwijsen.net/wp-content/uploads/2026/01/dsn-a9.jpeg'
    },
    {
      id: '05',
      title: 'Vergunning & Uitvoering',
      subtitle: 'Van Papier naar Werkelijkheid',
      duration: 'Varieert',
      description:
        'Ik verzorg de vergunningsaanvraag en begeleid de uitvoering. Van overleg met aannemer tot kwaliteitscontrole en oplevering: u heeft één aanspreekpunt dat bewaakt dat ontwerp en uitvoering samenvallen.',
      deliverables: ['Omgevingsvergunning', 'Bouwbegeleiding', 'Oplevering'],
      img: 'https://www.zwijsen.net/wp-content/uploads/2013/11/start-bouw-homerus-kwartier-oost.jpg'
    }
  ],

  regio: {
    name: 'Blaricum',

    intro: {
      h1: 'Architect in Blaricum',
      paragraph:
        'U zoekt een architect in Blaricum voor een verbouwing, aanbouw of nieuwbouw. Het Gooi vraagt om ontwerpen met rust, proportie en kwaliteit — woningen die vanzelfsprekend in hun omgeving passen, maar volledig zijn afgestemd op uw leven. Door ervaring met ruimtelijke kwaliteit, welstand en vergunningprocedures ontstaat er vaak meer speelruimte dan op het eerste gezicht lijkt, mits het ontwerp vanaf het begin strategisch wordt opgebouwd.'
    },

    footerIntro: {
      h2: 'Architect in Blaricum nodig?',
      paragraph:
        'Overweegt u een verbouwing, aanbouw of nieuwbouw in Blaricum en wilt u daar met een architect over sparren? Neem contact op met Jules Zwijsen voor een vrijblijvend gesprek. Op locatie bekijken we samen de mogelijkheden, randvoorwaarden en een logische route naar vergunning en uitvoering.'
    },

    collageImages: [
      {
        url: 'https://www.zwijsen.net/wp-content/uploads/2025/12/villa-blaricum-rieten-kap-met-pleisterwerk-en-houten-lamellen.jpg',
        alt: 'Tijdloze villa in Blaricum met rustige gevelopbouw, ontwerp architect Jules Zwijsen'
      },
      {
        url: 'https://www.zwijsen.net/wp-content/uploads/2022/04/moderne-rietenkap-villa-blaricummermeent-architect.jpg',
        alt: 'Moderne villa in Blaricum met grote glasgevel naar de tuin, ontwerp architect in Het Gooi'
      },
      {
        url: '/images/blaricum/architect-blaricum-villa-tuin-gevel-daglicht.webp',
        alt: 'Lichte woonkeuken met zichtlijn naar de tuin, ontwerp architect Blaricum'
      },
      {
        url: '/images/blaricum/villa-het-gooi-verbouw-zichtlijnen.webp',
        alt: 'Verbouw van karakteristieke woning in Blaricum met behoud van sfeer en comfort'
      },
      {
        url: '/images/blaricum/villa-blaricummermeent-nieuwbouw-architect.webp',
        alt: 'Hoogwaardige detaillering en materiaalkeuzes passend bij Gooise villabouw'
      },
      {
        url: 'https://www.zwijsen.net/wp-content/uploads/2022/10/moderne-villa-lelystad-architect-verbouw-moderne-villa-6.jpg',
        alt: 'Energiezuinig en comfortabel wonen met subtiel geïntegreerde verduurzaming in Blaricum'
      }
    ],

    municipalLinks: [
      {
        title: 'Regels op de kaart (Omgevingsloket)',
        url: 'https://omgevingswet.overheid.nl/regels-op-de-kaart/zoeken/locatie',
        description:
          'Check wat er op uw locatie mag volgens het omgevingsplan en landelijke regels (vergunningscheck).'
      },
      {
        title: 'Gemeente Blaricum – Omgevingsvergunning',
        url: 'https://www.blaricum.nl/omgevingsvergunning',
        description: 'Informatie over aanvragen, procedure en aandachtspunten bij bouwen en verbouwen in Blaricum.'
      },
      {
        title: 'Welstandsnota Blaricum 2018 (PDF)',
        url: 'https://zoek.officielebekendmakingen.nl/gmb-2018-134976.pdf',
        description: 'Welstandscriteria en gebiedstypen als toetsingskader voor ruimtelijke kwaliteit in Blaricum.'
      },
      {
        title: 'Legesverordening Blaricum 2025',
        url: 'https://lokaleregelgeving.overheid.nl/CVDR731314/1',
        description: 'Overzicht van gemeentelijke leges (kosten) bij vergunningen en aanvragen.'
      }
    ],

    expertise: {
      h2: 'Wat doet een architect in Blaricum?',
      paragraph:
        'Als architect in Blaricum ontwerp en begeleid ik verbouwingen, aanbouwen en nieuwbouw met focus op ruimtelijke rust en kwaliteit. Dat varieert van een slimme herindeling en uitbreiding tot een complete villaverbouw of nieuwbouw op een kavel. Altijd met aandacht voor zichtlijnen, daglicht, materiaal en de relatie met tuin en straat. En natuurlijk rekening houdend met de mogelijkheden en extra afwijkingsbevoegdheden die de bestemmingsplannen Kom Beschermd Dorpsgezicht, Villagebieden, Blaricummermeent en Dorp bieden. ',
      h3: 'Ook actief in Laren en de rest van Het Gooi',
      h3_paragraph:
        'Hoewel de projecten in mijn portfolio nu vooral uit Blaricum en omgeving komen, werk ik in de praktijk in het hele Gooi — waaronder Laren, Hilversum, Bussum en Naarden. De werkwijze is hetzelfde: een ontwerp dat past bij uw leven én dat overtuigt binnen ruimtelijke kwaliteit en procedures.',
          services: [
        'Ontwerp van nieuwbouwwoningen en villa’s in Blaricum en Het Gooi',
        'Verbouw, herindeling, aanbouw en uitbouw met hoogwaardige uitstraling',
        'Verduurzaming met behoud van esthetiek: isolatie, comfort en installaties slim geïntegreerd',
        'Strategie voor welstand/ruimtelijke kwaliteit en (waar nodig) vooroverleg met de gemeente',
        'Begeleiding van schets tot vergunning en uitvoering'
      ]
    }
  }
};
