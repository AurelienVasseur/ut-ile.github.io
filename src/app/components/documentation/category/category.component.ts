import { Component, OnInit, Input } from '@angular/core';
import { DocCategory } from '../../../models/documentation/doc-category';
import { DocumentationService } from 'src/app/services/documentation/documentation.service';
import { DocSubcategory } from 'src/app/models/documentation/doc-subcategory';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { BadgeService } from 'src/app/services/badges/badge.service';
import { Badge } from 'src/app/models/badge';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  category: DocCategory;
  subcategories: Array<DocSubcategory>;

  constructor(
    private route: ActivatedRoute,
    private navigationService: NavigationService,
    private documentationService: DocumentationService,
    private badgeService: BadgeService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle("Doc'UT - UTile");
    this.route.params.subscribe((params) => {
      this.fetchCategoryBySlug(params["category"]);
    });
  }

  fetchCategoryBySlug(slug: string) {
    this.documentationService.getCategories().subscribe((docCategories: DocCategory[]) => {
      this.category = docCategories.find((docCategory: DocCategory) => docCategory.slug === slug);
      if (this.category) {
        this.fetchSubcategories();
      }
      else {
        this.navigationService.redirectTo('/docs');
      }
    });
  }

  fetchSubcategories() {
    this.subcategories = new Array<DocSubcategory>();
    this.category.subcategories.forEach((subcategoryId: string) => {
      this.documentationService.getSubcategoryById(subcategoryId).subscribe((subcategory: DocSubcategory) => {
        this.fetchBadges(subcategory);
        let foundSubcategory: DocSubcategory = this.subcategories.find((docSubcategory: DocSubcategory) => docSubcategory.slug === subcategory.slug);
        if(foundSubcategory) {
          this.subcategories[this.subcategories.indexOf(foundSubcategory)] = subcategory;
        }
        else {
          this.subcategories.push(subcategory);
        }
        this.subcategories.sort((a: DocSubcategory, b: DocSubcategory) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
      });
    });
  }

  fetchBadges(subcategory: DocSubcategory) {
    subcategory.badges.forEach((badgeId: string, key: number) => {
      if(badgeId) {
        this.badgeService.getBadgeById(badgeId).subscribe((badge: Badge) => {
          subcategory.badges[key] = badge;
        });
      }
    });
  }

}
