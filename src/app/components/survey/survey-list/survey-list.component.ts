import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { SurveyCard } from '../../../models/surveys/survey-card';
import { SurveyService } from '../../../services/survey/survey.service';

import { AngularFirestore } from '@angular/fire/firestore';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-surveyslist',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css']
})
export class SurveyListComponent implements OnInit {
  surveyCards: Array<SurveyCard>;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private surveyService: SurveyService,
    private database: AngularFirestore,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle("Sondages - UTile");
    //this.surveyCards = this.surveyService.getCategories();
    // Join SurveyCard with their SurveyJS forms
    this.database.collection<SurveyCard>("survey-categories").valueChanges().subscribe((surveyCards: SurveyCard[]) => {
      this.surveyCards = surveyCards;
      this.surveyCards.forEach((surveyCard, key) => {
        this.database.collection("survey-forms").doc(<string>surveyCard.survey_form).valueChanges().subscribe((form) => {
          this.surveyCards[key].survey_form = form;
        });
      });
      // sort from newest to oldest
      this.surveyCards.sort((a, b) => { return b["created_on"]["seconds"] - a["created_on"]["seconds"]});
      // join badges
      this.surveyCards.forEach((surveyCard, key1) => {
        surveyCard.badges.forEach((badge, key2) => {
          this.surveyService.getBadgeById(<string>badge).subscribe((badge) => {
            this.surveyCards[key1].badges[key2] = badge;
          });
        });
      });
    });
  }

}
