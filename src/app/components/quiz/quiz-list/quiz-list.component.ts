import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { QuizCard } from '../../../models/quiz/quiz-card';
import { QuizService } from '../../../services/quiz/quiz.service';

import { AngularFirestore } from '@angular/fire/firestore';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit {
  quizCards: Array<QuizCard>;

  featureStatus: string;
  featureMessage: string;
  previousRoute: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private quizService: QuizService,
    private database: AngularFirestore,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle("Quiz - UTile");
    this.titleService.setTitle("Quiz - UTile");
    this.featureStatus = "Quiz est en phase de test et sera déployé idéalement au début de l'intersemestre (fin janvier 2020).";
    this.featureMessage = "Quiz regroupera les quiz (oui, oui) des étudiants, que ce soit pour réviser ou s'amuser.";
    this.previousRoute = this.router.url.substring(0, this.router.url.lastIndexOf('/'));
    //this.quizCards = this.quizService.getCategories();
    // Join QuizCard with their SurveyJS forms
    this.database.collection<QuizCard>("quiz-cards").valueChanges().subscribe((quizCards: QuizCard[]) => {
      quizCards.forEach((quizCard: QuizCard) => {
        if(quizCard["quiz_form"]) {
          this.database.collection("quiz-forms").doc(quizCard["quiz_form"]["id"]).valueChanges().subscribe((form) => {
            quizCard["survey_form"] = form;
          });
        }
      });
      // sort from newest to oldest
      quizCards.sort((a: QuizCard, b: QuizCard) => { return b["created_on"]["seconds"] - a["created_on"]["seconds"]});
      this.quizCards = quizCards;
    });
  }

}
