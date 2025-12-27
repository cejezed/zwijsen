import type { ProjectDetail } from '../types';

// Export utility functies voor filtering
export * from './utils';

// Import individuele projecten
export { levensloopbestendigeniorenwoningenLoenen } from './levensloopbestendige-seniorenwoningen-loenen';
export { moderneRietkapvillaHetGooi } from './moderne-rietkapvilla-het-gooi';
export { transparanteBosvillaRhenen } from './transparante-bosvilla-rhenen';
export { villaGameren } from './villa-gameren';
export { verbouwLuxeVillaZandvoort } from './verbouw-luxe-villa-zandvoort';
export { luxeVillaUitzichtWaterrijkWoerden } from './luxe-villa-uitzicht-waterrijk-woerden';
export { modernPaviljoenWaterReeuwijk } from './modern-paviljoen-water-reeuwijk';
export { moderneVernieuwbouwvillaUitzichtGroenLelystad } from './moderne-vernieuwbouwvilla-uitzicht-groen-lelystad';
export { herbestemmingBoerderijLaagKeppelAchterhoek } from './herbestemming-boerderij-laag-keppel-achterhoek';
export { moderneVillaRietenKapBlaricum } from './moderne-villa-rieten-kap-blaricum';
export { monumentaleBoerderijAmstelAmstelland } from './uitbreiding-herbestemming-monumentale-boerderij-amstel-amstelland';
export { prefabHoutenVillaMetPatiosRuurlo } from './prefab-houten-villa-met-patios-ruurlo';
export { prefabHoutenVillaMetPatiosBilthoven } from './prefab-houten-villa-met-patios-bilthoven';
export { rigoureuzeFaceliftRietkapvillaBreukelenVechtstreek } from './rigoureuze-facelift-rietkapvilla-breukelen-vechtstreek';

// Importeer projecten voor de array
import { levensloopbestendigeniorenwoningenLoenen } from './levensloopbestendige-seniorenwoningen-loenen';
import { moderneRietkapvillaHetGooi } from './moderne-rietkapvilla-het-gooi';
import { transparanteBosvillaRhenen } from './transparante-bosvilla-rhenen';
import { villaGameren } from './villa-gameren';
import { verbouwLuxeVillaZandvoort } from './verbouw-luxe-villa-zandvoort';
import { luxeVillaUitzichtWaterrijkWoerden } from './luxe-villa-uitzicht-waterrijk-woerden';
import { modernPaviljoenWaterReeuwijk } from './modern-paviljoen-water-reeuwijk';
import { moderneVernieuwbouwvillaUitzichtGroenLelystad } from './moderne-vernieuwbouwvilla-uitzicht-groen-lelystad';
import { herbestemmingBoerderijLaagKeppelAchterhoek } from './herbestemming-boerderij-laag-keppel-achterhoek';
import { moderneVillaRietenKapBlaricum } from './moderne-villa-rieten-kap-blaricum';
import { monumentaleBoerderijAmstelAmstelland } from './uitbreiding-herbestemming-monumentale-boerderij-amstel-amstelland';
import { prefabHoutenVillaMetPatiosRuurlo } from './prefab-houten-villa-met-patios-ruurlo';
import { prefabHoutenVillaMetPatiosBilthoven } from './prefab-houten-villa-met-patios-bilthoven';
import { rigoureuzeFaceliftRietkapvillaBreukelenVechtstreek } from './rigoureuze-facelift-rietkapvilla-breukelen-vechtstreek';

/**
 * Centrale export van alle project details
 * Voeg hier nieuwe projecten toe wanneer je ze aanmaakt
 */
export const PROJECTS_DETAIL: ProjectDetail[] = [
  levensloopbestendigeniorenwoningenLoenen,
  moderneRietkapvillaHetGooi,
  transparanteBosvillaRhenen,
  villaGameren,
  verbouwLuxeVillaZandvoort,
  luxeVillaUitzichtWaterrijkWoerden,
  modernPaviljoenWaterReeuwijk,
  moderneVernieuwbouwvillaUitzichtGroenLelystad,
  herbestemmingBoerderijLaagKeppelAchterhoek,
  moderneVillaRietenKapBlaricum,
  monumentaleBoerderijAmstelAmstelland,
  prefabHoutenVillaMetPatiosRuurlo,
  prefabHoutenVillaMetPatiosBilthoven,
  rigoureuzeFaceliftRietkapvillaBreukelenVechtstreek,
  // Voeg hier nieuwe projecten toe, bijvoorbeeld:
  // moderneVillaZandvoort,
  // rietgedekteVilla,
  // etc.
];
