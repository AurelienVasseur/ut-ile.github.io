import { Injectable } from '@angular/core';

import { SuggestionCategories } from '../../models/form/suggestion-categories';
import suggestCategories from '../../../assets/json/forms/suggestions-categories/suggest-categories.json';

@Injectable({
  providedIn: 'root'
})
export class ContributeService {
  suggestionCategories: SuggestionCategories;
  constructor()
  { 
    this.suggestionCategories = suggestCategories;
  }

  getSuggestCategoriesBySlug(slug: string): string[] {
    return this.suggestionCategories[slug];
  }
}
