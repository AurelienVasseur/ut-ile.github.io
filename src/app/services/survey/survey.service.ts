import { Injectable } from '@angular/core';
import { SurveyCard } from '../../models/surveys/survey-card';

import { AngularFirestore } from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import { Badge } from 'src/app/models/badge';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(
    private database: AngularFirestore
  ) { }

  getSurveys() : Observable<SurveyCard[]> {
    return this.database.collection<SurveyCard>("survey-categories").valueChanges();
  }

  getBadgeById(id: string): Observable<Badge> {
    return this.database.collection<Badge>("badges").doc<Badge>(id).valueChanges();
  }
  
}
