import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-reset-password',
  templateUrl: './form-reset-password.component.html',
  styleUrls: ['./form-reset-password.component.css']
})
export class FormResetPasswordComponent implements OnInit {
  email: string;
  resetPasswordFormGroup: FormGroup;
  submitted: boolean;

  userNotFound: boolean;
  emailPasswordResetReSent: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private database: AngularFirestore,
    private fireAuth: AngularFireAuth,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.resetPasswordFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
    this.userNotFound = false;
    this.emailPasswordResetReSent = false;
  }

  getEmailErrorMessage() {
    return this.resetPasswordFormGroup.get('email').hasError('required') ? 'Vous devez saisir un email' :
      this.resetPasswordFormGroup.get('email').hasError('email') ? 'Veuillez saisir un email valide' :
        this.userNotFound ? 'Aucun utilisateur ne possède cet email' : '';
  }

  setFormValuesToModel() {
    this.email = this.resetPasswordFormGroup.get('email').value;
  }

  onSubmit() {
    if (this.resetPasswordFormGroup.valid) {
      this.setFormValuesToModel();
      this.sendEmailResetPassword();
    }
  }

  sendEmailResetPassword(isResent?: boolean) {
    this.fireAuth.auth.sendPasswordResetEmail(this.email).then(() => {
      this.submitted = true;
      if(isResent) {
        this.emailPasswordResetReSent = true;
        this.snackBar.open('Un email de réinitialisation de votre mot de passe a été envoyé. Vérifiez votre boîte mail.', 'x', {duration: 5000});
      }
      console.log(`Successfully sent Email password reset to ${this.email}`);
    }).catch((error) => {
      switch (error["code"]) {
        case "auth/user-not-found":
          this.userNotFound = true;
          break;
        default:
          console.error(`Error: could not send email password reset to ${this.email} : `, error);
          break;
      }
    });
  }

}
