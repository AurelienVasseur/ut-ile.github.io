import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user/user';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

import { Location } from '@angular/common';
import { FormControl } from '@angular/forms';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  fireUser: firebase.User;
  user: User;

  profileTabs: string[] = ["profile", "settings"];
  selected: FormControl;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private navigationService: NavigationService,
    private snackBar: MatSnackBar,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.selected = new FormControl();
    this.route.params.subscribe((params) => {
      this.authenticationService.getCurrentUser().subscribe((user) => {
        this.fireUser = user;
        this.getProfileUserByPageId(params["pid"]);
      });
      let selectedIndex: number = this.profileTabs.indexOf(params["tab"]);
      if (selectedIndex != -1) {
        this.selected.setValue(selectedIndex);
      }
    });
    this.route.queryParams.subscribe((params) => {
      if(params["snackMessage"]) {
        this.snackBar.open(params["snackMessage"], 'x', {duration: 5000});
      }
    });
  }

  getProfileUserByPageId(pageId: number) {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.user = users.find((user) => user.page_id == pageId);
      this.harmonizeRoute();
      this.titleService.setTitle(this.user.sur_name + " - UTile");
    });
  }

  harmonizeRoute() {
    // if page id doesn't fit with any existing user
    if (!this.user) {
      this.navigationService.redirectTo('/users');
    }
    // harmonize url depending on user accessing page
    if (!this.fireUser || (this.fireUser.uid !== this.user.id)) {
      this.navigationService.redirectTo('/users/' + this.user.page_id);
    }
    else {
      this.route.params.subscribe((params) => {
        if (!params["tab"]) {
          this.location.replaceState('/users/' + this.user.page_id + '/profile');
        }
        if (!this.profileTabs.find((value: string) => value === params["tab"])) {
          this.location.replaceState('/users/' + this.user.page_id + '/profile');
        }
      });
    }
  }

  updateUrl(tabId: number): void {
    this.selected.setValue(tabId);
    this.location.replaceState('/users/' + this.user.page_id + '/' + this.profileTabs[this.selected.value]);
  }

}
