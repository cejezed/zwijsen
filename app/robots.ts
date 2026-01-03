import { MetadataRoute } from 'next';

/**
 * Robots.txt configuration
 * https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/private/',
        ],
      },
    ],
    sitemap: 'https://www.zwijsen.net/sitemap.xml',
  };
}
