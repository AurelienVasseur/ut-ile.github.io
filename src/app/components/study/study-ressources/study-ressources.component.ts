import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-study-ressources',
  templateUrl: './study-ressources.component.html',
  styleUrls: ['./study-ressources.component.css']
})
export class StudyRessourcesComponent implements OnInit {
  featureStatus: string;
  featureMessage: string;
  previousRoute: string;


  constructor(
    private router: Router,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle("Cours & Annales - UTile");
    this.featureStatus = "Cours & Annales est actuellement en cours de développement et est en attente de perfectionnement des mesures de sécurité d'accès aux contenus.";
    this.featureMessage = "Cours & Annales rassemblera l'ensemble des cours et annales (libres de droits) des différentes UVs provenant des élèves et/ou professeurs. Ce service sera également alimenté des ressources validées d'Aide aux devoirs.";
    this.previousRoute = this.router.url.substring(0, this.router.url.lastIndexOf('/'));
  }

}
