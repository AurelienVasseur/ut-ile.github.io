import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Badge } from 'src/app/models/badge';

@Injectable({
  providedIn: 'root'
})
export class BadgeService {

  constructor(
    private database: AngularFirestore
  ) { }

  getBadgeById(id: string): Observable<Badge> {
    return this.database.collection<Badge>("badges").doc<Badge>(id).valueChanges();
  }

}
