import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  featureStatus: string;
  featureMessage: string;
  previousRoute: string;


  constructor(
    private router: Router,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle("Quiz - UTile");
    this.featureStatus = "Quiz est en phase de test et sera déployé idéalement au début de l'intersemestre (fin janvier 2020).";
    this.featureMessage = "Quiz regroupera les quiz (oui, oui) des étudiants, que ce soit pour réviser ou s'amuser.";
    this.previousRoute = this.router.url.substring(0, this.router.url.lastIndexOf('/'));
  }

}
