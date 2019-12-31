import { Component, OnInit } from '@angular/core';
import { DocCategory } from '../../models/documentation/doc-category';
import { DocumentationService } from '../../services/documentation/documentation.service';

import { Feature } from '../../models/home/feature';
import { FeatureService } from '../../services/feature/feature.service';
import { Badge } from 'src/app/models/badge';
import { BadgeService } from 'src/app/services/badges/badge.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories: Array<DocCategory>;
  features: Feature[];

  constructor( 
    private documentationService: DocumentationService,
    private badgeService: BadgeService,
    private featureService: FeatureService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle("Accueil - UTile");
    this.fetchDocumentationCategories();
    this.fetchFeatures();
    //this.features = this.featureService.getFeatures();
  }

  scroll(element: HTMLElement) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  fetchDocumentationCategories() {
    this.documentationService.getCategories().subscribe((categories) => {
      this.categories = categories.sort((a: DocCategory, b: DocCategory) => { return a["sortId"] - b["sortId"]; });
      this.categories.forEach((category) => {
        category.badges.forEach((value, key) => {
          this.badgeService.getBadgeById(<string>category.badges[key]).subscribe((badge) => {
            category.badges[key] = badge;
          });
        });
      });
    });
  }

  fetchFeatures() {
    this.featureService.getFeatures().subscribe((features: Feature[]) => {
      this.features = features.sort((a: Feature, b: Feature) => a.sortId - b.sortId);
    });
  }

}
