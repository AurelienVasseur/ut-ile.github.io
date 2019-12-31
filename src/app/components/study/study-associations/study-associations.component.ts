import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-study-associations',
  templateUrl: './study-associations.component.html',
  styleUrls: ['./study-associations.component.css']
})
export class StudyAssociationsComponent implements OnInit {
  featureStatus: string;
  featureMessage: string;
  previousRoute: string;


  constructor(
    private router: Router,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle("Associ'UT - UTile");
    this.featureStatus = "Associ'UT est actuellement en cours de développement.";
    this.featureMessage = "Associ'UT permettra de plus facilement gérer les communications au sein de l'asso', semi-automatiser les inscriptions et de gérer les contenus et événements publiés dans Actualités.";
    this.previousRoute = this.router.url.substring(0, this.router.url.lastIndexOf('/'));
  }

}
