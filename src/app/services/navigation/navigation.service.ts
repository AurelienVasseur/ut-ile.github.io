import { Injectable } from '@angular/core';

import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
import { UserService } from '../user/user.service';
import { User } from 'src/app/models/user/user';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) { }

  redirectTo(url: string) {
    this.router.navigate([url]);
  }

  redirectToWithQueryParams(url: string, parameters: Object) {
    this.router.navigate([url], { queryParams: parameters });
  }

  redirectIfOfflineUser(redirectRoute: string, continueUrl: string): Promise<boolean> {
    var isRedirected: Promise<boolean> = new Promise((resolve, reject) => {
      this.authenticationService.getCurrentUser().subscribe((user) => {
        if (!user) {
          this.router.navigate([redirectRoute], { queryParams: { continueUrl: continueUrl } });
          resolve(true);
        }
        else {
          resolve(false);
        }
      });
    });
    return isRedirected;
  }

  redirectIfUnverifiedUser() : Promise<boolean> {
    var isRedirected: Promise<boolean> = new Promise((resolve, reject) => {
      this.authenticationService.getCurrentUser().pipe(take(1)).subscribe((user) => {
        if(user) {
          if(user.emailVerified) {
            resolve(false);
          }
          else {
            this.userService.getUserById(user.uid).pipe(take(1)).subscribe((user: User) => {
              this.router.navigate(['/users/' + user.page_id + '/settings'], { queryParams: { snackMessage: "Veuillez vérifier votre adresse mail afin de pouvoir accéder aux contenus d'UTile." } });
              resolve(true);
            });
          }
        }
        else {
          reject("There is no user connected.");
        }
      });
    });
    return isRedirected;
  }

  redirectIfOfflineOrUnverifiedUser(offlineRedirectRoute: string, offlineContinueUrl: string) : Promise<boolean> {
    var isRedirected: Promise<boolean> = new Promise((resolve, reject) => {
      this.redirectIfUnverifiedUser().then((isUnverified: boolean) => {
        resolve(isUnverified);
      }).catch((error) => {
        // Error occurs when there is no user connected.
        this.redirectIfOfflineUser(offlineRedirectRoute, offlineContinueUrl).then((isOffline: boolean) => {
          resolve(isOffline);
        });
      });
    });
    return isRedirected;
  }

  /*
  getUrlHistory(): Observable<RoutesRecognized[]> {
    return this.router.events.pipe(
      filter((event: any) => event instanceof RoutesRecognized),
      pairwise()
    );
  }
  */

}
