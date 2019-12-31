import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Category } from '../../models/category';
import { FutilitiesService } from '../../services/futilities/futilities.service';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-futilities',
  templateUrl: './futilities.component.html',
  styleUrls: ['./futilities.component.css']
})
export class FutilitiesComponent implements OnInit {
  categories: Array<Category>;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private futilitiesService: FutilitiesService,
    private database: AngularFirestore,
    private storage: AngularFireStorage,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle("F'UTilités - UTile");
    this.fetchCategories();
  }

  fetchCategories() {
    this.futilitiesService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories.sort((a: Category, b: Category) => { return a["sortId"] - b["sortId"]; })
      this.categories.forEach((category) => {
        category.badges.forEach((value, key) => {
          this.futilitiesService.getBadgeById(<string>category.badges[key]).subscribe((badge) => {
            category.badges[key] = badge;
          });
        });
      });
    });
  }

}
