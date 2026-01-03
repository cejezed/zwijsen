import type { MetadataRoute } from 'next';
import { PROJECTS_DETAIL } from '../data/projecten';
import { PAGE_CONFIG } from '../data';

const BASE_URL = 'https://www.zwijsen.net';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // Core pages with highest priority
  const corePaths: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/portfolio`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${BASE_URL}/regios`, lastModified: now, changeFrequency: 'weekly', priority: 0.90 },
  ];

  // Marketing/Service pages - high priority for conversions
  const servicePaths: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/nieuwbouw-villa`, lastModified: now, changeFrequency: 'monthly', priority: 0.90 },
    { url: `${BASE_URL}/verbouwing-woning`, lastModified: now, changeFrequency: 'monthly', priority: 0.90 },
    { url: `${BASE_URL}/aanbouw-woning`, lastModified: now, changeFrequency: 'monthly', priority: 0.90 },
    { url: `${BASE_URL}/moderne-villa-ontwerp`, lastModified: now, changeFrequency: 'monthly', priority: 0.90 },
  ];

  // Information pages
  const infoPaths: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/architect`, lastModified: now, changeFrequency: 'monthly', priority: 0.80 },
    { url: `${BASE_URL}/over-ons`, lastModified: now, changeFrequency: 'monthly', priority: 0.80 },
    { url: `${BASE_URL}/werkwijze`, lastModified: now, changeFrequency: 'monthly', priority: 0.80 },
    { url: `${BASE_URL}/kosten`, lastModified: now, changeFrequency: 'monthly', priority: 0.80 },
  ];

  // Action pages
  const actionPaths: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE_URL}/quickscan`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
  ];

  // Region pages - dynamically from PAGE_CONFIG
  const regionPaths: MetadataRoute.Sitemap = Object.keys(PAGE_CONFIG)
    .filter((slug) => slug !== 'default')
    .map((slug) => ({
      url: `${BASE_URL}/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.85, // High priority for SEO-targeted region pages
    }));

  // Portfolio project pages - dynamically from PROJECTS_DETAIL
  const projectPaths: MetadataRoute.Sitemap = PROJECTS_DETAIL.filter((p) => p.slug).map((p) => ({
    url: `${BASE_URL}/portfolio/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.70,
  }));

  return [
    ...corePaths,
    ...servicePaths,
    ...infoPaths,
    ...actionPaths,
    ...regionPaths,
    ...projectPaths,
  ];
}
