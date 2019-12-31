import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-study-uv',
  templateUrl: './study-uv.component.html',
  styleUrls: ['./study-uv.component.css']
})
export class StudyUvComponent implements OnInit {
  featureStatus: string;
  featureMessage: string;
  previousRoute: string;


  constructor(
    private router: Router,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle("UVs - UTile");
    this.featureStatus = "Gestion des UVs est en cours de développement et en attente de modération des contenus";
    this.featureMessage = "Gestion des UVs permettra de choisir ses UVs, accéder aux avis d'anciens étudiants et simuler une inscription aux UVs afin de déterminer les UVs n'ayant plus de place et négocier entre étudiants.";
    this.previousRoute = this.router.url.substring(0, this.router.url.lastIndexOf('/'));
  }

}
