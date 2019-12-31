import { Injectable } from '@angular/core';
import { DocCategory } from '../../models/documentation/doc-category';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Badge } from 'src/app/models/badge';
import { DocSubcategory } from 'src/app/models/documentation/doc-subcategory';
import { DocQuestion } from 'src/app/models/documentation/doc-question';

@Injectable({
  providedIn: 'root'
})
export class DocumentationService {

  constructor(
    private database: AngularFirestore,
    private storage: AngularFireStorage
  ) { }

  getCategories() : Observable<DocCategory[]> {
    return this.database.collection<DocCategory>("documentation-categories").valueChanges();
  }

  getSubcategories() : Observable<DocSubcategory[]> {
    return this.database.collection<DocSubcategory>("documentation-subcategories").valueChanges();
  }

  getQuestions(): Observable<DocQuestion[]> {
    return this.database.collection<DocQuestion>("documentation-questions").valueChanges();
  }

  getBadgeById(id: string): Observable<Badge> {
    return this.database.collection<Badge>("badges").doc<Badge>(id).valueChanges();
  }

  getSubcategoryById(id: string) : Observable<DocSubcategory> {
    return this.database.collection<DocSubcategory>("documentation-subcategories").doc<DocSubcategory>(id).valueChanges();
  }

  getQuestionById(id: string) : Observable<DocQuestion> {
    return this.database.collection<DocQuestion>("documentation-questions").doc<DocQuestion>(id).valueChanges();
  }

}
