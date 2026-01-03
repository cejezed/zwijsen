import type { RegioConfig } from '../types';
import { PROJECTS_DETAIL } from '../projecten';

// Converteer relevante projecten naar Project format voor de portfolio grid
const hilversumProjects = PROJECTS_DETAIL
  .filter(p => p && (
    p.slug === 'moderne-rietkapvilla-het-gooi' ||
    p.slug === 'moderne-villa-rieten-kap-blaricum' ||
    p.slug === 'moderne-villa-gebogen-gevel-gooi-en-vechtstreek' ||
    p.slug === 'luxe-villa-uitzicht-waterrijk-woerden'
  ))
  .map((p, index) => {
    const sizes = ['wide', 'portrait', 'landscape', 'square'] as const;
    const size = sizes[index % 4];

    const locationLabel = 'locationLabel' in p ? p.locationLabel : ('location' in p ? p.location : '');
    const featuredImage = 'featuredImage' in p ? p.featuredImage : undefined;
    const regularImage = 'image' in p ? p.image : undefined;
    const heroImages = 'heroImages' in p ? p.heroImages : [];
    const subtitle = 'subtitle' in p ? p.subtitle : ('description' in p ? p.description : '');
    const categories = 'categories' in p ? p.categories : undefined;

    return {
      id: 400 + index,
      title: p.title,
      location: locationLabel,
      slug: p.slug,
      image: featuredImage?.url || (typeof regularImage === 'string' ? regularImage : regularImage?.url) || '',
      size: size,
      year: 'N.N.B.',
      area: 'N.N.B.',
      tag: categories?.[0] === 'nieuwbouw' ? 'Nieuwbouw' : categories?.[0] === 'verbouw' ? 'Verbouw' : 'Project',
      subtitle: subtitle,
      description: subtitle,
      gallery: heroImages.map(img => img.url)
    };
  });

export const hilversumConfig: Partial<RegioConfig> = {
  seoTitle: "Architect Hilversum | Nieuwbouw & Verbouw in het Gooi | Jules Zwijsen",
  metaDescription: "Architect in Hilversum voor exclusieve villabouw, verbouw en landhuizen. Jules Zwijsen ontwerpt met oog voor de Dudok-traditie en de bosrijke omgeving van het Gooi.",
  canonicalUrl: "https://www.zwijsen.net/hilversum",

  breadcrumbs: [
    { label: "Hilversum", href: "/hilversum" }
  ],

  // Region-specific FAQs for SEO
  faqs: [
    {
      tag: "WELSTAND",
      q: "Hoe gaat de gemeente Hilversum om met moderne architectuur?",
      a: "Hilversum heeft een sterke architectuurtraditie (o.a. Dudok). De welstandscommissie kijkt kritisch naar materiaalgebruik en inpassing in het groen. Wij hebben veel ervaring met het vertalen van moderne woonwensen naar een ontwerp dat de goedkeuring van de Hilversumse welstand krijgt.",
      color: "amber"
    },
    {
      tag: "BOUWEN",
      q: "Mag ik een bosperceel in Hilversum zomaar bebouwen?",
      a: "In de bosrijke wijken van Hilversum en het Gooi gelden vaak strikte regels over de 'footprint' van een woning en het behoud van bomen. Wij voeren vakkundige kavelanalyses uit om te bepalen wat de maximale bouwmogelijkheden zijn binnen het geldende omgevingsplan.",
      color: "emerald"
    },
    {
      tag: "VERBOUW",
      q: "Is een aanbouw aan een jaren '30 woning in Hilversum altijd vergunningsplichtig?",
      a: "Veel woningen in Hilversum vallen onder beschermd stads- of dorpsgezicht. In dat geval is bijna elke wijziging aan de buitenzijde vergunningsplichtig. Wij verzorgen de volledige aanvraag omgevingsvergunning bij de gemeente Hilversum.",
      color: "blue"
    },
    {
      tag: "KOSTEN",
      q: "Wat zijn de kosten van een architect voor een villa in het Gooi?",
      a: "Wij werken met een transparante honorariumstructuur gebaseerd op de verschillende fasen van het ontwerp- en bouwproces. In een vrijblijvend kennismakingsgesprek schetsen we de route van eerste schets tot de uiteindelijke realisatie.",
      color: "stone"
    }
  ],

  projects: hilversumProjects,

  heroSlides: [
    {
      url: "/images/hilversum/luxury-living-architect-residence-hilversum-new-villa-kavel.webp",
      title: "ARCHITECT IN HILVERSUM",
      subtitle: "Villa's en landhuizen met oog voor het groene karakter van het Gooi"
    },
    {
      url: "/images/hilversum/landhuis-hilversum-nieuwe-rieten-kap-villa-architect-bilthoven-kavel-bouwgrond.webp",
      title: "VAN EERSTE SCHETS TOT OPLEVERING",
      subtitle: "Ontwerpen die passen bij de bosrijke omgeving van Hilversum"
    },
    {
      url: "/images/hilversum/moderne-uitbouw-renovatie-woning-hilversum-verduurzaming-architect.webp",
      title: "VAKMANSCHAP EN AANDACHT",
      subtitle: "Begeleiding bij vergunningen en contact met gemeente Hilversum"
    }
  ],

  regio: {
    name: "Hilversum",

    intro: {
      h1: "Architect in Hilversum",
      paragraph: "U zoekt een architect in Hilversum voor een verbouwing, aanbouw of nieuwbouwwoning in het Gooi. Vanuit mijn basis in Loenen aan de Vecht werk ik met regelmaat in Hilversum en omgeving. Het doel is een ontwerp dat uw woonwensen en levensstijl vormgeeft in een woning die bij u past. Door ervaring met bestemmingsplannen en afwijkingsprocedures blijkt er vaak meer mogelijk dan u in eerste instantie zou denken - maatwerk dat recht doet aan het groene karakter van het Gooi."
    },

    footerIntro: {
      h2: "Architect in Hilversum nodig?",
      paragraph: "Denkt u na over een verbouwing, aanbouw of nieuwbouwwoning in Hilversum en wilt u daar met een architect over sparren? Neem contact op met Jules Zwijsen voor een vrijblijvend gesprek. Tijdens een afspraak op uw locatie wordt samen bekeken welke mogelijkheden er zijn voor uw woning en locatie in Hilversum en het Gooi."
    },

    collageImages: [
      {
        url: "/images/hilversum/luxury-living-architect-residence-hilversum-new-villa-kavel.webp",
        alt: "Luxe nieuwbouw villa op kavel in Hilversum, ontwerp architect Jules Zwijsen"
      },
      {
        url: "/images/hilversum/landhuis-hilversum-nieuwe-rieten-kap-villa-architect-bilthoven-kavel-bouwgrond.webp",
        alt: "Nieuw landhuis met rieten kap in Hilversum op bouwgrond, architect ontwerp"
      },
      {
        url: "/images/hilversum/architekt moderne villa in het bos luxe bosvilla architect glazen paviljoen hilversum architektenburo.webp",
        alt: "Moderne bosvilla met glazen paviljoen in Hilversum door architectenbureau"
      },
      {
        url: "/images/hilversum/moderne-uitbouw-renovatie-woning-hilversum-verduurzaming-architect.webp",
        alt: "Moderne uitbouw en verduurzaming woning in Hilversum door architect"
      },
      {
        url: "/images/hilversum/villa-entree-brede-houten-deur-betonvilla-hilversum-bouwgrond-architect-luxe nieuwbouw.webp",
        alt: "Villa entree met brede houten deur in Hilversum, luxe nieuwbouw architect"
      },
      {
        url: "/images/hilversum/inrerieur-nieuwbouwwoning-modern-architect-hilversum-desgin-luxury-residence-interior-design.webp",
        alt: "Modern interieur nieuwbouwwoning in Hilversum, luxury residence interior design"
      }
    ],

    municipalLinks: [
      {
        title: "Bestemmingsplan / Omgevingsplan",
        url: "https://omgevingswet.overheid.nl/regels-op-de-kaart/zoeken/locatie",
        description: "Controleer wat er mag op uw locatie volgens het gemeentelijke bestemmingsplan."
      },
      {
        title: "Welstandsnota Hilversum",
        url: "https://repository.officiele-overheidspublicaties.nl/Datacollecties/2024/dc-2024-961/1/bijlage/dc-2024-961.pdf",
        description: "Inzicht in welstandscriteria en architectonische eisen voor uw bouwplan."
      },
      {
        title: "Leges en tarieven omgevingsvergunning",
        url: "https://lokaleregelgeving.overheid.nl/CVDR732271/1",
        description: "Overzicht van gemeentelijke kosten voor vergunningaanvragen."
      },
      {
        title: "Vooroverleg gemeente Hilversum",
        url: "https://hilversum.nl/node/1735",
        description: "Neem vooraf contact op met de gemeente voor advies over uw plannen."
      }
    ],

    expertise: {
      h2: "Wat doet een architect in Hilversum?",
      paragraph: "Als architect in Hilversum en het Gooi ontwerpt Jules Zwijsen villa's en landhuizen met oog voor de groene, bosrijke omgeving. Van moderne nieuwbouw tot zorgvuldige uitbreidingen van bestaande woningen - elk ontwerp past bij het hoge architectonische niveau van Hilversum en respecteert het karakter van het Gooi.",
      h3: "Architectonisch ontwerp in het Gooi",
      h3_paragraph: "Hilversum kent een rijke architectuurgeschiedenis en een bijzonder groen karakter. Bij elk ontwerp wordt rekening gehouden met de landschappelijke inpassing, het straatbeeld en de welstandscriteria. Door jarenlange ervaring met de welstandscommissie van gemeente Hilversum weet Jules Zwijsen precies hoe u uw project succesvol door de procedures leidt. Soms is een binnenplanse afwijking nodig, soms een omgevingsvergunning in afwijking van het bestemmingsplan - samen met de gemeente zoeken we naar een oplossing die uw dromen werkelijkheid maakt binnen de kaders die Hilversum stelt.",
      services: [
        "Ontwerp van nieuwbouw villa's in Hilversum en het Gooi",
        "Nieuwbouw, verbouw en uitbreiding van woningen in bosrijke omgeving",
        "Aanbouw, verbouw en verduurzaming van bestaande woningen",
        "Begeleiding bij vergunningsaanvragen gemeente Hilversum",
        "Advies bij architectonische inpassing en welstandstoetsing"
      ]
    }
  }
};
