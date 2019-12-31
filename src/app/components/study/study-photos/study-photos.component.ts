import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-study-photos',
  templateUrl: './study-photos.component.html',
  styleUrls: ['./study-photos.component.css']
})
export class StudyPhotosComponent implements OnInit {
  featureStatus: string;
  featureMessage: string;
  previousRoute: string;


  constructor(
    private router: Router,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle("Pellic'UT - UTile");
    this.featureStatus = "Pellic'UT est actuellement en cours de développement et en attente de source de financement des serveurs de stockages.";
    this.featureMessage = "Pellic'UT regroupera les photos prises lors des événements. Il sera possible de filtrer les photos (événement, date, personne, etc.) et de gérer son droit à l'image.";
    this.previousRoute = this.router.url.substring(0, this.router.url.lastIndexOf('/'));
  }

}
