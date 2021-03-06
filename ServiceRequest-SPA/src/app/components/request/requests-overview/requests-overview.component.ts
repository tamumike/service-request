import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { RequestService } from 'src/app/services/request.service';
import { UserService } from 'src/app/services/user.service';
import { creds } from 'src/app/helpers/creds';

@Component({
  selector: 'app-requests-overview',
  templateUrl: './requests-overview.component.html',
  styleUrls: ['./requests-overview.component.css']
})
export class RequestsOverviewComponent implements OnInit {
  baseUrl = environment.baseUrl;
  requests: any;
  userInfo: User;
  requestParams: any = {};
  numberOfNewRequests = 0;
  private isAdmin = false;
  creds: any;

  constructor(private route: ActivatedRoute, private router: Router, private requestService: RequestService,
              private userService: UserService) { }

  ngOnInit() {
    this.userInfo = this.userService.user;
    this.isAdmin = this.userService.isAdministrator();
    this.getRequestParamsOwner();
    this.getUserRequests();
    this.requestService.newRequestCount.subscribe(x => {
      this.numberOfNewRequests = x;
    });
  }

  getRequestParamsOwner() {
    if (this.isAdmin) {
      this.requestParams.owner = creds;
    } else {
      this.requestParams.owner = this.userInfo.username;
    }
  }

  getNewRequestCount() {
    this.requests.forEach(x => {
      if (!x.acknowledged) {
        this.numberOfNewRequests += 1;
      }
    });
  }

  getUserRequests() {
    this.requestService.getRequests(this.requestParams).subscribe(response => {
      this.requests = response;
    }, error => {
      console.log('requests-overview, get user requests', error);
    });
  }

  navToCreate(event: any) {
    event.preventDefault();
    this.router.navigate([{ outlets: { primary: 'request-create', sidebar: 'requests-overview' }}]);
  }

}
