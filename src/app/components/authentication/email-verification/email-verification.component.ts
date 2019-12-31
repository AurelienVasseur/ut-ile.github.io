import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { NavigationService } from '../../../services/navigation/navigation.service';

import { AngularFireAuth } from '@angular/fire/auth';

import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/models/user/user';
import { take } from 'rxjs/operators';

import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {
  verified: boolean;
  invalidActionCode: boolean;

  constructor(
    private route: ActivatedRoute,
    private fireAuth: AngularFireAuth,
    private navigationService: NavigationService,
    private database: AngularFirestore,
    private authenticationService: AuthenticationService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle("Vérification d'email - UTile");
    this.verified = false;
    this.invalidActionCode = false;
    this.route.queryParams.subscribe((params) => {
      var mode: string = params["mode"];
      var actionCode: string = params["oobCode"];
      if(mode === "verifyEmail") {
        this.handleVerifyEmail(actionCode);
      }
      else {
        // Wrong mode
        this.navigationService.redirectTo('/auth');
      }
    });
  }

  handleVerifyEmail(actionCode: string) {
    this.fireAuth.auth.applyActionCode(actionCode).then(() => {
      // user is verified !
      this.verified = true;
      // update verification status in database
      var observableAuthUser: Observable<firebase.User> = this.authenticationService.getCurrentUser();
      observableAuthUser.subscribe((authUser) => {
        if(authUser) {
          this.database.collection<User>("users").doc<User>(authUser.uid).valueChanges().pipe(take(1)).subscribe((user: User) => {
            console.log(authUser);
            user.is_validated = authUser.emailVerified;
            console.log(user);
            this.database.collection<User>("users").doc(user.id).update(JSON.parse(JSON.stringify(user))).then(() => {
              console.log("Successfully updated user Verification status !");
            }).catch((error) => {
              console.error("Error: could not update user verification status : ", error);
            });
          });
        }
      });
    }).catch((error) => {
      // Code is invalid or has expired.
      // error["code"] === "auth/invalid-action-code"
      // This can happen if the code is malformed, expired, or has already been used.
      console.error("Error: Action code is invalid or has expired : ", error);
      this.invalidActionCode = true;
    })
  }

  redirectToHome() {
    this.navigationService.redirectTo("/");
  }

}
