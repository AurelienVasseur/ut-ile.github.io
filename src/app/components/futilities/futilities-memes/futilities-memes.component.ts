import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-futilities-memes',
  templateUrl: './futilities-memes.component.html',
  styleUrls: ['./futilities-memes.component.css']
})
export class FutilitiesMemesComponent implements OnInit {
  featureStatus: string;
  featureMessage: string;
  previousRoute: string;


  constructor(
    private router: Router,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle("Mem'UT - UTile");
    this.featureStatus = "Mem'UT est en phase de test et sera déployé très bientôt.";
    this.featureMessage = "Il est 4h du mat', j'ai un peu la flemme d'expliquer ce que c'est.";
    this.previousRoute = this.router.url.substring(0, this.router.url.lastIndexOf('/'));
  }

}
