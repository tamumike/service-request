import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { RequestService } from 'src/app/services/request.service';
import { ModalService } from 'src/app/services/modal.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  requests: any;
  baseUrl = environment.baseUrl;
  modalConfig: any;
  userInfo: any;

  constructor(private http: HttpClient, private requestService: RequestService
            , private modalService: ModalService, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getUserInfo();
    this.getRequests();
  }

  getUserInfo() {
    this.userService.getUserInfo().subscribe(response => {
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

  displayCreate() {
    this.modalConfig = {display: true, content: ''};
    this.modalService.toggleDisplay(this.modalConfig);
  }

}
