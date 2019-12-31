import { Component, OnInit } from '@angular/core';

import { ServerService } from '../../services/server/server.service';
import { FeatureService } from '../../services/feature/feature.service';
import { Feature } from '../../models/home/feature';

import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contribute',
  templateUrl: './contribute.component.html',
  styleUrls: ['./contribute.component.css']
})
export class ContributeComponent implements OnInit {
  slug: string;
  selected: FormControl;
  contributeSlugs = ["presentation", "docs", "study", "community", "news", "surveys", "quizz", "futilities"];
  serviceFeatures: Feature[];

  constructor(
    private serverService: ServerService,
    private featureService: FeatureService,
    private route: ActivatedRoute,
    private location: Location,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle("Contrib'UT - UTile");
    this.getParams();
    this.selected = new FormControl(this.contributeSlugs.indexOf(this.slug));

    this.serviceFeatures = this.featureService.getFeaturesByType("service");
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
    this.location.replaceState('/contribute/' + this.contributeSlugs[this.selected.value]);
  }

}
