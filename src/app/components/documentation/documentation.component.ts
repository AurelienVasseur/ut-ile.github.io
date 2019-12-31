import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { DocCategory } from '../../models/documentation/doc-category';
import { DocumentationService } from '../../services/documentation/documentation.service';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { BadgeService } from 'src/app/services/badges/badge.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.css']
})
export class DocumentationComponent implements OnInit {
  categories: DocCategory[];

  category: DocCategory;
  subCategory: string;
  question: number;


  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private documentationService: DocumentationService,
    private badgeService: BadgeService,
    private database: AngularFirestore,
    private storage: AngularFireStorage,
    private titleService: Title
  ) {
    // Angular Firebase Storage : get URL of image
    this.storage.ref("docs/cards/wolf-moon-sunset.jpg").getDownloadURL().subscribe((url) => console.log(url));
    // Angular Firebase Firestore : get elements of table/collection
    /*
    this.database.collection('documentation-categories').valueChanges().subscribe((documentationCategories: Category[]) => {
      this.categories = documentationCategories.sort((a, b) => { return a["sortId"] - b["sortId"] });
    });
    */
  }

  ngOnInit() {
    this.titleService.setTitle("Doc'UT - UTile");
    this.getParams();
    this.fetchCategories();
  }

  getParams(): void {
    this.route.params.subscribe(
      params => {
        this.fetchCategoryBySlug(params["category"]);
        this.subCategory = params['subcategory'];
        this.question = +params['question'];
      }
    );
  }

  fetchCategories() {
    this.documentationService.getCategories().subscribe((categories: DocCategory[]) => {
      this.categories = categories.sort((a: DocCategory, b: DocCategory) => { return a["sortId"] - b["sortId"]; })
      this.categories.forEach((category) => {
        category.badges.forEach((value, key) => {
          this.badgeService.getBadgeById(<string>category.badges[key]).subscribe((badge) => {
            category.badges[key] = badge;
          });
        });
      });
    });
  }

  fetchCategoryBySlug(slug: string) {
    this.documentationService.getCategories().subscribe((categories: DocCategory[]) => {
      this.category = categories.find((category: DocCategory) => category.slug === slug);
      if(this.category) {
        this.category.badges.forEach((value, key) => {
          this.badgeService.getBadgeById(<string>this.category.badges[key]).subscribe((badge) => {
            this.category.badges[key] = badge;
          });
        });
      }
    });
  }

}
