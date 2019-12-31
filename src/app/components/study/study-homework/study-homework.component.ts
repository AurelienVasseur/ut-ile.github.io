import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-study-homework',
  templateUrl: './study-homework.component.html',
  styleUrls: ['./study-homework.component.css']
})
export class StudyHomeworkComponent implements OnInit {
  featureStatus: string;
  featureMessage: string;
  previousRoute: string;


  constructor(
    private router: Router,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle("Aide aux devoirs - UTile");
    this.featureStatus = "Aide aux devoirs est actuellement en cours de développement et est en attente du déploiement de Commun'UT.";
    this.featureMessage = "Aide aux devoirs répertoriera les meilleurs réponses aux questions scolaires des étudiants. Celles-ci seront directement extraites du réseau social utilisé par Commun'UT.";
    this.previousRoute = this.router.url.substring(0, this.router.url.lastIndexOf('/'));
  }

}
