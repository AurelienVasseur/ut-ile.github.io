import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NavigationService } from '../../../../services/navigation/navigation.service';

import { Login } from '../../../../models/authentication/login';

import { AuthenticationService } from '../../../../services/authentication/authentication.service';
import { RoutesRecognized, ActivatedRoute } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../../../../models/user/user';

import { map, take } from 'rxjs/operators';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { Location } from '@angular/common';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent implements OnInit {
  model: Login;
  loginFormGroup: FormGroup;
  hidePassword: boolean;
  submitted: boolean;

  userNotFound: boolean;
  wrongPassword: boolean;

  @Output() passwordForgotten: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private navigationService: NavigationService,
    private authenticationService: AuthenticationService,
    private database: AngularFirestore,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.model = new Login();
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
    this.hidePassword = true;
    this.submitted = false;
    this.userNotFound = false;
    this.wrongPassword = false;
  }

  forgotPassword() {
    this.passwordForgotten.emit(true);
    this.location.replaceState("/login/forgot-password");
  }

  getEmailErrorMessage() {
    return this.loginFormGroup.get('email').hasError('required') ? 'Vous devez saisir un email' :
        this.loginFormGroup.get('email').hasError('email') ? 'Veuillez saisir un email valide' :
            this.userNotFound ? 'Aucun utilisateur ne possède cet email' : '';
  }

  getPasswordErrorMessage() {
    return this.loginFormGroup.get('password').hasError('required') ? 'Vous devez saisir un mot de passe' :
        this.wrongPassword ? 'Mot de passe invalide' :
            '';
  }

  setFormValuesToModel() {
    this.model.email = this.loginFormGroup.get('email').value;
    this.model.password = this.loginFormGroup.get('password').value;
  }


  onSubmit() { 
    if(this.loginFormGroup.valid)
    {
      this.setFormValuesToModel();
      var loginState: Promise<firebase.auth.UserCredential> = this.authenticationService.signIn(this.model.email, this.model.password);
      loginState.then((userCredential: firebase.auth.UserCredential) => {
        // User successfully registered, do next action here :
        console.log("Successfully Signed in ! ", userCredential);
        // Update email validation & last connexion date
        this.database.collection<User>("users").doc<User>(userCredential.user.uid).valueChanges().pipe(take(1)).subscribe((user) => {
          user.is_validated = userCredential.user.emailVerified;
          user.last_connexion = firebase.firestore.Timestamp.now();
          this.database.collection<User>("users").doc<User>(user.id).update(JSON.parse(JSON.stringify(user))).then(() => {
            console.log("Successfully updated user Verification status & last connexion date !");
          }).catch((error) => {
            console.error("Could not update user verification status & last connexion date : ", error);
          });
        });

        this.userNotFound = false;
        this.wrongPassword = false;
        this.submitted = true;
        this.redirectAfterLogin();
      }).catch((error) => {
        switch(error["code"]) {
          case "auth/user-not-found":
            this.userNotFound = true;
            this.loginFormGroup.get('email').setErrors({invalid: true});
            break;
          case "auth/wrong-password":
            this.wrongPassword = true;
            this.loginFormGroup.get('password').setErrors({invalid: true});
            break;
          case "auth/user-disabled":
            this.snackBar.open('Votre compte a été désactivé, vous ne pouvez pas vous connecter.', 'x', {duration: 5000});
            break;
          case "auth/too-many-requests":
            this.snackBar.open('Vos essais de connexions sont trop nombreux. Veuillez réessayer plus tard.', 'x', {duration: 5000});
            break;
          default:
            console.error("Error while Signing In : ", error);
        }
      });
    }
  }

  redirectAfterLogin() {
    this.route.queryParams.subscribe((params) => {
      if(params["continueUrl"]) {
        this.navigationService.redirectTo(params["continueUrl"]);
      }
      else {
        this.navigationService.redirectTo("/");
      }
    });
  }

}
