import { Component, OnInit } from '@angular/core';

import { User } from '../../models/user/user';
import { UserService } from '../../services/user/user.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[];

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private navigationService: NavigationService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle("Utilisateurs - UTile");
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

}
