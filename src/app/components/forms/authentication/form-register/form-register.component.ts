import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Register } from '../../../../models/authentication/register';

import { AuthenticationService } from '../../../../services/authentication/authentication.service';

import { AngularFirestore } from '@angular/fire/firestore'
import { User } from '../../../../models/user/user';

import defaultAvatars from 'src/assets/json/users/users-default-avatars.json';

import { UserService } from 'src/app/services/user/user.service';
import { take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css']
})
export class FormRegisterComponent implements OnInit {
  model: Register;
  registerFormGroup: FormGroup;
  hidePassword: boolean;
  submitted: boolean;
  emailAlreadyInUse: boolean;
  emailVerificationReSent: boolean;

  defaultAvatars: string[];

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private database: AngularFirestore,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.model = new Register();
    this.registerFormGroup = this.formBuilder.group({
      sur_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      first_name: ['', [Validators.maxLength(64)]],
      last_name: ['', [Validators.maxLength(64)]],
      captcha: ['', Validators.required]
    });
    this.hidePassword = true;
    this.submitted = false;
    this.emailAlreadyInUse = false;
    this.emailVerificationReSent = false;

    this.defaultAvatars = defaultAvatars;
  }

  getEmailErrorMessage() {
    return this.registerFormGroup.get('email').hasError('required') ? 'Veuillez saisir un email' :
        this.registerFormGroup.get('email').hasError('email') ? 'Email invalide' :
            this.emailAlreadyInUse ? 'Ce compte existe déjà' : '';
  }

  getPasswordErrorMessage() {
    return this.registerFormGroup.get('password').hasError('required') ? 'Veuillez saisir un mot de passe' :
        this.registerFormGroup.get('password').hasError('text') ? 'Mot de passe invalide' :
        this.registerFormGroup.get('password').hasError('minlength') ? 'Mot de passe trop court' : '';
  }

  getSurNameErrorMessage() {
    // TODO: manage surname unicity 
    return this.registerFormGroup.get('sur_name').hasError('required') ? 'Veuillez saisir un pseudonyme' :
        this.registerFormGroup.get('sur_name').hasError('text') ? 'Pseudonyme invalide' : 
        this.registerFormGroup.get('sur_name').hasError('maxlength') ? 'Pseudonyme trop long' : '';
  }

  getFirstNameErrorMessage() {
    return this.registerFormGroup.get('first_name').hasError('text') ? 'Prénom invalide' : 
            this.registerFormGroup.get('first_name').hasError('maxlength') ? 'Prénom trop long' : '';
  }

  getLastNameErrorMessage() {
    return this.registerFormGroup.get('last_name').hasError('text') ? 'Nom invalide' : 
            this.registerFormGroup.get('last_name').hasError('maxlength') ? 'Nom trop long' : '';
  }

  setFormValuesToModel() {
    this.model.sur_name = this.registerFormGroup.get('sur_name').value;
    this.model.email = this.registerFormGroup.get('email').value;
    this.model.password = this.registerFormGroup.get('password').value;
    this.model.first_name = this.registerFormGroup.get('first_name').value;
    this.model.last_name = this.registerFormGroup.get('last_name').value;
  }

  onSubmit() { 
    if(this.registerFormGroup.valid)
    {
      this.setFormValuesToModel();
      var registerState: Promise<firebase.auth.UserCredential> = this.authenticationService.signUp(this.model.email, this.model.password);
      registerState.then((userCredential: firebase.auth.UserCredential) => {
        // User successfully registered, do next action here :
        console.log("Successfully Signed up ! ", userCredential);
        this.sendEmailVerification();
        this.createUser(userCredential, this.model);
      }).catch((error) => {
        // User failed registering, warn user here :
        // error["code"] === "auth/email-already-in-use"
        // error["code"] === "auth/invalid-email"
        // error["code"] === "auth/weak-password"
        switch(error["code"]) {
          case "auth/email-already-in-use":
            this.emailAlreadyInUse = true;
            this.registerFormGroup.get('email').setErrors({invalid: true});
            break;
          case "auth/invalid-email":
            console.error("Invalid Email");
            break;
          case "auth/weak-password":
            console.error("Password is too weak");
            break;
          default:
            console.error("Error while Signing Up : ", error);
        }
      });
    }
  }

  createUser(userCredential: firebase.auth.UserCredential, userRegisterInfo: User) {
    // set credentials
    var newUser: User = new User(userCredential.user.uid, userCredential.user.email);
    // set user register info
    newUser.sur_name = userRegisterInfo.sur_name;
    newUser.first_name = userRegisterInfo.first_name;
    newUser.last_name = userRegisterInfo.last_name;
    // set random default avatar
    newUser.avatar = this.defaultAvatars[Math.floor(Math.random() * this.defaultAvatars.length)];
    
    this.userService.getUsers().pipe(take(1)).subscribe((users: User[]) => {
      // set user pid
      newUser.page_id = users.length + 1;

      // register user in database
      this.database.collection<User>("users").doc(newUser.id).set(JSON.parse(JSON.stringify(newUser))).then(() => {
        console.log("User added to database !", newUser);
      }).catch((error) => {
        console.error("Error while adding user to 'users' collection :", error);
      });
    });
  }

  sendEmailVerification(isResent?: boolean) {
    this.authenticationService.getCurrentUser().subscribe((user: firebase.User) => {
      user.sendEmailVerification().then(() => {
        this.emailAlreadyInUse = false;
        this.submitted = true;
        if(isResent) {
          this.emailVerificationReSent = true;
        this.snackBar.open('Un email de confirmation a été réenvoyé. Vérifiez votre boîte mail.', 'x', {duration: 5000});
        }
      }).catch((error) => {
        console.error(error);
      });
    });
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

}
