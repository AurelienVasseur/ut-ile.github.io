import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-study-dwellings',
  templateUrl: './study-dwellings.component.html',
  styleUrls: ['./study-dwellings.component.css']
})
export class StudyDwellingsComponent implements OnInit {
  featureStatus: string;
  featureMessage: string;
  previousRoute: string;


  constructor(
    private router: Router,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle("Logements - UTile");
    this.featureStatus = "Logements est actuellement en cours de développement et en attente de modération des contenus.";
    this.featureMessage = "Ce service rassemblera les offres de logements convenables pour ses études en UTs. La mise en relation de futurs collocataires sera également disponible.";
    this.previousRoute = this.router.url.substring(0, this.router.url.lastIndexOf('/'));
  }

}
