import { Component, OnInit } from '@angular/core';

import { ServiceContentEdition } from '../../../../../../models/form/service-content-edition';

import { ServerService } from '../../../../../../services/server/server.service';
import { ContributeService } from '../../../../../../services/contribute/contribute.service';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { UploadResult, MdEditorOption } from 'ngx-markdown-editor';
import { Email } from 'src/app/models/email/email';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { DocQuestion } from 'src/app/models/documentation/doc-question';
import { DocumentationService } from 'src/app/services/documentation/documentation.service';

@Component({
  selector: 'app-form-docs-content',
  templateUrl: './form-docs-content.component.html',
  styleUrls: ['./form-docs-content.component.css'],
})
export class FormDocsContentComponent implements OnInit {

  model: ServiceContentEdition;
  items: string[];
  questions: DocQuestion[];
  filteredOptions: Observable<DocQuestion[]>;
  docsContentFormGroup: FormGroup;
  contentItem: FormControl;
  submitted: boolean;
  mdEditorOptions: MdEditorOption = {
    hideIcons: ['FullScreen']
  };
  email: Email;

  constructor (
    private serverService: ServerService,
    private contributeService: ContributeService,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private documentationService: DocumentationService
  ) { 
    this.model = new ServiceContentEdition();
    /* The following line causes 'ExpressionChangedAfterItHasBeenCheckedError' in dev mode but has absolutely no incidence */
    //this.model.contentEdition = "# Injected value\r\n \r\n Edit me in `form-docs-content.component.ts:38`";
    this.doUpload = this.doUpload.bind(this);  // This is very important.
    this.model.title = "Doc'UT Content";
    this.items = this.contributeService.getSuggestCategoriesBySlug("docs");
    this.documentationService.getQuestions().subscribe((questions: DocQuestion[]) => {
      this.questions = questions;
    });
    this.contentItem = new FormControl();
    this.submitted = false;
  }

  ngOnInit() {
    this.docsContentFormGroup = this.formBuilder.group({
      md_editor: ['', [Validators.required, Validators.maxLength(2000)]],
      captcha: ['', Validators.required]
    });
    this.filteredOptions = this.contentItem.valueChanges
      .pipe(
        startWith(''),
        map((value) => this._filter(value))
      );
  }

  private _filter(value: string): DocQuestion[] {
    const filterValue = value.toLowerCase();
    
    return this.questions.filter((question: DocQuestion) => question.name.toLowerCase().includes(filterValue) );
  }

  getContentItemErrorMessage() {
    return this.contentItem.hasError('required') ? 'Veuillez saisir une question' :
        this.contentItem.hasError('text') ? 'Question invalide' :
            '';
  }

  getMdEditorErrorMessage() {
    return this.docsContentFormGroup.get('md_editor').hasError('required') ? 'Veuillez saisir du contenu' :
        this.docsContentFormGroup.get('md_editor').hasError('text') ? 'Contenu invalide' :
        this.docsContentFormGroup.get('md_editor').hasError('maxlength') ? 'Contenu trop long' :'';
  }

  setFormValuesToModel() {
    this.model.contentItem = this.contentItem.value;
    this.model.contentEdition = this.docsContentFormGroup.get('md_editor').value;
    this.model.captcha = this.docsContentFormGroup.get('captcha').value;
  }

  doUpload(files: Array<File>): Promise<Array<UploadResult>> {
    // TODO: implement download, compress & upload with ngxcompressimage & firestorage
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

  onSubmit() { 
    if(this.docsContentFormGroup.valid)
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
        this.email.subject = "[Doc'UT][Contribution] Améliorer la documentation";
        let emailMessage: string[] = new Array<string>();
        emailMessage.push("<h1>Un utilisateur propose une amélioration de la Doc'UT</h1>");
        emailMessage.push("<h3>Informations utilisateur :</h3>");
        emailMessage.push("<ul><li>User ID: " + user.uid + "</li><li>Email: " + user.email + "</li></ul>");
        emailMessage.push("<h3>Contribution apportée :</h3>");
        emailMessage.push("<p><u>Question concernée</u> : " + this.model.contentItem + "</p>");
        emailMessage.push("<p><u>Modification apportée</u> : </p>");
        emailMessage.push("<pre>" + this.model.contentEdition + "</pre>");
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
