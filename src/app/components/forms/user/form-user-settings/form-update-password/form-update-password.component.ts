import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-form-update-password',
  templateUrl: './form-update-password.component.html',
  styleUrls: ['./form-update-password.component.css']
})
export class FormUpdatePasswordComponent implements OnInit {
  updatePasswordFormGroup: FormGroup;
  currentPassword: string;
  newPassword: string;

  hideCurrentPassword: boolean;
  hideNewPassword: boolean;

  wrongCurrentPassword: boolean;
  wrongNewPassword: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.hideCurrentPassword = true;
    this.hideNewPassword = true;
    this.wrongCurrentPassword = false;
    this.wrongNewPassword = false;
    this.updatePasswordFormGroup = this.formBuilder.group({
      current_password: ['', [Validators.required, Validators.maxLength(128)]],
      new_password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(128)]]
    });
  }

  setFormValuesToModel() {
    this.currentPassword = this.updatePasswordFormGroup.get('current_password').value;
    this.newPassword = this.updatePasswordFormGroup.get('new_password').value;
  }

  onSubmit() {
    if(this.updatePasswordFormGroup.valid) {
      this.setFormValuesToModel();
      this.tryUpdatePassword();
    }
  }

  tryUpdatePassword() {
    this.authenticationService.getCurrentUser().subscribe((user) => {
      user.reauthenticateWithCredential(this.authenticationService.createNewUserCredential(user.email, this.currentPassword)).then(() => {
        console.log("Successfully relogged in with new credentials !");
        this.wrongCurrentPassword = false;
        user.updatePassword(this.newPassword).then(() => {
          console.log("Successfully updated password !");
          this.updatePasswordFormGroup.disable();
          this.snackBar.open("Votre mot de passe a bien été mis à jour !", 'x', { duration: 5000 });
        }).catch((error) => {
          console.error("Error: Could not update password : ", error);
          if(error["code"] === "auth/weak-password") {
            this.wrongNewPassword = true;
            this.updatePasswordFormGroup.get('new_password').setErrors({invalid: true});
          }
        });
      }).catch((error) => {
        console.log("Error: Could not relogin with new credentials : ", error);
        if(error["code"] === "auth/wrong-password") {
          this.wrongCurrentPassword = true;
          this.updatePasswordFormGroup.get('current_password').setErrors({invalid: true});
        }
      });
    });
  }


  getCurrentPasswordErrorMessage() {
    return this.updatePasswordFormGroup.get('current_password').hasError('required') ? 'Vous devez saisir votre mot de passe' :
        this.wrongCurrentPassword ? 'Mot de passe incorrect' :
            this.updatePasswordFormGroup.get('current_password').hasError('maxlength') ? 'Mot de passe trop long' : '';
  }

  getNewPasswordErrorMessage() {
    return this.updatePasswordFormGroup.get('new_password').hasError('required') ? 'Vous devez saisir un nouveau mot de passe' :
        this.wrongNewPassword ? 'Mot de passe invalide' :
            this.updatePasswordFormGroup.get('new_password').hasError('minlength') ? 'Mot de passe trop court' :
              this.updatePasswordFormGroup.get('new_password').hasError('maxlength') ? 'Mot de passe trop long' : '';
  }

}
