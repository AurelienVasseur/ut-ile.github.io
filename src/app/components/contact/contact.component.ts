import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../services/server/server.service';

import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  slug: string;
  selected: FormControl;
  contactSlugs = ["us"];

  constructor(
    private serverService: ServerService,
    private route: ActivatedRoute,
    private location: Location,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle("Contact - UTile");
    this.getParams();
    this.selected = new FormControl(this.contactSlugs.indexOf(this.slug));

    this.serverService.getAPIData().subscribe((response) => {
          console.log('response is ', response)
      }, (error) => {
          console.error('error is ', error)
    });
  }

  getParams() : void {
    this.route.params.subscribe(
      params => {
        this.slug = params['slug'];
      }
    );
  }

  updateUrl(tabId: number) : void {
    this.selected.setValue(tabId);
    this.location.replaceState('/contact/' + this.contactSlugs[this.selected.value]);
  }
}
