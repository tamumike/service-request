import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { Request } from 'src/app/models/request';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { CommentService } from 'src/app/services/comment.service';

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
  @ViewChild('commentList') commentListComponent: any;
  newRequestCount: any;

  constructor(private route: ActivatedRoute, private router: Router,
              private requestService: RequestService, private userService: UserService,
              private commentService: CommentService) { }

  ngOnInit() {
    this.userInfo = this.userService.user;
    this.route.data.subscribe(data => {
      this.request = data.data;
      this.idToCommentCreate = this.request.requestID;
    }, error => {
      console.log('request-detail resolve', error);
    });

    this.isAdmin = this.userService.isAdministrator();
    this.isEngineer = this.userService.isEngineer();

    this.requestService.newRequestCount.subscribe(x => {
      this.newRequestCount = x;
    });

    if (!this.request.acknowledged && this.requestService.isRequestOwnedByUser(this.request)) {
      this.request.acknowledged = true;
      this.newRequestCount -= 1;
      this.requestService.newRequestCount.next(this.newRequestCount);
      this.requestService.updateRequest(this.request.requestID, this.request).subscribe(response => {
        this.request = response;
      }, error => {
        console.log('request detail, update request', error);
      });
    }
  }

  refreshComments(refresh: boolean) {
    if (refresh) {
      this.commentService.getComments(this.request.requestID).subscribe(response => {
        this.request.comments = response;
        this.commentListComponent.refreshCount(this.request.comments.length);
      }, error => {
        console.log('request-detail, refresh comments', error);
      });
    }
  }

}
