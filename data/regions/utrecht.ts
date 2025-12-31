import type { RegioConfig } from '../types';
import { PROJECTS_DETAIL } from '../projecten';

// Converteer relevante projecten naar Project format voor de portfolio grid
const utrechtProjects = PROJECTS_DETAIL
    .filter(p =>
        p.slug === 'moderne-villa-gebogen-gevel-gooi-en-vechtstreek' ||
        p.slug === 'herbestemming-boerderij-laag-keppel-achterhoek' ||
        p.slug === 'moderne-rietkapvilla-het-gooi' ||
        p.slug === 'modern-paviljoen-water-reeuwijk'
    )
    .map((p, index) => {
        const sizes = ['wide', 'portrait', 'landscape', 'square'] as const;
        const size = sizes[index % 4];

        return {
            id: 800 + index,
            title: p.title,
            location: p.locationLabel,
            slug: p.slug,
            image: p.featuredImage.url,
            size: size,
            year: 'N.N.B.',
            area: 'N.N.B.',
            tag: p.categories?.[0] === 'nieuwbouw' ? 'Nieuwbouw' : p.categories?.[0] === 'verbouw' ? 'Verbouw' : 'Project',
            subtitle: p.subtitle,
            description: p.subtitle,
            gallery: p.heroImages.map(img => img.url)
        };
    });

export const utrechtConfig: Partial<RegioConfig> = {
    seoTitle: "Architect Utrecht | Exclusieve Villabouw & Verbouw | Jules Zwijsen",
    metaDescription: "Architect in Utrecht voor modern wonen, luxe verbouw en monumentale renovatie. Jules Zwijsen ontwerpt met oog voor de stad Utrecht en de omliggende Vechtstreek.",
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
            a: "De uitbreidingsgebieden van Utrecht bieden prachtige kansen voor moderne architectuur. Wij helpen u bij het vertalen van de beeldkwaliteitsplannen van de gemeente naar een uniek eigen ontwerp.",
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
            a: "Natuurlijk. Hoewel ons bureau in Loenen aan de Vecht is gevestigd, komen we graag naar u toe in Utrecht om de locatie te bekijken en uw eerste ideeën te bespreken.",
            color: "emerald"
        }
    ],

    projects: utrechtProjects,

    heroSlides: [
        {
            url: "/images/utrecht/landhuis-utrecht-nieuwe-villa-architect-kavel-bouwgrond.webp",
            title: "ARCHITECT IN UTRECHT",
            subtitle: "Exclusief wonen in de stad en de omliggende Vechtstreek"
        },
        {
            url: "/images/utrecht/modern-interieur-villa-utrecht-architect-design.webp",
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

        collageImages: [], // Wordt gevuld met relevante projectbeelden

        municipalLinks: [
            {
                title: "Omgevingsloket Utrecht",
                url: "https://www.utrecht.nl/wonen-en-leven/bouwen/",
                description: "Informatie over bouwen en verbouwen in de gemeente Utrecht."
            },
            {
                title: "Welstandsnota Utrecht",
                url: "https://www.utrecht.nl/wonen-en-leven/bouwen/welstand/",
                description: "Inzicht in de esthetische eisen die de gemeente Utrecht stelt."
            }
        ],

        expertise: {
            h2: "Specialist in de regio Utrecht",
            paragraph: "Als architect met een bureau vlakbij Utrecht kennen we de lokale dynamiek en de verschillende bouwstijlen die de stad kenmerken.",
            h3: "Bouwen en verbouwen in Utrecht",
            h3_paragraph: "Utrecht biedt een diversiteit aan woonmilieus, van historische grachtengevels tot ruime kavels aan de stadsrand. Wij navigeren u door de complexe regelgeving.",
            services: [
                "Luxe villabouw Utrecht",
                "Renovatie van herenhuizen",
                "Moderne interieurarchitectuur",
                "Begeleiding vergunningtrajecten"
            ]
        }
    }
};
