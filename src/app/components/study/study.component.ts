import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Category } from '../../models/category';
import { StudyService } from '../../services/study/study.service';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.css']
})
export class StudyComponent implements OnInit {
  categories: Array<Category>;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private studyService: StudyService,
    private database: AngularFirestore,
    private storage: AngularFireStorage,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle("UTdiant - UTile");
    this.fetchCategories();
  }

  fetchCategories() {
    this.studyService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories.sort((a: Category, b: Category) => { return a["sortId"] - b["sortId"]; })
      this.categories.forEach((category) => {
        category.badges.forEach((value, key) => {
          this.studyService.getBadgeById(<string>category.badges[key]).subscribe((badge) => {
            category.badges[key] = badge;
          });
        });
      });
    });
  }

}
