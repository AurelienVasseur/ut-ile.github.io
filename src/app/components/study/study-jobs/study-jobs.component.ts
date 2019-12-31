import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-study-jobs',
  templateUrl: './study-jobs.component.html',
  styleUrls: ['./study-jobs.component.css']
})
export class StudyJobsComponent implements OnInit {
  featureStatus: string;
  featureMessage: string;
  previousRoute: string;


  constructor(
    private router: Router,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle("Stages & Jobs - UTile");
    this.featureStatus = "Stages & Emplois est actuellement en cours de réflexion et en attente de modération de contenus.";
    this.featureMessage = "Ce service permettra de répertorier les offres de stages et emplois tout en laissant la possibilité aux anciens stagiaires et employés de laisser leur avis (anonymes ou non) sur les postes proposés.";
    this.previousRoute = this.router.url.substring(0, this.router.url.lastIndexOf('/'));
  }

}
