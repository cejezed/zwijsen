import type { RegioConfig } from '../types';
import { PROJECTS_DETAIL } from '../projecten';

// Converteer relevante projecten naar Project format voor de portfolio grid
const utrechtProjects = PROJECTS_DETAIL
    .filter(p => p && (
        p.slug === 'moderne-villa-gebogen-gevel-gooi-en-vechtstreek' ||
        p.slug === 'herbestemming-boerderij-laag-keppel-achterhoek' ||
        p.slug === 'moderne-rietkapvilla-het-gooi' ||
        p.slug === 'modern-paviljoen-water-reeuwijk'
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
            id: 800 + index,
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

export const utrechtConfig: Partial<RegioConfig> = {
    seoTitle: "Architect Utrecht | Exclusieve Villabouw & Verbouw | Jules Zwijsen",
    metaDescription: "Architect in Utrecht, Vleuten of De Meern voor modern wonen, luxe verbouw en monumentale renovatie. Jules Zwijsen ontwerpt met oog voor de stad Utrecht en de omliggende Vechtstreek.",
    canonicalUrl: "https://www.zwijsen.net/utrecht",

    breadcrumbs: [
        { label: "Utrecht", href: "/utrecht" }
    ],

    faqs: [
        {
            tag: "STAD",
            q: "Ontwerpen jullie ook woningen in de binnenstad van Utrecht?",
            a: "Zeker. Werken in de historische context van de Utrechtse binnenstad vraagt om een scherp oog voor monumenten en logistieke uitdagingen. Wij hebben ervaring met het herindelen en verduurzamen van herenpanden en werfkelderwoningen.",
            color: "stone"
        },
        {
            tag: "NIEUWBOUW",
            q: "Zijn jullie actief op kavels in Leidsche Rijn of Vleuten-De Meern?",
            a: "Zeker, en daar hebben we ook al projecten gerealiseerd. De uitbreidingsgebieden van Utrecht bieden prachtige kansen voor moderne architectuur. Wij helpen u bij het vertalen van de beeldkwaliteitsplannen van de gemeente naar een uniek eigen ontwerp.",
            color: "blue"
        },
        {
            tag: "WELSTAND",
            q: "Hoe strikt is de welstandstoetsing in de gemeente Utrecht?",
            a: "Utrecht heeft een deskundige commissie voor Welstand en Monumenten. Wij zorgen voor een sterke architectonische onderbouwing van het plan, zodat de commissie meegenomen wordt in de ontwerpvisie.",
            color: "amber"
        },
        {
            tag: "PROCES",
            q: "Kunnen we een vrijblijvend gesprek plannen in Utrecht?",
            a: "Natuurlijk. Hoewel ons bureau in Loenen aan de Vecht is gevestigd, komen we graag vrijblijvend naar u toe in Utrecht, Vleuten, De meern of ergens anders om de locatie te bekijken, kennis te maken en uw eerste ideeën te bespreken.",
            color: "emerald"
        }
    ],

    projects: utrechtProjects,

    heroSlides: [
        {
            url: "/images/utrecht/moderne-uitbreiding-monumentale-woning-vechtstreek-utrecht-architekt.webp",
            title: "ARCHITECT IN UTRECHT",
            subtitle: "Exclusief wonen in de stad en de omliggende Vechtstreek"
        },
        {
            url: "/images/utrecht/luxe-villa-architect-loosdrecht-moderne-woning-zwembad-luxury-living-architekt-wijdemeren.webp",
            title: "VAN SCHETS TOT REALISATIE",
            subtitle: "Wij begeleiden uw volledige bouwproces in Utrecht"
        }
    ],

    regio: {
        name: "Utrecht",

        intro: {
            h1: "Architect in Utrecht",
            paragraph: "Op zoek naar een architect in Utrecht? Jules Zwijsen ontwerpt villa's, landhuizen en luxe verbouwingen in de regio Utrecht. Vanuit de Vechtstreek werken wij met veel passie aan projecten die de stad Utrecht en de omringende natuur versterken. Wij geloven in architectuur die vanuit de kern - van binnen naar buiten - is gedacht, passend bij uw persoonlijke woonwensen."
        },

        footerIntro: {
            h2: "Uw architect in de regio Utrecht",
            paragraph: "Wilt u bouwen of verbouwen in Utrecht? Of het nu gaat om een modern herenhuis of een vrijstaande villa, wij staan u bij in het gehele proces. Neem contact op voor een kennismaking."
        },

        collageImages: [
      {
        url: "/images/utrecht/Villa-kavel-Vleuten-utrecht-architect.webp",
        alt: "Moderne villa op kavel Vleuten Utrecht door lokale architect Zwijsen"
      },
      {
        url: "/images/utrecht/moderne-uitbreiding-monumentale-woning-vechtstreek-utrecht-architekt.webp",
        alt: "Moderne uitbreiding monumentale woning Vechtstreek Utrecht architect"
      },
      {
        url: "/images/utrecht/metamorfose-oude-woning-breukelen-utrecht-zandpad-architect-luxe-villa.webp",
        alt: "Metamorfose oude woning naar luxe villa Breukelen Utrecht zandpad architect"
      },
      {
        url: "/images/utrecht/renovatie-kickestein-provncie-utrecht-verbouw-karakteristieke-woning.webp",
        alt: "Renovatie karakteristieke woning Kijkestein Utrecht provincie verbouw architect"
      },
      {
        url: "/images/utrecht/luxe-villa-architect-loosdrecht-moderne-woning-zwembad-luxury-living-architekt-wijdemeren.webp",
        alt: "Luxe moderne villa met zwembad Breukeleveen architect Zwijsen"
      },
      {
        url: "/images/utrecht/koetshuis-bij-monument-vechtstreek-nieuwbouw-klassiek-bijgebouw-utrecht.webp",
        alt: "Nieuwbouw koetshuis bij monument Vechtstreek Utrecht klassiek bijgebouw"
      }
    ],

        municipalLinks: [
            {
                title: "Omgevingsloket Utrecht",
                url: "https://loket.digitaal.utrecht.nl/nl/producten/omgevingsvergunning-aanvragen",
                description: "Informatie over bouwen en verbouwen in de gemeente Utrecht."
            },
            {
                title: "Welstandsnota Utrecht",
                url: "https://omgevingsvisie.utrecht.nl/thematisch-beleid/welstand/welstandsnota",
                description: "Inzicht in de esthetische eisen die de gemeente Utrecht stelt."
            }
        ],

        expertise: {
            h2: "Specialist in de regio Utrecht",
            paragraph: "Als architect met een bureau in de provincie Utrecht kennen we de lokale dynamiek en de verschillende bouwstijlen die de steden en omgeving kenmerken.",
            h3: "Bouwen en verbouwen in Utrecht",
            h3_paragraph: "Utrecht biedt een diversiteit aan woonmilieus, van historische grachtengevels tot ruime kavels aan de stadsrand. Wij navigeren u door de complexe regelgeving.",
            services: [
                "Luxe villabouw Utrecht, vechtstreek, Vleuten en De Meern",
                "Renovatie en verduurzaming van herenhuizen, villas en monumenten",
                "Moderne architectuur passend in historische context",
                "Begeleiding vergunningtrajecten, van eerste schets tot oplevering"
            ]
        }
    }
};
