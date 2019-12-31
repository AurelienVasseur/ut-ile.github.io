import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

import { Location } from '@angular/common';

@Component({
  selector: 'app-form-quiz',
  templateUrl: './form-quiz.component.html',
  styleUrls: ['./form-quiz.component.css']
})
export class FormQuizComponent implements OnInit {
  formSlug: string;
  selected: FormControl;
  formSlugs = ["content", "suggest"];


  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.getParams();
    this.selected = new FormControl(this.formSlugs.indexOf(this.formSlug));
  }

  getParams() : void {
    this.route.params.subscribe(
      params => {
        this.formSlug = params['form_category'];
      }
    );
  }

  updateUrl(tabId: number) : void {
    this.selected.setValue(tabId);
    this.location.replaceState('/contribute/quiz/' + this.formSlugs[this.selected.value]);
  }

}
