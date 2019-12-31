import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-futilities-quotes',
  templateUrl: './futilities-quotes.component.html',
  styleUrls: ['./futilities-quotes.component.css']
})
export class FutilitiesQuotesComponent implements OnInit {
  featureStatus: string;
  featureMessage: string;
  previousRoute: string;


  constructor(
    private router: Router,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle("Qw'UT - UTile");
    this.featureStatus = "Qw'UT est en phase de test et sera déployé très bientôt.";
    this.featureMessage = "Qw'UT en deux mots : citations magiques. Vous vous souvenez des perles de vos profs ?";
    this.previousRoute = this.router.url.substring(0, this.router.url.lastIndexOf('/'));
  }

}
