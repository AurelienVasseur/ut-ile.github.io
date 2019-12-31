import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Injectable({
  providedIn: 'root'
})
export class EmailVerifiedGuard implements CanActivate {

  constructor(
    private navigationService: NavigationService
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      var canActivate: Promise<boolean> = new Promise((resolve, reject) => {
        this.navigationService.redirectIfOfflineOrUnverifiedUser('/login', state.url).then((isRedirected: boolean) => {
          resolve(!isRedirected);
        });
      });
      return canActivate;
  }
  
}
