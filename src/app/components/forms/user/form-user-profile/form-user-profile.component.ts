import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/services/user/user.service';
import { take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { AngularFirestore } from '@angular/fire/firestore';

import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { NgxImageCompressService } from 'ngx-image-compress';
import { AngularFireStorage } from '@angular/fire/storage';

import formations from 'src/assets/json/users/formations.json';

@Component({
  selector: 'app-form-user-profile',
  templateUrl: './form-user-profile.component.html',
  styleUrls: ['./form-user-profile.component.css']
})
export class FormUserProfileComponent implements OnInit {
  @Input() user: User;
  profileFormGroup: FormGroup;
  model: User;
  password: string;

  hidePassword: boolean;
  wrongPassword: boolean;

  formations: string[] = formations;

  editProfile: boolean;


  newAvatar: string;


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar,
    private database: AngularFirestore,
    private imageCompress: NgxImageCompressService,
    private storage: AngularFireStorage
  ) { }

  ngOnInit() {
    this.editProfile = false;
    this.hidePassword = true;
    this.wrongPassword = false;
    this.profileFormGroup = this.formBuilder.group({
      sur_name: ['', [Validators.required, Validators.maxLength(64)]],
      email: ['', [Validators.required, Validators.email]],
      first_name: ['', [Validators.maxLength(64)]],
      last_name: ['', [Validators.maxLength(64)]],
      formation: ['', []],
      password: ['', [Validators.required, Validators.maxLength(128)]]
    });
    this.profileFormGroup.disable();
    this.model = Object.assign({}, JSON.parse(JSON.stringify(this.user)));
    this.initializeFormValues();
  }

  initializeFormValues() {
    this.profileFormGroup.get('sur_name').setValue(this.model.sur_name);
    this.profileFormGroup.get('email').setValue(this.model.email);
    this.profileFormGroup.get('first_name').setValue(this.model.first_name);
    this.profileFormGroup.get('last_name').setValue(this.model.last_name);
    this.profileFormGroup.get('formation').setValue(this.model.formation);
  }

  toggleEditProfile() {
    this.editProfile = !this.editProfile;
    if (this.editProfile) {
      this.profileFormGroup.enable();
    }
    else {
      this.profileFormGroup.disable();
    }
  }

  compressFile() {
    this.imageCompress.uploadFile().then(({ image, orientation }) => {
      console.warn('Size in bytes was:', this.imageCompress.byteCount(image));
      let fileCompleteType: string = image.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0];
      let fileInfos: string[] = fileCompleteType.split('/');
      let fileType: string = fileInfos[0];
      let fileExtension: string = fileInfos[1];

      let oneMoInBytes: number = 1048576;
      let toleranceRange: number = 1.5;
      let sizeLimit: number = oneMoInBytes * toleranceRange;
      if (fileType === "image") {
        let imageSize = this.imageCompress.byteCount(image);
        if (imageSize < sizeLimit) {
          this.imageCompress.compressFile(image, orientation, 100, 25).then(
            compressedImage => {
              this.newAvatar = compressedImage;
              console.warn('Size in bytes is now:', this.imageCompress.byteCount(compressedImage));
            }
          );
        }
        else {
          this.snackBar.open("L'avatar choisi est trop volumineux. La taille maximale autorisée est de 1 Mo.", 'x', { duration: 5000 });
        }
      }
      else {
        this.snackBar.open("L'avatar choisi n'est pas une image. Veuillez réessayer.", 'x', { duration: 5000 });
      }
    });
  }

  dataURItoBlob(dataURI): Blob {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
  }

  setFormValuesToModel() {
    this.model.sur_name = this.profileFormGroup.get('sur_name').value;
    this.model.email = this.profileFormGroup.get('email').value;
    this.model.first_name = this.profileFormGroup.get('first_name').value;
    this.model.last_name = this.profileFormGroup.get('last_name').value;
    this.model.formation = this.profileFormGroup.get('formation').value;
    this.password = this.profileFormGroup.get('password').value;
  }

  onSubmit() {
    if (this.profileFormGroup.valid) {
      this.setFormValuesToModel();
      this.tryUpdateUserInDatabase();
    }
  }

  tryUpdateUserInDatabase() {
    // if email has been modified
    if (this.model.email !== this.user.email) {
      this.authenticationService.getCurrentUser().subscribe((user) => {
        user.reauthenticateWithCredential(this.authenticationService.createNewUserCredential(user.email, this.password)).then(() => {
          console.log("Successfully relogged in with new credentials !");
          this.wrongPassword = false;
          user.updateEmail(this.model.email).then(() => {
            // update user in database
            this.model.is_validated = false;
            this.updateUserInDatabase();
            // send verification mail to new email
            user.sendEmailVerification().then(() => {
              console.log(`Successfully sent verification to ${user.email} !`);
            }).catch((error) => {
              console.error(`Error: Could not send verification email to "${user.email}" : `, error);
            });
          }).catch((error) => {
            console.error("Error: Could not update email : ", error);
            // restore to old email and update other fields in database
            this.model.email = this.user.email;
            this.updateUserInDatabase();
            if (error["code"] === "auth/requires-recent-login") {
              this.snackBar.open("Veuillez vous reconnecter pour modifier votre email. Votre profil a été mis à jour.", 'x', { duration: 5000 });
            }
          });
        }).catch((error) => {
          console.error("Error: Could not relogin with new credentials : ", error);
          if (error["code"] === "auth/wrong-password") {
            this.wrongPassword = true;
            this.profileFormGroup.get('password').setErrors({ invalid: true });
          }
        });
      });
    }
    // if email has NOT been modified
    else {
      this.updateUserInDatabase();
    }
  }

  updateUserInDatabase() {
    if(this.newAvatar) {
      let fileName: string = "avatar-" + this.user.id;
      let avatarFile:File = this.getFileFromDataURI(this.newAvatar, fileName);
      this.storage.upload('/users/avatars/' + this.user.id + "/" + fileName, avatarFile).then((uploadTaskSnapshot) => {
        uploadTaskSnapshot.ref.getDownloadURL().then((downloadUrl) => {
          this.model.avatar = downloadUrl;
          this.updateUserInFirestore();
        }).catch((error) => {
          console.error("Error: Could not get download url of new avatar : ", error);
          this.updateUserInFirestore();
        });
      }).catch((error) => {
        console.error("Error: Could not upload new avatar to FireStorage : ", error);
        this.updateUserInFirestore();
      });
    }
    else {
      this.updateUserInFirestore();
    }
  }

  updateUserInFirestore() {
    this.userService.getUserReference(this.user.id).update(JSON.parse(JSON.stringify(this.model))).then(() => {
      console.log(`Successfully updated user ${this.model.sur_name} : `, this.model);
      this.snackBar.open('Votre profil a bien été mis à jour.', 'x', { duration: 5000 });
    }).catch((error) => {
      console.error(`Error: Could not update user ${this.user.sur_name} : `, error);
      this.snackBar.open(`Une erreur est survenue lors de la sauvegarde de vos modifications : ${error.message}`, 'x', { duration: 5000 });
    });
  }

  getFileFromDataURI(dataURI, fileName: string): File {
    let fileCompleteType: string = dataURI.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0];
    let imageBlob: Blob = this.dataURItoBlob(dataURI.split(',')[1]);
    let imageFile: File = new File([imageBlob], fileName, { type: fileCompleteType });
    return imageFile;
  }



  getSurNameErrorMessage() {
    // TODO: manage surname unicity 
    return this.profileFormGroup.get('sur_name').hasError('required') ? 'Veuillez saisir un pseudonyme' :
      this.profileFormGroup.get('sur_name').hasError('text') ? 'Pseudonyme invalide' :
        this.profileFormGroup.get('sur_name').hasError('maxlength') ? 'Pseudonyme trop long' : '';
  }

  getEmailErrorMessage() {
    return this.profileFormGroup.get('email').hasError('required') ? 'Veuillez saisir un email' :
      this.profileFormGroup.get('email').hasError('email') ? 'Email invalide' :
        '';
  }

  getFirstNameErrorMessage() {
    return this.profileFormGroup.get('first_name').hasError('text') ? 'Prénom invalide' :
      this.profileFormGroup.get('first_name').hasError('maxlength') ? 'Prénom trop long' : '';
  }

  getLastNameErrorMessage() {
    return this.profileFormGroup.get('last_name').hasError('text') ? 'Nom invalide' :
      this.profileFormGroup.get('last_name').hasError('maxlength') ? 'Nom trop long' : '';
  }

  getFormationErrorMessage() {
    return this.profileFormGroup.get('formation').hasError('text') ? 'Formation incorrecte' :
      '';
  }

  getPasswordErrorMessage() {
    return this.profileFormGroup.get('password').hasError('required') ? 'Vous devez saisir votre mot de passe' :
      this.wrongPassword ? 'Mot de passe invalide' :
        this.profileFormGroup.get('password').hasError('maxlength') ? 'Mot de passe trop long' : '';
  }

}
