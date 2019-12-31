import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { SurveyCard } from '../../../models/surveys/survey-card';
import { SurveyService } from '../../../services/survey/survey.service';

import { AngularFirestore } from '@angular/fire/firestore';
import { Title } from '@angular/platform-browser';
import { Badge } from 'src/app/models/badge';
import { BadgeService } from 'src/app/services/badges/badge.service';
import { Email } from 'src/app/models/email/email';
import { ServerService } from 'src/app/services/server/server.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  survey: SurveyCard;
  created_on: Date;
  expires_on: Date;

  surveyResult: Object;

  surveyFormFound: boolean;

  submitted: boolean;

  email: Email;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private surveyService: SurveyService,
    private database: AngularFirestore,
    private titleService: Title,
    private badgeService: BadgeService,
    private authenticationService: AuthenticationService,
    private serverService: ServerService
  ) { }

  ngOnInit() {
    this.titleService.setTitle("Sondage - UTile");
    this.submitted = false;
    this.surveyFormFound = false;
    this.getParams();
  }

  getParams() {
    this.route.params.subscribe(
      params => {
        this.fetchCategoryBySlug(params['slug']);
      }
    );
  }

  fetchCategoryBySlug(slug: string) {
    this.surveyService.getSurveys().subscribe((surveys: SurveyCard[]) => {
      this.survey = surveys.find((survey: SurveyCard) => survey.slug === slug);
      this.database.collection("survey-forms").doc(<string>this.survey.survey_form).valueChanges().subscribe((form) => {
        this.survey.survey_form = form;
        this.surveyFormFound = true;
        this.fetchBadges();
        console.log(this.survey);
        this.created_on = this.survey.created_on.toDate();
        this.expires_on = this.survey.expires_on.toDate();
      });
    });
  }

  fetchBadges() {
    this.survey.badges.forEach((badgeId: string, key: number) => {
      if(badgeId) {
        this.badgeService.getBadgeById(badgeId).subscribe((badge: Badge) => {
          this.survey.badges[key] = badge;
        });
      }
    });
  }

  // Retrieves user survey submission results
  fetchData(surveyResult: Object) {
    this.surveyResult = surveyResult;
    console.log(surveyResult);
    this.prepareEmail().then(() => {
      this.serverService.sendEmail(this.email).subscribe((response) => {
        console.log('Response from postData is :', response);
        this.submitted = true;
      }, (error) => {
        console.error('Error during POSTdata is :', error);
      });
    });
  }

  prepareEmail(): Promise<void> {
    let promise: Promise<void> = new Promise<void>((resolve, reject) => {
      this.authenticationService.getCurrentUser().subscribe((user) => {
        this.email = new Email();
        this.email.subject = "[Survey] Participation à un sondage";
        let emailMessage: string[] = new Array<string>();
        emailMessage.push("<h1>Un utilisateur a participé à un sondage</h1>");
        emailMessage.push("<h3>Informations utilisateur :</h3>");
        emailMessage.push("<ul><li>User ID: " + user.uid + "</li><li>Email: " + user.email + "</li></ul>");
        emailMessage.push("<p><u>Nom du sondage</u> : " + this.survey.name + "</u></p>");
        emailMessage.push("<p><u>Réponse au sondage</u> : </p>");
        emailMessage.push("<pre>" + JSON.stringify(this.surveyResult) + "</pre>");
        this.email.message = emailMessage.join("");
        resolve();
      });
    });
    return promise;
  }

}
