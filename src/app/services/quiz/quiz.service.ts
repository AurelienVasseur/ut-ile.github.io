import { Injectable } from '@angular/core';
import { QuizCard } from '../../models/quiz/quiz-card';

import { AngularFirestore } from '@angular/fire/firestore'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(
    private database: AngularFirestore
  ) { }

  getQuizzes() : Observable<QuizCard[]> {
    return this.database.collection<QuizCard>("quiz-cards").valueChanges();
    // return this.categories;
  }

}
