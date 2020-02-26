import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { Request } from 'src/app/models/request';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {
  request: Request;
  @Output() idToCommentCreate: any;
  userInfo: User;
  isAdmin: boolean;
  isEngineer: boolean;

  constructor(private route: ActivatedRoute, private router: Router,
              private requestService: RequestService, private userService: UserService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.request = data.data;
      this.userInfo = data.user;
      this.idToCommentCreate = this.request.requestID;
      this.isAdmin = this.userInfo.role === 3;
      this.isEngineer = this.userInfo.role === 3;   /// THIS IS USED FOR TESTING....SHOULD BE 2
    }, error => {
      console.log('request-detail resolve', error);
    });

    if (!this.request.acknowledged) {
      this.request.acknowledged = true;
      this.requestService.updateRequest(this.request.requestID, this.request).subscribe(response => {
        this.request = response;
      }, error => {
        console.log('request detail, update request', error);
      });
    }
  }

  isAcknowledged() {
    return this.request.acknowledged;
  }

  refreshComponent(refresh: boolean) {
    if (refresh) {
      this.requestService.getRequest(this.request.requestID).subscribe(response => {
        this.request = response;
      }, error => {
        console.log('request-detail, refresh', error);
      });
    }
  }

}
