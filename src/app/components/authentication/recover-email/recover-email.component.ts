import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { NavigationService } from '../../../services/navigation/navigation.service';

import { AngularFireAuth } from '@angular/fire/auth';

import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/models/user/user';
import { take } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-recover-email',
  templateUrl: './recover-email.component.html',
  styleUrls: ['./recover-email.component.css']
})
export class RecoverEmailComponent implements OnInit {
  restoredEmail: string;
  emailRestored: boolean;
  passwordResetEmailSent: boolean;
  wrongActionCode: boolean;

  constructor(
    private route: ActivatedRoute,
    private navigationService: NavigationService,
    private fireAuth: AngularFireAuth,
    private database: AngularFirestore,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle("Récupération d'email - UTile");
    this.route.queryParams.subscribe((params) => {
      var mode: string = params["mode"];
      var actionCode: string = params["oobCode"];
      if(mode === "recoverEmail") {
        this.emailRestored = false;
        this.passwordResetEmailSent = false;
        this.wrongActionCode = false;
        this.handleRecoverEmail(actionCode);
      }
      else {
        // Wrong mode
        this.navigationService.redirectTo('/auth');
      }
    });
  }

  handleRecoverEmail(actionCode: string) {
    var currentEmail = null;
    this.fireAuth.auth.checkActionCode(actionCode).then((info: firebase.auth.ActionCodeInfo) => {
      // Get current email
      currentEmail = info["data"]["fromEmail"];
      // Get old email
      this.restoredEmail = info["data"]["email"];
      // Revert to old email
      return this.fireAuth.auth.applyActionCode(actionCode);
    }).then(() => {
      // Save old email in database
      this.database.collection<User>("users").valueChanges().pipe(take(1)).subscribe((users: User[]) => {
        var user: User = users.find((user) => user.email === currentEmail);
        user.email = this.restoredEmail;
        user.is_validated = true;
        this.database.collection<User>("users").doc(user.id).update(JSON.parse(JSON.stringify(user))).then(() => {
          console.log("Successfully restored email in database : ", user);
        }).catch((error) => {
          console.error("Error: could not restore email in database : ", error);
        });
      });
      this.emailRestored = true;
      this.fireAuth.auth.sendPasswordResetEmail(this.restoredEmail).then(() => {
        this.passwordResetEmailSent = true;
      }).catch((error) => {
        console.error(`Error: Could not send password reset code to '${this.restoredEmail}' : `, error);
      });
    }).catch((error) => {
      this.wrongActionCode = true;
        console.error("Error: Action code is invalid or has expired : ", error);
    });
  }

  redirectToHome() {
    this.navigationService.redirectTo("/");
  }

}
