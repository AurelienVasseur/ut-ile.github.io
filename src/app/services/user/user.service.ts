import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/models/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private database: AngularFirestore
  ) { }

  getUsers() {
    return this.database.collection<User>("users").valueChanges();
  }

  getUserById(id: string) {
    return this.database.collection<User>("users").doc<User>(id).valueChanges();
  }

  getUserReference(id: string) {
    return this.database.collection<User>("users").doc<User>(id);
  }

}
