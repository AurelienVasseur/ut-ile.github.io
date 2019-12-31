import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {
  featureStatus: string;
  featureMessage: string;
  previousRoute: string;


  constructor(
    private router: Router,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle("Commun'UT - UTile");
    this.featureStatus = "Commun'UT est en phase de test et sera déployé idéalement au début de l'intersemestre (fin janvier 2020).";
    this.featureMessage = "Commun'UT est le réseau social interUT. Il sera lié partiellement à UTile. Commun'UT se veut à la fois simple d'utilisation, organisé et correctement modéré. Discord est ainsi le réseau social préféré, pour le moment.";
    this.previousRoute = this.router.url.substring(0, this.router.url.lastIndexOf('/'));
  }

}
