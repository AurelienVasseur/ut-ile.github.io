import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Location } from '@angular/common';
import { User } from 'src/app/models/user/user';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

import { MatDialog } from '@angular/material/dialog';
import { DialogDisableUserComponent } from 'src/app/components/dialog/user/dialog-disable-user/dialog-disable-user.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-user-settings',
  templateUrl: './form-user-settings.component.html',
  styleUrls: ['./form-user-settings.component.css']
})
export class FormUserSettingsComponent implements OnInit {
  @Input() user: User;
  selected: FormControl;

  constructor(
    private location: Location,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.selected = new FormControl();
  }

  updateUrl(tabId: number) : void {
    this.selected.setValue(tabId);
    //this.location.replaceState('/users/' + this.user.page_id + "/" + this.settingsSlugs[this.selected.value]);
  }

  openDisableDialog() {
    const dialogRef = this.dialog.open(DialogDisableUserComponent, {
      data: { 
        title: "Désactiver mon compte", 
        content: "Cette fonctionnalité n'est pas encore disponible.\r\nAttention, une fois votre compte désactivé, vous ne pourrez plus vous y connecter. Vous pourrez sélectionner une date de réactivation. Cela pourra être utile lorsque vous vous absenterez et souhaiterez assurer la sécurité de votre compte.", 
        confirmButton: "Revenir plus tard", 
        cancelButton: "Annuler" 
      }
    });
    dialogRef.afterClosed().subscribe(closeButtonResult => {
      console.log(`Dialog result: ${closeButtonResult}`);
      switch(closeButtonResult) {
        case true:
          // happens when user clicks on the 'Confirm' button (wtih true close result in view)
          this.snackBar.open('Votre compte a bien été désactivé. Pour le récupérer, utilisez le formulaire de Contact.', 'x', {duration: 5000});
          break;
        case false:
          // happens when user clicks on the 'Cancel' button (with false close result in view)
          //console.log("click on cancel button");
          break;
        default:
          // happens when user clicks out of the dialog
          //console.log("click out of modal");
          break;
      }
    });
  }

  sendEmailVerification() {
    this.authenticationService.getCurrentUser().subscribe((user) => {
      user.sendEmailVerification().then(() => {
        this.snackBar.open(`Un email de vérification a été envoyé à l'adresse : ${ this.user.email }.`, 'x', {duration: 5000});
      }).catch((error) => {
        console.error("Error while sending verification email :", error);
      });
    });
  }

}