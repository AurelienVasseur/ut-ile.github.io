import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

import { Location } from '@angular/common';

@Component({
  selector: 'app-form-news',
  templateUrl: './form-news.component.html',
  styleUrls: ['./form-news.component.css']
})
export class FormNewsComponent implements OnInit {
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
    this.location.replaceState('/contribute/news/' + this.formSlugs[this.selected.value]);
  }

}
