import { Injectable } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Category } from '../../models/category';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Badge } from 'src/app/models/badge';

@Injectable({
  providedIn: 'root'
})
export class StudyService {
  categories: Array<Category>;

  constructor(
    private database: AngularFirestore,
    private storage: AngularFireStorage
  ) { }

    /*
  findCategoryBySlug(slug: string): Category {
    return this.categories.find((category) => category.slug === slug);
  }
  */

  getCategories() : Observable<Category[]> {
    return this.database.collection<Category>("study-categories").valueChanges();
    // return this.categories;
  }

  getBadgeById(id: string): Observable<Badge> {
    return this.database.collection<Badge>("badges").doc<Badge>(id).valueChanges();
  }

}
