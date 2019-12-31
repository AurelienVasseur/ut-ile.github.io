import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { NavigationService } from '../../../services/navigation/navigation.service';

import { AngularFireAuth } from '@angular/fire/auth';

import { AngularFirestore } from '@angular/fire/firestore';

import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  displayForm: boolean;
  invalidActionCode: boolean;
  hidePassword: boolean;

  email: string;
  actionCode: string;
  resetPasswordFormGroup: FormGroup;
  password: string;
  submitted: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private fireAuth: AngularFireAuth,
    private navigationService: NavigationService,
    private database: AngularFirestore,
    private authenticationService: AuthenticationService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle("Réinitialisation de mot de passe - UTile");
    this.route.queryParams.subscribe((params) => {
      var mode: string = params["mode"];
      var actionCode: string = params["oobCode"];
      if(mode === "resetPassword") {
        this.displayForm = false;
        this.invalidActionCode = false;
        this.handleResetPassword(actionCode);
      }
      else {
        // Wrong mode
        this.navigationService.redirectTo('/auth');
      }
    });
  }

  getPasswordErrorMessage() {
    return this.resetPasswordFormGroup.get('password').hasError('required') ? 'Vous devez saisir un mot de passe' : '';
  }

  handleResetPassword(actionCode: string) {
    this.fireAuth.auth.verifyPasswordResetCode(actionCode).then((email: string) => {
      this.email = email;
      this.resetPasswordFormGroup = this.formBuilder.group({
        password: ['', [Validators.required]]
      });
      this.actionCode = actionCode;
      this.hidePassword = true;
      this.submitted = false;
      this.displayForm = true;
    }).catch((error) => {
      this.invalidActionCode = true;
      console.error("Error: invalid or expired action code : ", error);
    });
  }

  setFormValuesToModel() {
    this.password = this.resetPasswordFormGroup.get('password').value;
  }

  onSubmit() {
    if(this.resetPasswordFormGroup.valid) {
      this.setFormValuesToModel();
      this.fireAuth.auth.confirmPasswordReset(this.actionCode, this.password).then(() => {
        this.submitted = true;
        console.log(`Successfully reset password of '${this.email}' !`);
      }).catch((error) => {
        console.error("Error: code expired or password too weak : ", error);
        if(error["code"] === "auth/invalid-action-code") {
          this.invalidActionCode = true;
        }
      });
    }
  }

  redirectToHome() {
    this.navigationService.redirectTo("/");
  }

}
