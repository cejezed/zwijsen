// Dit bestand bevat alleen de slugs van regio's en projecten voor de prerender stap.
// We importeren hier GEEN React componenten om de build-omgeving schoon te houden.

// Vaste pagina's
export const STATIC_ROUTES = [
    '/',
    '/architect',
    '/over-ons',
    '/werkwijze',
    '/kosten',
    '/quickscan',
    '/contact',
    '/portfolio',
    '/regios'
];

// Regio slugs (moeten overeenkomen met de keys in PAGE_CONFIG)
export const REGION_SLUGS = [
    'hilversum',
    'loenen-aan-de-vecht',
    'loosdrecht',
    'utrecht',
    'bilthoven',
    'breukelen',
    'maarssen',
    'stichtse-vecht',
    'vinkeveen',
    'het-gooi',
    'blaricum',
    'laren',
    'wijdemeren',
    'kortenhoef',
    'vreeland'
];

// Project slugs (uit PROJECTS_DETAIL)
export const PROJECT_SLUGS = [
    'architect-loenen-aan-de-vecht-torenwoning-cronenburgh',
    'architect-loenen-aan-de-vecht-verbouw-villa-kickestein',
    'architect-loenen-aan-de-vecht-moderne-recreatiewoning-vecht',
    'architect-poortwoning-cronenburgh-loenen-aan-de-vecht',
    'architect-loenen-aan-de-vecht-hofwoning-cronenburgh',
    'moderne-rietkapvilla-het-gooi',
    'moderne-villa-rieten-kap-blaricum',
    'moderne-kubistische-villa-laren',
    'moderne-villa-gebogen-gevel-gooi-en-vechtstreek',
    'verbouw-luxe-villa-zandvoort',
    'modern-paviljoen-water-reeuwijk'
];

export const getAllPrerenderRoutes = () => {
    return [
        ...STATIC_ROUTES,
        ...REGION_SLUGS.map(s => `/${s}`),
        ...PROJECT_SLUGS.map(s => `/portfolio/${s}`)
    ];
};
