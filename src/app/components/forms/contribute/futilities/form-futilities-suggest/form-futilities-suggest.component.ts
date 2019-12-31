import { Component, OnInit } from '@angular/core';

import { ServiceSuggestion } from '../../../../../models/form/service-suggestion';

import { ServerService } from '../../../../../services/server/server.service';
import { ContributeService } from '../../../../../services/contribute/contribute.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Email } from 'src/app/models/email/email';

@Component({
  selector: 'app-form-futilities-suggest',
  templateUrl: './form-futilities-suggest.component.html',
  styleUrls: ['./form-futilities-suggest.component.css']
})
export class FormFutilitiesSuggestComponent implements OnInit {

  model: ServiceSuggestion;
  suggestionsCategories: string[];
  suggestFormGroup: FormGroup;
  submitted: boolean;

  email: Email;

  constructor(
    private serverService: ServerService,
    private contributeService: ContributeService,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
    ) { 
    this.model = new ServiceSuggestion();
    this.model.title = "fUTilities Suggestion";
    this.suggestionsCategories = this.contributeService.getSuggestCategoriesBySlug("futilities");
    this.submitted = false;
  }

  ngOnInit() {
    this.suggestFormGroup = this.formBuilder.group({
      category: ['', Validators.required],
      message: ['', [Validators.required, Validators.maxLength(500)]],
      captcha: ['', Validators.required]
    });
  }

  getCategoryErrorMessage() {
    return this.suggestFormGroup.get('category').hasError('required') ? 'Veuillez choisir une catégorie' :
        this.suggestFormGroup.get('category').hasError('text') ? 'Catégorie invalide' :
            '';
  }

  getMessageErrorMessage() {
    return this.suggestFormGroup.get('message').hasError('required') ? 'Veuillez entrer un message' :
        this.suggestFormGroup.get('message').hasError('text') ? 'Message invalide' :
            this.suggestFormGroup.get('message').hasError('maxlength') ? 'Message trop long' : '';
  }

  setFormValuesToModel() {
    this.model.category = this.suggestFormGroup.get('category').value;
    this.model.message = this.suggestFormGroup.get('message').value;
    this.model.captcha = this.suggestFormGroup.get('captcha').value;
  }

  onSubmit() { 
    
    if(this.suggestFormGroup.valid)
    {
      this.setFormValuesToModel();
      this.prepareEmail().then(() => {
        this.serverService.sendEmail(this.email).subscribe((response) => {
            console.log('Response from postData is :', response);
            this.submitted = true;
          }, (error) => {
            console.error('Error during POSTdata is :', error);
        });
        this.submitted = true;
      });
    }
  }

  prepareEmail(): Promise<void> {
    let promise: Promise<void> = new Promise<void>((resolve, reject) => {
      this.authenticationService.getCurrentUser().subscribe((user) => {
        this.email = new Email();
        this.email.subject = "[News][Suggestion] Suggestion d'amï¿½lioration des actualitï¿½s";
        let emailMessage: string[] = new Array<string>();
        emailMessage.push("<h1>Un utilisateur donne son avis sur News</h1>");
        emailMessage.push("<h3>Informations utilisateur :</h3>");
        emailMessage.push("<ul><li>User ID: " + user.uid + "</li><li>Email: " + user.email + "</li></ul>");
        emailMessage.push("<h3>Suggestion apportï¿½e :</h3>");
        emailMessage.push("<p><u>Catï¿½gorie concernï¿½e</u> : " + this.model.category + "</p>");
        emailMessage.push("<p><u>Modification apportï¿½e</u> : </p>");
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
