import type { ProjectDetail, ProjectCategory } from '../types';

/**
 * Filter projecten op categorie
 * @param projects - Array van ProjectDetail objecten
 * @param category - Categorie om op te filteren
 * @returns Gefilterde array van projecten
 */
export const filterByCategory = (
  projects: ProjectDetail[],
  category: ProjectCategory
): ProjectDetail[] => {
  return projects.filter(
    (project) => project.categories?.includes(category)
  );
};

/**
 * Filter projecten op meerdere categorieën (OR logica)
 * @param projects - Array van ProjectDetail objecten
 * @param categories - Array van categorieën
 * @returns Projecten die minstens één van de categorieën hebben
 */
export const filterByCategories = (
  projects: ProjectDetail[],
  categories: ProjectCategory[]
): ProjectDetail[] => {
  return projects.filter((project) =>
    categories.some((cat) => project.categories?.includes(cat))
  );
};

/**
 * Haal alle unieke categorieën op uit een project lijst
 * @param projects - Array van ProjectDetail objecten
 * @returns Array van unieke categorieën
 */
export const getUniqueCategories = (
  projects: ProjectDetail[]
): ProjectCategory[] => {
  const categories = new Set<ProjectCategory>();
  projects.forEach((project) => {
    project.categories?.forEach((cat) => categories.add(cat));
  });
  return Array.from(categories);
};

/**
 * Tel het aantal projecten per categorie
 * @param projects - Array van ProjectDetail objecten
 * @returns Object met categorie als key en aantal als value
 */
export const countByCategory = (
  projects: ProjectDetail[]
): Record<string, number> => {
  const counts: Record<string, number> = {};

  projects.forEach((project) => {
    project.categories?.forEach((cat) => {
      counts[cat] = (counts[cat] || 0) + 1;
    });
  });

  return counts;
};

/**
 * Categorie labels voor display
 */
export const CATEGORY_LABELS: Partial<Record<string, string>> = {
  'nieuwbouw': 'Nieuwbouw',
  'verbouw': 'Verbouw',
  'verduurzaming': 'Verduurzaming',
  'aanbouw': 'Aanbouw',
  'in-aanbouw': 'In Aanbouw',
  'uitgelicht': 'Uitgelicht'
};

/**
 * Categorie kleuren voor badges/UI
 */
export const CATEGORY_COLORS: Partial<Record<string, { bg: string; text: string; border: string }>> = {
  'nieuwbouw': {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200'
  },
  'verbouw': {
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    border: 'border-purple-200'
  },
  'verduurzaming': {
    bg: 'bg-green-50',
    text: 'text-green-700',
    border: 'border-green-200'
  },
  'aanbouw': {
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    border: 'border-orange-200'
  },
  'in-aanbouw': {
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
    border: 'border-yellow-200'
  },
  'uitgelicht': {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200'
  }
};
