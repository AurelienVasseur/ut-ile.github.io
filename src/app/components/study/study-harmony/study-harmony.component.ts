import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-study-harmony',
  templateUrl: './study-harmony.component.html',
  styleUrls: ['./study-harmony.component.css']
})
export class StudyHarmonyComponent implements OnInit {
  featureStatus: string;
  featureMessage: string;
  previousRoute: string;


  constructor(
    private router: Router,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle("Harmonie - UTile");
    this.featureStatus = "Harmony est actuellement en cours de développement, mais est également en attente de source de financement des serveurs de fichiers et de base de données. Ce service est également en attente de modération électorale automatique des droits.";
    this.featureMessage = "Harmony permettra aux étudiants ayant les même UVs de prendre en note les cours et TD en temps réel et disponible à tout moment pour les étudiants.";
    this.previousRoute = this.router.url.substring(0, this.router.url.lastIndexOf('/'));
  }

}
