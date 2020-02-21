import { Component, OnInit, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {
  baseUrl = environment.baseUrl;
  requests: any;
  detailMode = false;
  @Output() idForDetailView: any;
  userInfo: User;
  requestParams: any = {};

  constructor(private http: HttpClient, private route: ActivatedRoute,
              private router: Router,
              private requestService: RequestService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.userInfo = data.user;
      if (this.userInfo.role === 2) {
        this.requestParams.owner = 'Admin';
      } else {
        this.requestParams.owner = this.userInfo.username;
      }
    }, error => {
      console.log('request list', error);
    });
    this.getUserRequests();
  }

  toggleViewDetail() {
    this.detailMode = !this.detailMode;
  }

  clearFilter() {
    this.requestParams = null;
    this.getUserRequests();
  }

  getUserRequests() {
    this.requestService.getRequests(this.requestParams).subscribe(response => {
      this.requests = response;
    }, error => {
      console.log('request list, get user requests', error);
    });
  }

  viewDetailHandler(id: string) {
    this.idForDetailView = id;
    this.toggleViewDetail();
  }

}
