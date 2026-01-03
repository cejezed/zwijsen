/**
 * Centralized Structured Data (Schema.org) configuration
 *
 * This file contains reusable JSON-LD schemas for SEO optimization
 */

import { BRAND_NAME, ADDRESS, PHONE_NUMBER, EMAIL } from './constants';

const BASE_URL = 'https://www.zwijsen.net';

/**
 * Main Organization schema - used across the site
 */
export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": ["Architect", "ProfessionalService", "Organization"],
  "@id": `${BASE_URL}#organization`,
  "name": BRAND_NAME,
  "alternateName": "Jules Zwijsen Architect",
  "description": "Architectenbureau voor exclusieve villabouw, verbouw en landhuizen in de Vechtstreek en 't Gooi. Van schets tot oplevering.",
  "url": BASE_URL,
  "logo": {
    "@type": "ImageObject",
    "url": `${BASE_URL}/images/logo.png`,
    "width": 200,
    "height": 200
  },
  "image": `${BASE_URL}/images/logo.png`,
  "telephone": PHONE_NUMBER,
  "email": EMAIL,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": ADDRESS.street,
    "addressLocality": ADDRESS.city.split(' ').slice(1).join(' '),
    "postalCode": ADDRESS.city.split(' ')[0],
    "addressRegion": "Utrecht",
    "addressCountry": "NL"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 52.2147,
    "longitude": 5.0117
  },
  "areaServed": [
    {
      "@type": "AdministrativeArea",
      "name": "Nederland"
    },
    {
      "@type": "City",
      "name": "Utrecht"
    },
    {
      "@type": "City",
      "name": "Loenen aan de Vecht"
    },
    {
      "@type": "City",
      "name": "Hilversum"
    },
    {
      "@type": "City",
      "name": "Amsterdam"
    }
  ],
  "priceRange": "€€€",
  "openingHours": "Mo-Fr 09:00-17:00",
  "founder": {
    "@type": "Person",
    "name": "Jules Zwijsen",
    "jobTitle": "Architect",
    "sameAs": "https://www.linkedin.com/in/jules-zwijsen"
  },
  "sameAs": [
    "https://www.linkedin.com/company/architectenbureau-jules-zwijsen",
    "https://www.instagram.com/architectenbureau_juleszwijsen",
    "https://www.facebook.com/juleszwijsenarchitect"
  ],
  "knowsAbout": [
    "Architectuur",
    "Villabouw",
    "Nieuwbouw",
    "Verbouw",
    "Interieurontwerp",
    "Duurzame architectuur",
    "Monumentenzorg",
    "Vergunningen",
    "Bouwbegeleiding"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "2",
    "bestRating": "5",
    "worstRating": "1"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Architectuurdiensten",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Nieuwbouw villa",
          "description": "Architectonisch ontwerp voor nieuwbouw villa's"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Verbouwing woning",
          "description": "Verbouw en renovatie van bestaande woningen"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Aanbouw woning",
          "description": "Uitbreiding van bestaande woningen"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Interieurontwerp",
          "description": "Interieurarchitectuur en maatwerk"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Bouwbegeleiding",
          "description": "Projectmanagement en bouwtoezicht"
        }
      }
    ]
  }
};

/**
 * Website schema - used on homepage and main pages
 */
export const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}#website`,
  "url": BASE_URL,
  "name": "Architectenbureau Jules Zwijsen",
  "description": "Architect voor moderne villa's, verbouw en landhuizen in Nederland",
  "publisher": {
    "@id": `${BASE_URL}#organization`
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${BASE_URL}/portfolio?search={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  },
  "inLanguage": "nl-NL"
};

/**
 * Generate LocalBusiness schema for region pages
 */
export const generateLocalBusinessSchema = (params: {
  regionName: string;
  regionSlug: string;
  description: string;
  image?: string;
  geo?: { latitude: number; longitude: number };
  municipality?: string;
  province?: string;
}) => {
  const { regionName, regionSlug, description, image, geo, municipality, province } = params;
  const currentUrl = `${BASE_URL}/${regionSlug}`;

  const areaServed: any[] = [
    {
      "@type": "City",
      "name": regionName
    }
  ];

  if (municipality) {
    areaServed.push({
      "@type": "AdministrativeArea",
      "name": municipality
    });
  }
  if (province) {
    areaServed.push({
      "@type": "AdministrativeArea",
      "name": province
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": ["Architect", "LocalBusiness", "ProfessionalService"],
    "@id": `${currentUrl}#localbusiness`,
    "name": `${BRAND_NAME} - Architect ${regionName}`,
    "description": description,
    "url": currentUrl,
    "image": image || `${BASE_URL}/images/logo.png`,
    "logo": `${BASE_URL}/images/logo.png`,
    "telephone": PHONE_NUMBER,
    "email": EMAIL,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": ADDRESS.street,
      "addressLocality": ADDRESS.city.split(' ').slice(1).join(' '),
      "postalCode": ADDRESS.city.split(' ')[0],
      "addressCountry": "NL"
    },
    "geo": geo ? {
      "@type": "GeoCoordinates",
      "latitude": geo.latitude,
      "longitude": geo.longitude
    } : undefined,
    "areaServed": areaServed,
    "priceRange": "€€€",
    "openingHours": "Mo-Fr 09:00-17:00",
    "founder": {
      "@type": "Person",
      "name": "Jules Zwijsen"
    },
    "sameAs": [
      "https://www.linkedin.com/company/architectenbureau-jules-zwijsen",
      "https://www.instagram.com/architectenbureau_juleszwijsen",
      "https://www.facebook.com/juleszwijsenarchitect"
    ],
    "parentOrganization": {
      "@id": `${BASE_URL}#organization`
    }
  };
};

/**
 * Generate BreadcrumbList schema
 */
export const generateBreadcrumbSchema = (breadcrumbs: Array<{ label: string; href: string }>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.label,
      "item": crumb.href.startsWith('http') ? crumb.href : `${BASE_URL}${crumb.href}`
    }))
  };
};

/**
 * Generate Service schema for service pages
 */
export const generateServiceSchema = (params: {
  serviceName: string;
  serviceSlug: string;
  description: string;
  image?: string;
}) => {
  const { serviceName, serviceSlug, description, image } = params;
  const serviceUrl = `${BASE_URL}/${serviceSlug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${serviceUrl}#service`,
    "name": serviceName,
    "description": description,
    "provider": {
      "@id": `${BASE_URL}#organization`
    },
    "serviceType": "Architectural Design",
    "areaServed": {
      "@type": "Country",
      "name": "Nederland"
    },
    "url": serviceUrl,
    "image": image,
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": serviceName,
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": serviceName
          }
        }
      ]
    }
  };
};

/**
 * Generate FAQPage schema
 */
export const generateFAQSchema = (faqs: Array<{ q: string; a: string }>, pageUrl?: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": pageUrl ? `${pageUrl}#faq` : undefined,
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };
};

/**
 * Generate WebPage schema
 */
export const generateWebPageSchema = (params: {
  pageName: string;
  pageUrl: string;
  description: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
}) => {
  const { pageName, pageUrl, description, image, datePublished, dateModified } = params;

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    "url": pageUrl,
    "name": pageName,
    "description": description,
    "isPartOf": {
      "@id": `${BASE_URL}#website`
    },
    "about": {
      "@id": `${BASE_URL}#organization`
    },
    "primaryImageOfPage": image ? {
      "@type": "ImageObject",
      "url": image
    } : undefined,
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "inLanguage": "nl-NL"
  };
};

/**
 * Generate complete @graph structure for marketing pages
 */
export const generateMarketingPageGraph = (params: {
  pageName: string;
  pageUrl: string;
  description: string;
  serviceName: string;
  image?: string;
  faqs?: Array<{ q: string; a: string }>;
  breadcrumbs: Array<{ label: string; href: string }>;
}) => {
  const { pageName, pageUrl, description, serviceName, image, faqs, breadcrumbs } = params;

  const graph: any[] = [
    {
      ...ORGANIZATION_SCHEMA,
      "@id": `${BASE_URL}#organization`
    },
    {
      ...WEBSITE_SCHEMA,
      "@id": `${BASE_URL}#website`
    },
    generateWebPageSchema({
      pageName,
      pageUrl,
      description,
      image
    }),
    generateBreadcrumbSchema(breadcrumbs),
    generateServiceSchema({
      serviceName,
      serviceSlug: new URL(pageUrl).pathname.substring(1),
      description,
      image
    })
  ];

  if (faqs && faqs.length > 0) {
    graph.push(generateFAQSchema(faqs, pageUrl));
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph
  };
};

/**
 * Generate CreativeWork schema for architecture projects
 */
export const generateProjectSchema = (params: {
  projectTitle: string;
  projectSlug: string;
  description: string;
  location: string;
  images: Array<{ url: string; alt: string }>;
  datePublished?: string;
  keywords?: string[];
  category?: string;
}) => {
  const { projectTitle, projectSlug, description, location, images, datePublished, keywords, category } = params;
  const projectUrl = `${BASE_URL}/portfolio/${projectSlug}`;

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${projectUrl}#project`,
    "name": projectTitle,
    "description": description,
    "creator": {
      "@id": `${BASE_URL}#organization`
    },
    "url": projectUrl,
    "image": images.length > 0 ? images.map(img => ({
      "@type": "ImageObject",
      "url": img.url,
      "contentUrl": img.url,
      "name": img.alt,
      "description": img.alt,
      "representativeOfPage": img === images[0],
      "caption": img.alt
    })) : undefined,
    "about": {
      "@type": "Place",
      "name": location,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": location,
        "addressCountry": "NL"
      }
    },
    "keywords": keywords?.join(', '),
    "genre": category || "Architectuur",
    "inLanguage": "nl-NL",
    "datePublished": datePublished,
    "provider": {
      "@id": `${BASE_URL}#organization`
    }
  };
};

/**
 * Generate ImageGallery schema for project galleries
 */
export const generateImageGallerySchema = (params: {
  projectTitle: string;
  projectSlug: string;
  images: Array<{ url: string; alt: string }>;
}) => {
  const { projectTitle, projectSlug, images } = params;
  const projectUrl = `${BASE_URL}/portfolio/${projectSlug}`;

  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "@id": `${projectUrl}#gallery`,
    "name": `${projectTitle} - Fotogalerij`,
    "about": {
      "@id": `${projectUrl}#project`
    },
    "associatedMedia": images.map((img, index) => ({
      "@type": "ImageObject",
      "@id": `${projectUrl}#image-${index + 1}`,
      "url": img.url,
      "contentUrl": img.url,
      "name": img.alt,
      "description": img.alt,
      "caption": img.alt,
      "representativeOfPage": index === 0,
      "creator": {
        "@id": `${BASE_URL}#organization`
      }
    }))
  };
};
