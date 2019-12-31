import { Component, OnInit } from '@angular/core';
import { ServiceSuggestion } from 'src/app/models/form/service-suggestion';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Email } from 'src/app/models/email/email';
import { ServerService } from 'src/app/services/server/server.service';
import { ContributeService } from 'src/app/services/contribute/contribute.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { News } from 'src/app/models/news/news';
import { UploadResult, MdEditorOption } from 'ngx-markdown-editor';

@Component({
  selector: 'app-form-news-content',
  templateUrl: './form-news-content.component.html',
  styleUrls: ['./form-news-content.component.css']
})
export class FormNewsContentComponent implements OnInit {

  model: News;
  suggestionsCategories: string[];
  newsContentFormGroup: FormGroup;

  mdEditorOptions: MdEditorOption = {
    hideIcons: ['FullScreen']
  };

  submitted: boolean;

  email: Email;

  constructor(
    private serverService: ServerService,
    private contributeService: ContributeService,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
    ) { 
    this.model = new News();
    this.suggestionsCategories = this.contributeService.getSuggestCategoriesBySlug("news_content");
    this.submitted = false;
  }

  ngOnInit() {
    this.newsContentFormGroup = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(64)]],
      category: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(120)]],
      md_editor: ['', [Validators.required, Validators.maxLength(120)]], 
      captcha: ['', Validators.required]
    });
  }

  setFormValuesToModel() {
    this.model.name = this.newsContentFormGroup.get('title').value;
    this.model.description = this.newsContentFormGroup.get('description').value;
    this.model.content = this.newsContentFormGroup.get('md_editor').value;
  }

  onSubmit() {
    if(this.newsContentFormGroup.valid)
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
        this.email.subject = "[News][Ajout] Proposition d'ajout d'une nouvelle actualité";
        let emailMessage: string[] = new Array<string>();
        emailMessage.push("<h1>Un utilisateur souhaite ajouter une actualité</h1>");
        emailMessage.push("<h3>Informations utilisateur :</h3>");
        emailMessage.push("<ul><li>User ID: " + user.uid + "</li><li>Email: " + user.email + "</li></ul>");
        emailMessage.push("<h3>Nouvelle Actualité :</h3>");
        emailMessage.push("<p><u>Catégorie concernée</u> : " + this.newsContentFormGroup.get('category').value + "</p>");
        emailMessage.push("<p><u>Titre</u> : " + this.model.name + "</p>");
        emailMessage.push("<p><u>Description</u> : " + this.model.description + "</p>");
        emailMessage.push("<p><u>Contenu de l'article</u> : </p>");
        emailMessage.push("<pre>" + this.model.content + "</pre>");
        this.email.message = emailMessage.join("");
        resolve();
      });
    });
    return promise;
  }

  doUpload(files: Array<File>): Promise<Array<UploadResult>> {
    // TODO : handle image download, compress & upload using ngxcompressimage & firestorage
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let result: Array<UploadResult> = [];
        for (let file of files) {
          result.push({
            name: file.name,
            url: `https://avatars3.githubusercontent.com/${file.name}`,
            isImg: file.type.indexOf('image') !== -1
          })
        }
        resolve(result);
      }, 3000);
    });
  }

  getTitleErrorMessage() {
    return this.newsContentFormGroup.get('title').hasError('required') ? 'Veuillez entrer un titre' :
        this.newsContentFormGroup.get('title').hasError('text') ? 'Titre invalide' :
            this.newsContentFormGroup.get('title').hasError('maxlength') ? 'Titre trop long' :'';
  }

  getCategoryErrorMessage() {
    return this.newsContentFormGroup.get('category').hasError('required') ? 'Veuillez sélectionner une catégorie' :
        this.newsContentFormGroup.get('category').hasError('text') ? 'Catégorie invalide' :
            '';
  }

  getDescriptionErrorMessage() {
    return this.newsContentFormGroup.get('description').hasError('required') ? 'Veuillez entrer une description' :
        this.newsContentFormGroup.get('description').hasError('text') ? 'Description invalide' :
            this.newsContentFormGroup.get('description').hasError('maxlength') ? 'Description trop longue' :'';
  }

  getMdEditorErrorMessage() {
    return this.newsContentFormGroup.get('md_editor').hasError('required') ? 'Veuillez saisir du contenu' :
        this.newsContentFormGroup.get('md_editor').hasError('text') ? 'Contenu invalide' :
        this.newsContentFormGroup.get('md_editor').hasError('maxlength') ? 'Contenu trop long' :'';
  }


  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

}
