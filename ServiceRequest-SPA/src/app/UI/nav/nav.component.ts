import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  user: any;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserInfo().subscribe(response => {
      this.user = response;
      console.log(response);
    }, error => {
      console.log('nav, user', error);
    });
  }

}
