import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-study-storage',
  templateUrl: './study-storage.component.html',
  styleUrls: ['./study-storage.component.css']
})
export class StudyStorageComponent implements OnInit {
  featureStatus: string;
  featureMessage: string;
  previousRoute: string;


  constructor(
    private router: Router,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle("Storage - UTile");
    this.featureStatus = "Storage est actuellement en cours de développement et en attente de source de financement des serveurs de fichiers.";
    this.featureMessage = "Storage liera vos documents numériques à votre compte UTile sur ses propres serveurs.";
    this.previousRoute = this.router.url.substring(0, this.router.url.lastIndexOf('/'));
  }

}
