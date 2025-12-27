# Categorie Voorbeelden

## React Component met Filtering

Voorbeeld van een component die projecten filtert op categorieën:

```typescript
import React, { useState } from 'react';
import {
  PROJECTS_DETAIL,
  filterByCategory,
  getUniqueCategories,
  countByCategory,
  CATEGORY_LABELS,
  CATEGORY_COLORS
} from './data/projecten';
import type { ProjectCategory } from './data/types';

export const ProjectFilter: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | null>(null);

  // Haal alle beschikbare categorieën op
  const categories = getUniqueCategories(PROJECTS_DETAIL);
  const counts = countByCategory(PROJECTS_DETAIL);

  // Filter projecten
  const filteredProjects = selectedCategory
    ? filterByCategory(PROJECTS_DETAIL, selectedCategory)
    : PROJECTS_DETAIL;

  return (
    <div>
      {/* Categorie Filters */}
      <div className="flex gap-2 mb-8">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full ${
            !selectedCategory ? 'bg-amber-600 text-white' : 'bg-gray-100'
          }`}
        >
          Alle ({PROJECTS_DETAIL.length})
        </button>

        {categories.map((category) => {
          const colors = CATEGORY_COLORS[category];
          const isActive = selectedCategory === category;

          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full border ${
                isActive
                  ? 'bg-amber-600 text-white border-amber-600'
                  : `${colors.bg} ${colors.text} ${colors.border}`
              }`}
            >
              {CATEGORY_LABELS[category]} ({counts[category] || 0})
            </button>
          );
        })}
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.slug} className="border rounded-lg p-4">
            <img
              src={project.featuredImage.url}
              alt={project.featuredImage.alt}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <p className="text-gray-600 mb-4">{project.subtitle}</p>

            {/* Categorie Badges */}
            <div className="flex flex-wrap gap-2">
              {project.categories?.map((cat) => {
                const colors = CATEGORY_COLORS[cat];
                return (
                  <span
                    key={cat}
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${colors.bg} ${colors.text} ${colors.border}`}
                  >
                    {CATEGORY_LABELS[cat]}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
```

## Portfolio Sectie met Featured Projects

```typescript
import React from 'react';
import { PROJECTS_DETAIL, filterByCategory } from './data/projecten';

export const FeaturedProjects: React.FC = () => {
  // Alleen uitgelichte projecten tonen
  const featuredProjects = filterByCategory(PROJECTS_DETAIL, 'uitgelicht');

  return (
    <section className="py-20">
      <h2 className="text-4xl font-bold mb-10">Uitgelichte Projecten</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {featuredProjects.map((project) => (
          <div key={project.slug} className="relative group">
            <img
              src={project.featuredImage.url}
              alt={project.featuredImage.alt}
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="text-white text-center">
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p>{project.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
```

## In Aanbouw Badge

```typescript
import React from 'react';
import type { ProjectDetail } from './data/types';
import { CATEGORY_LABELS } from './data/projecten';

export const ProjectCard: React.FC<{ project: ProjectDetail }> = ({ project }) => {
  const isInProgress = project.categories?.includes('in-aanbouw');

  return (
    <div className="relative">
      {isInProgress && (
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-yellow-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
            {CATEGORY_LABELS['in-aanbouw']}
          </span>
        </div>
      )}

      <img
        src={project.featuredImage.url}
        alt={project.featuredImage.alt}
        className="w-full h-64 object-cover"
      />

      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-600">{project.subtitle}</p>
      </div>
    </div>
  );
};
```

## Multi-Category Filter (OR logica)

```typescript
import React, { useState } from 'react';
import {
  PROJECTS_DETAIL,
  filterByCategories,
  CATEGORY_LABELS
} from './data/projecten';
import type { ProjectCategory } from './data/types';

export const AdvancedFilter: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<ProjectCategory[]>([]);

  const toggleCategory = (category: ProjectCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Filter op alle geselecteerde categorieën
  const filteredProjects =
    selectedCategories.length > 0
      ? filterByCategories(PROJECTS_DETAIL, selectedCategories)
      : PROJECTS_DETAIL;

  return (
    <div>
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4">Filter op categorieën:</h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => {
            const category = key as ProjectCategory;
            const isSelected = selectedCategories.includes(category);

            return (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`px-4 py-2 rounded-full border transition-colors ${
                  isSelected
                    ? 'bg-amber-600 text-white border-amber-600'
                    : 'bg-white border-gray-300 hover:border-amber-600'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        {filteredProjects.length} project{filteredProjects.length !== 1 ? 'en' : ''} gevonden
      </p>

      {/* Project lijst */}
      <div className="space-y-4">
        {filteredProjects.map((project) => (
          <div key={project.slug} className="border-b pb-4">
            <h4 className="font-bold">{project.title}</h4>
            <p className="text-gray-600">{project.locationLabel}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
```

## Categorie Statistieken Dashboard

```typescript
import React from 'react';
import {
  PROJECTS_DETAIL,
  countByCategory,
  CATEGORY_LABELS,
  CATEGORY_COLORS
} from './data/projecten';

export const ProjectStats: React.FC = () => {
  const counts = countByCategory(PROJECTS_DETAIL);
  const total = PROJECTS_DETAIL.length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {Object.entries(counts).map(([category, count]) => {
        const cat = category as keyof typeof CATEGORY_LABELS;
        const colors = CATEGORY_COLORS[cat];
        const percentage = ((count / total) * 100).toFixed(0);

        return (
          <div
            key={category}
            className={`p-6 rounded-lg border ${colors.bg} ${colors.border}`}
          >
            <div className={`text-3xl font-bold mb-2 ${colors.text}`}>
              {count}
            </div>
            <div className="text-sm font-medium text-gray-700">
              {CATEGORY_LABELS[cat]}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {percentage}% van totaal
            </div>
          </div>
        );
      })}
    </div>
  );
};
```
