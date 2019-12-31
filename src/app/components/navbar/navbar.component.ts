import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, take } from 'rxjs/operators';
import { DocCategory } from '../../models/documentation/doc-category';
import { DocumentationService } from '../../services/documentation/documentation.service';

import { AuthenticationService } from '../../services/authentication/authentication.service';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/services/user/user.service';
import { FeatureService } from 'src/app/services/feature/feature.service';
import { Feature } from 'src/app/models/home/feature';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  categories: Array<DocCategory>;
  features: Array<Feature>;
  fireUser: firebase.User;
  user: User;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private documentationService: DocumentationService,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private featureService: FeatureService
  ) {}

  ngOnInit() {
    this.fetchCategories();
    this.fetchFeatures();
    this.authenticationService.getCurrentUser().subscribe((fireUser) => {
      this.fireUser = fireUser;
      if(fireUser) {
        this.userService.getUsers().subscribe((users: User[]) => {
          this.user = users.find((user: User) => user.id === this.fireUser.uid);
        });
      }
    });
  }

  fetchCategories() {
    this.documentationService.getCategories().subscribe((categories: DocCategory[]) => {
      this.categories = categories.sort((a: DocCategory, b: DocCategory) => { return a["sortId"] - b["sortId"]; });
    });
  }

  fetchFeatures() {
    this.featureService.getFeatures().subscribe((features: Feature[]) => {
      this.features = features;
      this.features.sort((a: Feature, b: Feature) => a.sortId - b.sortId);
    });
  }

  signOut() {
    this.authenticationService.signOut();
  }

}
