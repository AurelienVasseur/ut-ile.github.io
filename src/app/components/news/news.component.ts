import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  featureStatus: string;
  featureMessage: string;
  previousRoute: string;


  constructor(
    private router: Router,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle("Actualités - UTile");
    this.featureStatus = "Actualités est en attente de vos contributions.";
    this.featureMessage = "Ce service permet aux visiteurs et membres d'être tenus à jour quant aux actualités universitaires et associatives. À l'avenir, les membres des UTs pourront reçevoir des notifications sur les nouveautés les intéressants.";
    this.previousRoute = this.router.url.substring(0, this.router.url.lastIndexOf('/'));
  }

}
