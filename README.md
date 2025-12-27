# Architectenbureau Jules Zwijsen - Portfolio Build Document

Dit document bevat de technische details en instructies voor het onderhouden van de portfolio-applicatie van Architectenbureau Jules Zwijsen.

## 🚀 Technologie Stack

- **React 19**: Voor de component-gebaseerde architectuur.
- **Tailwind CSS**: Voor de styling en responsiviteit.
- **Framer Motion**: Voor de geavanceerde animaties en horizontale scroll-effecten.
- **Lucide React**: Voor de architecturale iconenset.
- **Google Fonts**: Playfair Display (Serif), Inter (Sans) en JetBrains Mono (Monospace).

## 📁 Projectstructuur

De applicatie is modulair opgebouwd om onderhoud en schaalbaarheid te vergemakkelijken:

- `index.html`: Het startpunt met imports van externe assets en de root-container.
- `App.tsx`: De centrale motor van de site. Beheert de scroll-logica en de algemene paginastructuur.
- `data.ts`: **De belangrijkste plek for aanpassingen.** Hier staat alle tekstuele content en afbeeldingen.
- `components.tsx`: Gedeelde UI-componenten zoals magnetische knoppen en roterende teksten.
- `ProjectUI.tsx`: Alle logica voor de weergave van projecten en de gedetailleerde overlays.
- `Overlays.tsx`: De 'Inquiry' (intake) modal met het stapsgewijze formulier.

## ✍️ Content Toevoegen of Wijzigen

Alle inhoud is gecentraliseerd in `data.ts`. U hoeft de logica in `App.tsx` niet aan te raken om items toe te voegen.

### Nieuw Project Toevoegen
Voeg een nieuw object toe aan de `PROJECTS` array in `data.ts`:

```typescript
{ 
  id: 6, 
  title: "Project Naam", 
  location: "Stad", 
  image: "URL_NAAR_HOOFDAFBEELDING", 
  size: "wide", // Keuze uit: wide, portrait, landscape, square
  year: "2025", 
  area: "200m²", 
  tag: "Nieuwbouw", 
  description: "Uw omschrijving...", 
  gallery: ["URL1", "URL2", "URL3"] 
}
```

### Hero Slides Aanpassen
Wijzig de `HERO_SLIDES` array om de beelden en teksten op de landingspagina aan te passen.

### FAQ Items Beheren
Wijzig de `FAQS` array. Elk item heeft een `color` property (`amber`, `stone`, `emerald`, `blue`) die de visuele sfeer van de geopende vraag bepaalt.

## 🎨 Design Principes

- **Typografie**: Contrast tussen klassieke cursieve serif letters en strakke monospace details.
- **Micro-interacties**: 
  - *Magnetische knoppen*: Knoppen trekken de cursor aan bij benadering.
  - *Horizontale Scroll*: Secties in het midden van de pagina bewegen horizontaal bij verticaal scrollen.
  - *Parallax*: Achtergronden bewegen op een ander tempo voor dieptebeleving.
- **Grid & Noise**: Een subtiel raster en noise-overlay zorgen voor een tastbaar 'architecturaal' gevoel.

## 🛠️ Lokale Ontwikkeling

De applicatie maakt gebruik van ES Modules en een importmap in `index.html`. Er is geen complexe build-stap nodig voor basisontwikkeling; een eenvoudige lokale server (zoals Live Server in VS Code) volstaat om de wijzigingen direct te zien.

## 📞 Contact Formulier
De `InquiryOverlay` in `Overlays.tsx` is een stapsgewijs formulier. Momenteel simuleert het een succesvolle verzending. Voor live gebruik kan de `handleSubmit` functie gekoppeld worden aan een backend API of een dienst zoals Formspree.

---
*Gemaakt door Senior Frontend Engineering - 2025*
