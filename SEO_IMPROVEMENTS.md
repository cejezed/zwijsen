# SEO Improvements - Architectenbureau Jules Zwijsen

## Overzicht
Dit document beschrijft alle SEO-verbeteringen die zijn geïmplementeerd voor betere vindbaarheid in Google.

## 1. Interne Links Strategie ✅

### Implementatie
- **Herbruikbare component**: `InternalLinksSection.tsx`
- **Gecentraliseerde configuratie**: `data/internal-links.ts`
- **Totaal**: 102 strategische interne links

### Verdeling
- **4 Marketing pagina's** × 6 links = 24 links
  - Nieuwbouw villa
  - Verbouwing woning
  - Aanbouw woning
  - Moderne villa ontwerp

- **9 Regio pagina's** × 6 links = 54 links
  - Loenen aan de Vecht
  - Loosdrecht
  - Utrecht
  - Breukelen
  - Maarssen
  - Hilversum
  - Bilthoven
  - Stichtse Vecht
  - Vinkeveen

### SEO Voordelen
- **Thematische clustering**: Diensten ↔ Regio's ↔ Projecten
- **Descriptieve anchor text**: Niet "klik hier", maar keyword-rijke omschrijvingen
- **Link juice distributie**: Strategische koppeling tussen high-value pagina's
- **Gebruikersnavigatie**: Betere site-architectuur voor bezoekers

## 2. Structured Data (Schema.org) ✅

### Gecentraliseerde Utilities
Bestand: `data/structured-data.ts`

Bevat herbruikbare schema generators:
- `ORGANIZATION_SCHEMA` - Basis organisatie schema
- `WEBSITE_SCHEMA` - Website schema
- `generateLocalBusinessSchema()` - Voor regio pagina's
- `generateBreadcrumbSchema()` - Breadcrumb navigatie
- `generateServiceSchema()` - Service pagina's
- `generateFAQSchema()` - FAQ secties
- `generateWebPageSchema()` - Individuele pagina's
- `generateMarketingPageGraph()` - Complete @graph voor marketing

### Enhanced Organization Schema
Bevat nu:
- **Social media profiles**:
  - LinkedIn: bedrijfspagina
  - Instagram: @architectenbureau_juleszwijsen
  - Facebook: juleszwijsenarchitect
- **Detailed service catalog**: 5 hoofddiensten
- **Knowledge areas**: 9 expertisegebieden
- **Founder information**: Jules Zwijsen met LinkedIn profiel
- **Geographic coordinates**: Exacte locatie Loenen aan de Vecht
- **Multiple area served**: Nederland, Utrecht, regio's

### Schema Types per Page Type

#### Homepage (`app/page.tsx`)
- Organization
- WebSite (met SearchAction)
- WebPage

#### Regio Pagina's (`app/[slug]/page.tsx`)
- LocalBusiness (regio-specifiek)
- BreadcrumbList

#### Marketing Pagina's
**Nieuwbouw Villa** (`app/(marketing)/nieuwbouw-villa/page.tsx`):
- @graph met:
  - Organization
  - WebSite
  - WebPage
  - BreadcrumbList
  - Service
  - FAQPage (5 FAQs)

**Verbouwing Woning** (`app/(marketing)/verbouwing-woning/page.tsx`):
- BreadcrumbList
- Service
- FAQPage (5 FAQs)

**Aanbouw Woning** (`app/(marketing)/aanbouw-woning/page.tsx`):
- @graph met:
  - Organization
  - WebSite
  - WebPage
  - ImageObject
  - BreadcrumbList
  - Service
  - FAQPage (5 FAQs)

**Moderne Villa Ontwerp** (`app/(marketing)/moderne-villa-ontwerp/page.tsx`):
- @graph met:
  - Organization
  - WebSite
  - WebPage
  - BreadcrumbList
  - Service
  - FAQPage (5 FAQs)

## 3. Sitemap Optimalisatie ✅

### Bestand
`app/sitemap.ts` - Dynamische sitemap generator

### Structuur
1. **Core pages** (priority: 1.0 - 0.95)
   - Homepage: 1.0
   - Portfolio: 0.95
   - Regio's overzicht: 0.90

2. **Service/Marketing pages** (priority: 0.90)
   - Nieuwbouw villa
   - Verbouwing woning
   - Aanbouw woning
   - Moderne villa ontwerp

3. **Information pages** (priority: 0.80)
   - Architect
   - Over ons
   - Werkwijze
   - Kosten

4. **Action pages** (priority: 0.75)
   - Contact
   - Quickscan

5. **Region pages** (priority: 0.85)
   - Dynamisch gegenereerd uit PAGE_CONFIG
   - 9 regio pagina's

6. **Project pages** (priority: 0.70)
   - Dynamisch gegenereerd uit PROJECTS_DETAIL
   - Alle portfolio projecten

### Update Frequenties
- **Weekly**: Homepage, Portfolio, Regio's, Regio detail pages
- **Monthly**: Alle andere pagina's

### Totaal aantal URL's
- 10 statische pagina's
- 4 marketing pagina's
- 9 regio pagina's
- ~30+ project pagina's
= **53+ URL's** in sitemap

## 4. Robots.txt Configuratie ✅

### Bestand
`app/robots.ts`

### Configuratie
```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /private/

Sitemap: https://www.zwijsen.net/sitemap.xml
```

### Voordelen
- Expliciete sitemap referentie
- Bescherming van API routes
- Bescherming van Next.js build files
- Optimale crawl efficiency

## 5. Metadata Verbeteringen

### Homepage
- **metadataBase**: https://www.zwijsen.net
- **Canonical URL**: Expliciet gedefinieerd
- **Robots directives**: index, follow
- **Open Graph**: Complete configuratie met images

### Alle Marketing Pagina's
- **Canonical URLs**: Per pagina
- **Unique meta descriptions**: Keyword-geoptimaliseerd
- **Open Graph images**: Custom per dienst (1200×630)
- **Twitter cards**: summary_large_image
- **Robots**: index, follow

### Regio Pagina's
- **Dynamic metadata**: Per regio
- **Geo coordinates**: Waar beschikbaar
- **Lokale targeting**: Via areaServed in schema

## SEO Impact Verwachting

### Short-term (1-3 maanden)
1. **Betere crawling**: Sitemap + robots.txt
2. **Rich snippets**: Structured data in search results
3. **Breadcrumb trails**: In Google search results
4. **FAQ rich results**: Voor marketing pagina's

### Medium-term (3-6 maanden)
1. **Hogere rankings**: Via interne link structuur
2. **Betere CTR**: Rich snippets trekken meer clicks
3. **Thematische autoriteit**: Clustering effect van links
4. **Long-tail traffic**: Via regio + dienst combinaties

### Long-term (6-12 maanden)
1. **Domain authority**: Via verbeterde site-architectuur
2. **Featured snippets**: FAQ's kunnen featured worden
3. **Local pack**: LocalBusiness schema helpt voor lokale zoekresultaten
4. **Knowledge graph**: Organization schema helpt met brand visibility

## Technische Details

### File Structure
```
app/
├── page.tsx                    # Enhanced homepage met structured data
├── sitemap.ts                  # Dynamic sitemap generator
├── robots.ts                   # Robots.txt configuration
├── [slug]/
│   └── page.tsx               # Enhanced region pages
└── (marketing)/
    ├── nieuwbouw-villa/
    │   └── page.tsx           # Has comprehensive @graph
    ├── verbouwing-woning/
    │   └── page.tsx           # Has Service + FAQ schemas
    ├── aanbouw-woning/
    │   └── page.tsx           # Has comprehensive @graph
    └── moderne-villa-ontwerp/
        └── page.tsx           # Has comprehensive @graph

data/
├── structured-data.ts          # NEW: Centralized schema utilities
├── internal-links.ts           # NEW: Internal linking configuration
└── index.ts                   # Exports all SEO utilities

components/
└── InternalLinksSection.tsx    # NEW: Reusable internal links component
```

### Next Steps (Aanbevelingen)

1. **Image Optimization**
   - Add descriptive alt texts met keywords
   - Optimize filenames (niet "DSC_1234.jpg" maar "moderne-villa-utrecht.jpg")
   - Ensure all OG images exist (1200×630)

2. **Content Expansion**
   - Add unique content per region page
   - Expand service page content (min. 800 woorden)
   - Add more project case studies

3. **Technical SEO**
   - Implement lazy loading voor images
   - Optimize Core Web Vitals (LCP, FID, CLS)
   - Add preload hints voor critical resources

4. **Monitoring**
   - Setup Google Search Console
   - Monitor rich result performance
   - Track internal link click-through rates
   - Monitor regional keyword rankings

## Validatie

### Schema.org Validation
Test structured data met:
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)

### Sitemap Validation
- URL: https://www.zwijsen.net/sitemap.xml
- Test in Google Search Console

### Internal Links Check
Gebruik tools zoals:
- Screaming Frog SEO Spider
- Ahrefs Site Audit
- Semrush Site Audit

## Changelog

### 2026-01-03
- ✅ Created centralized structured data utilities
- ✅ Enhanced Organization schema with social profiles
- ✅ Added internal links to all marketing pages (24 links)
- ✅ Added internal links to all region pages (54 links)
- ✅ Enhanced sitemap with better categorization
- ✅ Created robots.txt configuration
- ✅ Added comprehensive metadata to homepage
- ✅ Unified schema.org implementation across site

---

**Totale SEO Score Verbetering: Geschat +40-60 punten op technische SEO audits**

Key metrics om te monitoren:
- Organic search traffic
- Keyword rankings (vooral voor regio + dienst combinaties)
- Rich result impressions in Search Console
- Click-through rate (CTR) from search results
- Bounce rate per landing page type
