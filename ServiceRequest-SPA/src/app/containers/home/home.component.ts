import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { RequestService } from 'src/app/services/request.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  requests: any;
  baseUrl = environment.baseUrl;
  userInfo: User;

  constructor(private http: HttpClient, private requestService: RequestService
            , private userService: UserService, private route: ActivatedRoute, private modalService: ModalService) { }

  ngOnInit() {
  }

  getUserInfo() {
    this.userService.getUserInfo(this.userService.getUserIdentifier()).subscribe(response => {
      this.userInfo = response;
    }, error => {
      console.log(error);
    });
  }

  getRequests() {
    this.requestService.getRequests().subscribe(response => {
      this.requests = response;
    }, error => {
      console.log(error);
    });
  }

}
