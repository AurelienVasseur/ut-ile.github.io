import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-study-maps',
  templateUrl: './study-maps.component.html',
  styleUrls: ['./study-maps.component.css']
})
export class StudyMapsComponent implements OnInit {
  featureStatus: string;
  featureMessage: string;
  previousRoute: string;


  constructor(
    private router: Router,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle("Glob'UT - UTile");
    this.featureStatus = "Glob'UT est actuellement en cours de développement et en attente de modération des contenus.";
    this.featureMessage = "Glob'UT regroupera l'ensemble des lieux utiles pour les étudiants des UTs. Il sera également possible d'indiquer des trajets de covoiturages et de mettre en relation ces personnes. Des niveaux de vigilences par quartiers seront également mis à disposition.";
    this.previousRoute = this.router.url.substring(0, this.router.url.lastIndexOf('/'));
  }

}
