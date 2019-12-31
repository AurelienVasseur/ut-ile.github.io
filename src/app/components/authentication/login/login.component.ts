import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';

import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  passwordForgotten: boolean;

  constructor(
    private location: Location,
    private navigationService: NavigationService,
    private titleService: Title
  ) { }

  ngOnInit() { 
    this.titleService.setTitle("Connexion - UTile");
    if(this.location.path() === "/login/forgot-password") {
      this.titleService.setTitle("Mot de passe oublié - UTile");
      this.passwordForgotten = true;
    }
    else {
      this.passwordForgotten = false;
    }
  }

  forgotPassword(event: boolean) {
    this.passwordForgotten = event;
    this.location.replaceState("/login/forgot-password");
  }

}
