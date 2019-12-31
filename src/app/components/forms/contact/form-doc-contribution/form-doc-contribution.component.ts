import { Component, OnInit } from '@angular/core';

import { DocContribution } from '../../../../models/form/doc-contribution';

import { ServerService } from '../../../../services/server/server.service';

@Component({
  selector: 'app-form-doc-contribution',
  templateUrl: './form-doc-contribution.component.html',
  styleUrls: ['./form-doc-contribution.component.css']
})
export class FormDocContributionComponent implements OnInit {

  model: DocContribution;
  submitted: boolean;

  constructor(private serverService: ServerService) { 
    this.model = new DocContribution();
    this.submitted = false;
  }

  ngOnInit() {
  }

  onSubmit() { 
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }
}
