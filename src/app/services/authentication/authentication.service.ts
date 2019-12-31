import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private fireAuth: AngularFireAuth
  ) { }

    getCurrentUser(): Observable<firebase.User> {
      return this.fireAuth.authState;
    }

    createNewUserCredential(userEmail: string, userPassword: string): firebase.auth.AuthCredential {
      return firebase.auth.EmailAuthProvider.credential(userEmail, userPassword);
    }

    updateEmail(email: string): Promise<void> {
      var promise: Promise<void>;
      this.getCurrentUser().subscribe((user) => {
        if(user.email !== email) {
          promise = user.updateEmail(email);
        }
        else {
          promise = new Promise((resolve, reject) => {
            reject("Email is the same, update is not required.");
          })
        }
      });
      return promise;
    }

    signUp(email: string, password: string): Promise<firebase.auth.UserCredential> {
      return this.fireAuth
        .auth
        .createUserWithEmailAndPassword(email, password);
    }

    signIn(email: string, password: string): Promise<firebase.auth.UserCredential> {
      return this.fireAuth
        .auth
        .signInWithEmailAndPassword(email, password);
    }

    signOut(): Promise<void> {
      return this.fireAuth.auth.signOut();
    }

    deleteCurrentUser() {
      this.fireAuth.auth.currentUser.delete().then(() => {
        console.log("Successfully deleted user.");
      }).catch((error) => {
        console.error("Error: Could not delete user : ", error);
      })
    }

}
