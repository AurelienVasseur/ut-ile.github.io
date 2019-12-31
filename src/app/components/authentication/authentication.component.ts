import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { NavigationService } from 'src/app/services/navigation/navigation.service';

import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  featureStatus: string;
  featureMessage: string;
  previousRoute: string;

  constructor(
    private route: ActivatedRoute,
    private navigationService: NavigationService,
    private location: Location,
    private router: Router,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle("Sécurité Utilisateurs - UTile");
    this.featureStatus = "Une erreur est survenue. Il est possible que vous ayez tenté d'accéder manuellement à cette page.";
    this.featureMessage = "Merci de nous contacter pour que nous gérions au mieux les cas où cette page apparait.";
    this.previousRoute = this.router.url.substring(0, this.router.url.lastIndexOf('/'));
    this.route.queryParams.subscribe((params) => {
      var parameters: Object = {
        mode: params["mode"],
        oobCode: params["oobCode"],
        apiKey: params["apiKey"],
        lang: params["lang"]
      };
      switch(parameters["mode"]) {
        case "verifyEmail":
          this.navigationService.redirectToWithQueryParams("/auth/email-verification", parameters);
          break;
        case "resetPassword":
          this.navigationService.redirectToWithQueryParams("/auth/reset-password", parameters);
          break;
        case "recoverEmail":
          this.navigationService.redirectToWithQueryParams("/auth/recover-email", parameters);
          break;
        default:
          // This should happen if user manually tries to access this page (with wrong parametersName or no parameters)
          console.error(`Error: '${parameters["mode"]}' mode is not handled.`);
      }
    });
  }

}
