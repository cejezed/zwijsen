/**
 * Interne link strategieën voor SEO optimalisatie
 *
 * Deze configuratie definieert contextual links tussen pagina's
 * voor betere internal linking en SEO crawlability
 */

interface InternalLink {
  title: string;
  description: string;
  href: string;
  icon?: 'region' | 'service' | 'project';
}

export const INTERNAL_LINKS = {
  // Links voor nieuwbouw-villa pagina
  nieuwbouwVilla: [
    {
      title: 'Architect Loenen aan de Vecht',
      description: 'Nieuwbouw, verbouw en monumentenzorg in de Vechtstreek. Ervaring met gemeente Stichtse Vecht en lokale welstandseisen.',
      href: '/loenen-aan-de-vecht',
      icon: 'region' as const,
    },
    {
      title: 'Architect Loosdrecht',
      description: 'Exclusieve woningen aan de Loosdrechtse Plassen. Specialist in waterrijke kavels en moderne villa\'s in Wijdemeren.',
      href: '/loosdrecht',
      icon: 'region' as const,
    },
    {
      title: 'Aanbouw Woning',
      description: 'Doordacht ontwerp voor aanbouwen zonder structuurschade. Van eerste schets tot vergunning en uitvoering.',
      href: '/aanbouw-woning',
      icon: 'service' as const,
    },
    {
      title: 'Moderne Villa Ontwerp',
      description: 'Eigentijdse architectuur met aandacht voor licht, ruimte en materialisatie. Strak design met warme uitstraling.',
      href: '/moderne-villa-ontwerp',
      icon: 'service' as const,
    },
    {
      title: 'Verbouwing Woning',
      description: 'Renovatie en verbouw met grip op risico, kosten en vergunningen. Voorkom verrassingen achteraf.',
      href: '/verbouwing-woning',
      icon: 'service' as const,
    },
    {
      title: 'Portfolio - Nieuwbouw Projecten',
      description: 'Bekijk gerealiseerde nieuwbouw villa\'s en landhuizen. Van schets tot oplevering gedocumenteerd.',
      href: '/portfolio',
      icon: 'project' as const,
    },
  ] as InternalLink[],

  // Links voor verbouwing-woning pagina
  verbouwingWoning: [
    {
      title: 'Architect Loenen aan de Vecht',
      description: 'Verbouw en renovatie in de Vechtstreek. Ervaring met monumentale panden en karakteristieke woningen in Stichtse Vecht.',
      href: '/loenen-aan-de-vecht',
      icon: 'region' as const,
    },
    {
      title: 'Nieuwbouw Villa',
      description: 'Van schets tot oplevering: doordacht maatwerk voor nieuwbouw villa\'s met grip op kosten en uitvoering.',
      href: '/nieuwbouw-villa',
      icon: 'service' as const,
    },
    {
      title: 'Aanbouw Woning',
      description: 'Uitbreiden zonder risico op scheuren of verzakking. Constructief verantwoord ontwerp voor aanbouwen.',
      href: '/aanbouw-woning',
      icon: 'service' as const,
    },
    {
      title: 'Moderne Villa Ontwerp',
      description: 'Eigentijdse architectuur met aandacht voor materialisatie en ruimtelijke kwaliteit.',
      href: '/moderne-villa-ontwerp',
      icon: 'service' as const,
    },
    {
      title: 'Architect Loosdrecht',
      description: 'Verbouw en nieuwbouw aan de Loosdrechtse Plassen. Specialist in waterrijke kavels en welstandsbegeleiding.',
      href: '/loosdrecht',
      icon: 'region' as const,
    },
    {
      title: 'Portfolio - Verbouwingen',
      description: 'Bekijk gerealiseerde verbouwingen en renovaties. Van historische panden tot moderne uitbreidingen.',
      href: '/portfolio',
      icon: 'project' as const,
    },
  ] as InternalLink[],

  // Links voor aanbouw-woning pagina
  aanbouwWoning: [
    {
      title: 'Verbouwing Woning',
      description: 'Complete renovatie en verbouw van woningen. Van kleine aanpassingen tot grootschalige herstructurering.',
      href: '/verbouwing-woning',
      icon: 'service' as const,
    },
    {
      title: 'Nieuwbouw Villa',
      description: 'Nieuwbouw villa\'s op maat. Doordacht ontwerp met aandacht voor indeling, kosten en uitvoering.',
      href: '/nieuwbouw-villa',
      icon: 'service' as const,
    },
    {
      title: 'Architect Loenen aan de Vecht',
      description: 'Aanbouw en uitbreiding in Loenen aan de Vecht. Kennis van lokale regelgeving en welstandseisen.',
      href: '/loenen-aan-de-vecht',
      icon: 'region' as const,
    },
    {
      title: 'Architect Loosdrecht',
      description: 'Uitbreidingen aan de Loosdrechtse Plassen. Ervaring met complexe kavelsituaties en waterrijke omgevingen.',
      href: '/loosdrecht',
      icon: 'region' as const,
    },
    {
      title: 'Moderne Villa Ontwerp',
      description: 'Moderne architectuur voor aanbouwen. Eigentijds design dat aansluit bij bestaande woningen.',
      href: '/moderne-villa-ontwerp',
      icon: 'service' as const,
    },
    {
      title: 'Portfolio - Aanbouwen',
      description: 'Bekijk gerealiseerde aanbouwprojecten. Van kleine uitbreidingen tot grootschalige volume-uitbreidingen.',
      href: '/portfolio',
      icon: 'project' as const,
    },
  ] as InternalLink[],

  // Links voor moderne-villa-ontwerp pagina
  moderneVillaOntwerp: [
    {
      title: 'Nieuwbouw Villa',
      description: 'Nieuwbouw villa\'s met moderne architectuur. Van concept tot realisatie met grip op budget.',
      href: '/nieuwbouw-villa',
      icon: 'service' as const,
    },
    {
      title: 'Architect Loosdrecht',
      description: 'Moderne villa\'s aan de Loosdrechtse Plassen. Eigentijdse architectuur in landschappelijke setting.',
      href: '/loosdrecht',
      icon: 'region' as const,
    },
    {
      title: 'Architect Loenen aan de Vecht',
      description: 'Modern ontwerp in historische context. Balans tussen eigentijds en respect voor de omgeving.',
      href: '/loenen-aan-de-vecht',
      icon: 'region' as const,
    },
    {
      title: 'Verbouwing Woning',
      description: 'Verbouw naar moderne architectuur. Transformatie van bestaande woningen met hedendaagse uitstraling.',
      href: '/verbouwing-woning',
      icon: 'service' as const,
    },
    {
      title: 'Aanbouw Woning',
      description: 'Moderne aanbouwen. Eigentijdse uitbreidingen die de bestaande woning versterken.',
      href: '/aanbouw-woning',
      icon: 'service' as const,
    },
    {
      title: 'Portfolio - Moderne Projecten',
      description: 'Bekijk moderne villa-ontwerpen. Van minimalistische woningen tot warme eigentijdse architectuur.',
      href: '/portfolio',
      icon: 'project' as const,
    },
  ] as InternalLink[],

  // Links voor regio pagina's - Loenen aan de Vecht
  loenenAanDeVecht: [
    {
      title: 'Nieuwbouw Villa',
      description: 'Nieuwbouw villa\'s in Loenen aan de Vecht. Ontwerpen die passen binnen de welstandseisen van Stichtse Vecht.',
      href: '/nieuwbouw-villa',
      icon: 'service' as const,
    },
    {
      title: 'Verbouwing Woning',
      description: 'Verbouw en renovatie in de Vechtstreek. Ervaring met monumentale panden en karakteristieke woningen.',
      href: '/verbouwing-woning',
      icon: 'service' as const,
    },
    {
      title: 'Aanbouw Woning',
      description: 'Aanbouwen in Loenen aan de Vecht. Constructief verantwoord uitbreiden met respect voor de omgeving.',
      href: '/aanbouw-woning',
      icon: 'service' as const,
    },
    {
      title: 'Architect Loosdrecht',
      description: 'Ook actief in Loosdrecht en omgeving. Specialist in waterrijke kavels en exclusieve woningen.',
      href: '/loosdrecht',
      icon: 'region' as const,
    },
    {
      title: 'Moderne Villa Ontwerp',
      description: 'Eigentijdse architectuur in Loenen. Modern design dat past binnen de lokale context.',
      href: '/moderne-villa-ontwerp',
      icon: 'service' as const,
    },
    {
      title: 'Portfolio - Projecten Vechtstreek',
      description: 'Bekijk gerealiseerde projecten in Loenen aan de Vecht en omgeving.',
      href: '/portfolio',
      icon: 'project' as const,
    },
  ] as InternalLink[],

  // Links voor regio pagina's - Loosdrecht
  loosdrecht: [
    {
      title: 'Nieuwbouw Villa',
      description: 'Nieuwbouw villa\'s aan de Loosdrechtse Plassen. Architectuur die maximaal profiteert van de waterrijke omgeving.',
      href: '/nieuwbouw-villa',
      icon: 'service' as const,
    },
    {
      title: 'Moderne Villa Ontwerp',
      description: 'Moderne architectuur aan het water. Eigentijdse villa\'s met grote glaspartijen en natuurlijke materialen.',
      href: '/moderne-villa-ontwerp',
      icon: 'service' as const,
    },
    {
      title: 'Verbouwing Woning',
      description: 'Verbouw en modernisering in Loosdrecht. Van karakteristieke panden tot recreatiewoningen.',
      href: '/verbouwing-woning',
      icon: 'service' as const,
    },
    {
      title: 'Architect Loenen aan de Vecht',
      description: 'Ook actief in Loenen aan de Vecht. Expertise in historische kernen en monumentenzorg.',
      href: '/loenen-aan-de-vecht',
      icon: 'region' as const,
    },
    {
      title: 'Aanbouw Woning',
      description: 'Uitbreidingen aan de Plassen. Aanbouwen die de relatie met het water versterken.',
      href: '/aanbouw-woning',
      icon: 'service' as const,
    },
    {
      title: 'Portfolio - Projecten Wijdemeren',
      description: 'Bekijk gerealiseerde projecten in Loosdrecht en omgeving aan de Plassen.',
      href: '/portfolio',
      icon: 'project' as const,
    },
  ] as InternalLink[],

  // Links voor regio pagina's - Utrecht
  utrecht: [
    {
      title: 'Nieuwbouw Villa',
      description: 'Nieuwbouw villa\'s in Utrecht en omgeving. Moderne architectuur in stedelijke context.',
      href: '/nieuwbouw-villa',
      icon: 'service' as const,
    },
    {
      title: 'Verbouwing Woning',
      description: 'Verbouw en renovatie in Utrecht. Van stadswoning tot herenhuis.',
      href: '/verbouwing-woning',
      icon: 'service' as const,
    },
    {
      title: 'Architect Maarssen',
      description: 'Ook actief in Maarssen en de Vechtstreek. Naburige gemeente met vergelijkbare projecten.',
      href: '/maarssen',
      icon: 'region' as const,
    },
    {
      title: 'Architect Bilthoven',
      description: 'Projecten in Bilthoven. Villawijken en groene woongebieden.',
      href: '/bilthoven',
      icon: 'region' as const,
    },
    {
      title: 'Moderne Villa Ontwerp',
      description: 'Eigentijdse architectuur in Utrecht. Strak design met urban karakter.',
      href: '/moderne-villa-ontwerp',
      icon: 'service' as const,
    },
    {
      title: 'Portfolio - Projecten Utrecht',
      description: 'Bekijk gerealiseerde projecten in Utrecht en omgeving.',
      href: '/portfolio',
      icon: 'project' as const,
    },
  ] as InternalLink[],

  // Links voor regio pagina's - Breukelen
  breukelen: [
    {
      title: 'Nieuwbouw Villa',
      description: 'Nieuwbouw villa\'s in Breukelen aan de Vecht. Architectuur in groene omgeving.',
      href: '/nieuwbouw-villa',
      icon: 'service' as const,
    },
    {
      title: 'Verbouwing Woning',
      description: 'Verbouw in Breukelen. Renovatie van karakteristieke woningen aan de Vecht.',
      href: '/verbouwing-woning',
      icon: 'service' as const,
    },
    {
      title: 'Architect Maarssen',
      description: 'Ook actief in Maarssen. Naburige gemeente in Stichtse Vecht.',
      href: '/maarssen',
      icon: 'region' as const,
    },
    {
      title: 'Architect Loenen aan de Vecht',
      description: 'Projecten in Loenen aan de Vecht. Expertise in de Vechtstreek.',
      href: '/loenen-aan-de-vecht',
      icon: 'region' as const,
    },
    {
      title: 'Aanbouw Woning',
      description: 'Uitbreidingen in Breukelen. Aanbouwen in landschappelijke omgeving.',
      href: '/aanbouw-woning',
      icon: 'service' as const,
    },
    {
      title: 'Portfolio - Projecten Stichtse Vecht',
      description: 'Bekijk projecten in Breukelen en de Vechtstreek.',
      href: '/portfolio',
      icon: 'project' as const,
    },
  ] as InternalLink[],

  // Links voor regio pagina's - Maarssen
  maarssen: [
    {
      title: 'Nieuwbouw Villa',
      description: 'Nieuwbouw villa\'s in Maarssen. Moderne architectuur aan de Vecht.',
      href: '/nieuwbouw-villa',
      icon: 'service' as const,
    },
    {
      title: 'Verbouwing Woning',
      description: 'Verbouw en renovatie in Maarssen. Van karakteristiek tot eigentijds.',
      href: '/verbouwing-woning',
      icon: 'service' as const,
    },
    {
      title: 'Architect Breukelen',
      description: 'Ook actief in Breukelen. Naburige plaats in gemeente Stichtse Vecht.',
      href: '/breukelen',
      icon: 'region' as const,
    },
    {
      title: 'Architect Utrecht',
      description: 'Projecten in Utrecht. Stedelijke architectuur en villawijken.',
      href: '/utrecht',
      icon: 'region' as const,
    },
    {
      title: 'Moderne Villa Ontwerp',
      description: 'Eigentijdse villa\'s in Maarssen. Modern design in groene setting.',
      href: '/moderne-villa-ontwerp',
      icon: 'service' as const,
    },
    {
      title: 'Portfolio - Projecten Maarssen',
      description: 'Bekijk gerealiseerde projecten in Maarssen en omgeving.',
      href: '/portfolio',
      icon: 'project' as const,
    },
  ] as InternalLink[],

  // Links voor regio pagina's - Hilversum
  hilversum: [
    {
      title: 'Nieuwbouw Villa',
      description: 'Nieuwbouw villa\'s in Hilversum. Architectuur in villawijken en op landgoederen.',
      href: '/nieuwbouw-villa',
      icon: 'service' as const,
    },
    {
      title: 'Moderne Villa Ontwerp',
      description: 'Moderne architectuur in Hilversum. Eigentijds design in groene omgeving.',
      href: '/moderne-villa-ontwerp',
      icon: 'service' as const,
    },
    {
      title: 'Verbouwing Woning',
      description: 'Verbouw in Hilversum. Renovatie van villa\'s en jaren \'30 woningen.',
      href: '/verbouwing-woning',
      icon: 'service' as const,
    },
    {
      title: 'Architect Loosdrecht',
      description: 'Ook actief in Loosdrecht. Waterrijke omgeving nabij Hilversum.',
      href: '/loosdrecht',
      icon: 'region' as const,
    },
    {
      title: 'Architect Bilthoven',
      description: 'Projecten in Bilthoven. Vergelijkbare villawijken en groene omgeving.',
      href: '/bilthoven',
      icon: 'region' as const,
    },
    {
      title: 'Portfolio - Projecten Gooi',
      description: 'Bekijk gerealiseerde projecten in Hilversum en het Gooi.',
      href: '/portfolio',
      icon: 'project' as const,
    },
  ] as InternalLink[],

  // Links voor regio pagina's - Bilthoven
  bilthoven: [
    {
      title: 'Nieuwbouw Villa',
      description: 'Nieuwbouw villa\'s in Bilthoven. Architectuur in groene villawijken.',
      href: '/nieuwbouw-villa',
      icon: 'service' as const,
    },
    {
      title: 'Verbouwing Woning',
      description: 'Verbouw in Bilthoven. Renovatie van villa\'s en karakteristieke woningen.',
      href: '/verbouwing-woning',
      icon: 'service' as const,
    },
    {
      title: 'Architect Utrecht',
      description: 'Ook actief in Utrecht. Naburige stad met diverse projecten.',
      href: '/utrecht',
      icon: 'region' as const,
    },
    {
      title: 'Architect Hilversum',
      description: 'Projecten in Hilversum. Vergelijkbare villawijken in het Gooi.',
      href: '/hilversum',
      icon: 'region' as const,
    },
    {
      title: 'Moderne Villa Ontwerp',
      description: 'Eigentijdse villa\'s in Bilthoven. Modern design in bosrijke omgeving.',
      href: '/moderne-villa-ontwerp',
      icon: 'service' as const,
    },
    {
      title: 'Portfolio - Projecten Bilthoven',
      description: 'Bekijk gerealiseerde projecten in Bilthoven en De Bilt.',
      href: '/portfolio',
      icon: 'project' as const,
    },
  ] as InternalLink[],

  // Links voor regio pagina's - Stichtse Vecht
  stichtseVecht: [
    {
      title: 'Nieuwbouw Villa',
      description: 'Nieuwbouw villa\'s in Stichtse Vecht. Architectuur aan de Vecht.',
      href: '/nieuwbouw-villa',
      icon: 'service' as const,
    },
    {
      title: 'Verbouwing Woning',
      description: 'Verbouw in gemeente Stichtse Vecht. Van Maarssen tot Loenen.',
      href: '/verbouwing-woning',
      icon: 'service' as const,
    },
    {
      title: 'Architect Loenen aan de Vecht',
      description: 'Specifieke expertise in Loenen aan de Vecht. Monumentenzorg en nieuwbouw.',
      href: '/loenen-aan-de-vecht',
      icon: 'region' as const,
    },
    {
      title: 'Architect Maarssen',
      description: 'Projecten in Maarssen. Kern binnen gemeente Stichtse Vecht.',
      href: '/maarssen',
      icon: 'region' as const,
    },
    {
      title: 'Architect Breukelen',
      description: 'Ook actief in Breukelen. Karakteristiek dorp aan de Vecht.',
      href: '/breukelen',
      icon: 'region' as const,
    },
    {
      title: 'Portfolio - Projecten Vechtstreek',
      description: 'Bekijk projecten in de hele gemeente Stichtse Vecht.',
      href: '/portfolio',
      icon: 'project' as const,
    },
  ] as InternalLink[],

  // Links voor regio pagina's - Vinkeveen
  vinkeveen: [
    {
      title: 'Nieuwbouw Villa',
      description: 'Nieuwbouw villa\'s in Vinkeveen. Architectuur aan de Vinkeveense Plassen.',
      href: '/nieuwbouw-villa',
      icon: 'service' as const,
    },
    {
      title: 'Moderne Villa Ontwerp',
      description: 'Moderne architectuur aan het water. Villa\'s met uitzicht op de plassen.',
      href: '/moderne-villa-ontwerp',
      icon: 'service' as const,
    },
    {
      title: 'Verbouwing Woning',
      description: 'Verbouw in Vinkeveen. Renovatie van woningen en recreatiewoningen.',
      href: '/verbouwing-woning',
      icon: 'service' as const,
    },
    {
      title: 'Architect Loosdrecht',
      description: 'Ook actief in Loosdrecht. Expertise in waterrijke omgevingen.',
      href: '/loosdrecht',
      icon: 'region' as const,
    },
    {
      title: 'Aanbouw Woning',
      description: 'Uitbreidingen aan de plassen. Aanbouwen met uitzicht op het water.',
      href: '/aanbouw-woning',
      icon: 'service' as const,
    },
    {
      title: 'Portfolio - Projecten Vinkeveen',
      description: 'Bekijk gerealiseerde projecten in Vinkeveen en aan de plassen.',
      href: '/portfolio',
      icon: 'project' as const,
    },
  ] as InternalLink[],
};
