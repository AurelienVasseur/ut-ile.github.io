import { Component, OnInit } from '@angular/core';

import { Contact } from '../../../../models/form/contact';

import { ServerService } from '../../../../services/server/server.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Email } from 'src/app/models/email/email';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-contact',
  templateUrl: './form-contact.component.html',
  styleUrls: ['./form-contact.component.css']
})
export class FormContactComponent implements OnInit {

  model: Contact;
  contactForm: FormGroup;
  submitted: boolean;

  spin: boolean;

  email: Email;

  constructor(
    private serverService: ServerService,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar
  ) { 
    this.model = new Contact();
    this.submitted = false;
  }

  ngOnInit() {
    this.spin = false;
    this.contactForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(64)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.maxLength(1000)]],
      captcha: ['', Validators.required]
    });
  }

  getFirstNameErrorMessage() {
    return this.contactForm.get('firstName').hasError('required') ? 'Veuillez entrer un prénom' :
        this.contactForm.get('firstName').hasError('text') ? 'Prénom invalide' :
            this.contactForm.get('firstName').hasError('maxlength') ? 'Prénom trop long' : '';
  }

  getEmailErrorMessage() {
    return this.contactForm.get('email').hasError('required') ? 'Veuillez saisir une adresse mail' :
        this.contactForm.get('email').hasError('email') ? 'Adresse email invalide' :
            '';
  }

  getMessageErrorMessage() {
    return this.contactForm.get('message').hasError('required') ? 'Vous devez saisir un message' :
        this.contactForm.get('message').hasError('textarea') ? 'Message invalide' :
            this.contactForm.get('message').hasError('maxlength') ? 'Message trop long' : '';
  }

  setFormValuesToModel() {
    this.model.firstName = this.contactForm.get('firstName').value;
    this.model.email = this.contactForm.get('email').value;
    this.model.message = this.contactForm.get('message').value;
    this.model.captcha = this.contactForm.get('captcha').value;
  }

  onSubmit() { 
    if(this.contactForm.valid)
    {
      this.spin = true;
      this.setFormValuesToModel();
      this.prepareEmail().then(() => {
        this.serverService.sendEmail(this.email).subscribe((response) => {
          console.log('Response from postData is :', response);
          this.submitted = true;
        }, (error) => {
          console.error('Error during POSTdata is :', error);
          this.spin = false;
          this.snackBar.open("Une erreur a eu lieu lors de l'envoi de votre demande. Veuillez réessayer.", 'x', {duration: 5000});
        });
      });
    }
  }

  prepareEmail(): Promise<void> {
    let promise: Promise<void> = new Promise<void>((resolve, reject) => {
      this.authenticationService.getCurrentUser().subscribe((user) => {
        this.email = new Email();
        this.email.subject = "[Contact] Soumission d'une demande de contact";
        let emailMessage: string[] = new Array<string>();
        emailMessage.push("<h1>Un utilisateur souhaite vous contacter</h1>");
        emailMessage.push("<h3>Informations utilisateur :</h3>");
        if(user) {
          emailMessage.push("<ul><li>User ID: " + user.uid + "</li><li>Email: " + user.email + "</li></ul>");
        }
        else {
          emailMessage.push("<p>L'utilisateur est anonyme et a indiqué : </p><ul><li>Prénom: " + this.model.firstName + "</li><li>Email: " + this.model.email + "</li></ul>");
        }
        emailMessage.push("<p><u>Demande envoyée</u> : </p>");
        emailMessage.push("<pre>" + this.model.message + "</pre>");
        this.email.message = emailMessage.join("");
        resolve();
      });
    });
    return promise;
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }
}
