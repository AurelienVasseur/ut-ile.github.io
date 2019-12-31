import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

import { Location } from '@angular/common';

@Component({
  selector: 'app-form-surveys',
  templateUrl: './form-surveys.component.html',
  styleUrls: ['./form-surveys.component.css']
})
export class FormSurveysComponent implements OnInit {
  formSlug: string;
  selected: FormControl;
  formSlugs = ["content", "suggest"];


  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.getParams();
  }

  getParams() : void {
    this.route.params.subscribe(
      params => {
        this.formSlug = params['form_category'];
        this.selected = new FormControl(this.formSlugs.indexOf(this.formSlug));
      }
    );
  }

  updateUrl(tabId: number) : void {
    this.selected.setValue(tabId);
    this.location.replaceState('/contribute/surveys/' + this.formSlugs[this.selected.value]);
  }

}
