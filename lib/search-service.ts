import { serviceCategories } from './site-data';

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'category' | 'item';
  url: string;
  score: number;
}

// Create searchable items from service categories and their items
const searchableItems: SearchResult[] = [];

serviceCategories.forEach((category, categoryIndex) => {
  // Add the category itself
  searchableItems.push({
    id: `category-${categoryIndex}`,
    title: category.name,
    description: category.description,
    category: category.name,
    type: 'category',
    url: `/services/${category.name.toLowerCase().replace(/\s+/g, '-')}`,
    score: 0,
  });

  // Add individual items
  category.items.forEach((item, itemIndex) => {
    searchableItems.push({
      id: `item-${categoryIndex}-${itemIndex}`,
      title: item,
      description: `${item} - ${category.name}`,
      category: category.name,
      type: 'item',
      url: `/services/${category.name.toLowerCase().replace(/\s+/g, '-')}#${item.toLowerCase().replace(/\s+/g, '-')}`,
      score: 0,
    });
  });
});

// Optimized fuzzy search algorithm using Levenshtein distance and term matching
function levenshteinDistance(str1: string, str2: string): number {
  const matrix = [];
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[str2.length][str1.length];
}

function calculateRelevanceScore(query: string, item: SearchResult): number {
  const queryLower = query.toLowerCase();
  const titleLower = item.title.toLowerCase();
  const descriptionLower = item.description.toLowerCase();
  const categoryLower = item.category.toLowerCase();

  let score = 0;

  // Character-level matching for single letters
  if (queryLower.length === 1) {
    // Score based on first letter position and title relevance
    if (titleLower.startsWith(queryLower)) {
      score += 80; // High score for starting letter
    } else if (titleLower.includes(queryLower)) {
      score += 40; // Medium score for containing letter
    }
    
    // Boost for service categories starting with letter
    if (categoryLower.startsWith(queryLower)) {
      score += 30;
    }
    
    // Bonus for short queries
    score += 20;
  } else {
    // Multi-character queries
    
    // Exact match in title gets highest score
    if (titleLower.includes(queryLower)) {
      score += 100;
    }

    // Exact match in description
    if (descriptionLower.includes(queryLower)) {
      score += 50;
    }

    // Exact match in category
    if (categoryLower.includes(queryLower)) {
      score += 30;
    }

    // Word boundary matches
    const queryWords = queryLower.split(/\s+/);
    const titleWords = titleLower.split(/\s+/);
    
    queryWords.forEach(queryWord => {
      titleWords.forEach(titleWord => {
        if (titleWord.startsWith(queryWord)) {
          score += 25;
        }
        if (titleWord.includes(queryWord)) {
          score += 15;
        }
      });
    });

    // Levenshtein distance for fuzzy matching (normalized by length)
    const distance = levenshteinDistance(queryLower, titleLower);
    const maxLen = Math.max(queryLower.length, titleLower.length);
    const similarity = 1 - (distance / maxLen);
    score += similarity * 30;
  }

  // Boost score for shorter titles (more specific)
  score += (10 - Math.min(titleLower.length, 10)) * 2;

  // Category type gets slight boost for single letters
  if (item.type === 'category' && queryLower.length === 1) {
    score += 10;
  } else if (item.type === 'category') {
    score += 5;
  }

  return score;
}

export function searchServices(query: string, limit: number = 8): SearchResult[] {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const trimmedQuery = query.trim();
  
  // Calculate scores for all items
  const scoredItems = searchableItems.map(item => ({
    ...item,
    score: calculateRelevanceScore(trimmedQuery, item)
  }));

  // Dynamic threshold based on query length
  const minThreshold = trimmedQuery.length === 1 ? 30 : 10;
  
  const filteredItems = scoredItems
    .filter(item => item.score > minThreshold) // Dynamic relevance threshold
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
  
  return filteredItems;
}
