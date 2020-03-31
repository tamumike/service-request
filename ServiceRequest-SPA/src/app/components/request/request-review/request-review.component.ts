import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestService } from 'src/app/services/request.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-request-review',
  templateUrl: './request-review.component.html',
  styleUrls: ['./request-review.component.css']
})
export class RequestReviewComponent implements OnInit {
  request: any;
  groupMembers: any;
  reviewRequestForm: FormGroup;
  @ViewChild('commentList') commentListComponent: any;

  constructor(private route: ActivatedRoute, private userService: UserService,
              private formBuilder: FormBuilder, private requestService: RequestService,
              private router: Router, private commentService: CommentService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.request = data.data;
    }, error => {
      console.log('request-review', error);
    });

    this.getGroupMembers();
    this.initializeReviewRequestForm();
  }

  initializeReviewRequestForm() {
    this.reviewRequestForm = this.formBuilder.group({
      engineerAssigned: ['', Validators.required],
      afe: ['', Validators.required],
      coupaDate: ['', Validators.required],
      approved: [],
      status: [''],
      createdBy: [this.request.createdBy, Validators.required],
      acknowledged: [false, Validators.required]
    });
  }

  getGroupMembers() {
    this.groupMembers = this.userService.groupMembers;
  }

  submitRequestReview() {
    console.log('submit request review');
    this.reviewRequestForm.value.propertyCode = 0;

    if (this.reviewRequestForm.value.approved) {
      this.reviewRequestForm.value.status = 'Approved';
    } else {
      this.reviewRequestForm.value.status = 'Requested';
    }

    console.log(this.reviewRequestForm.value);
    this.requestService.submitReviewedRequest(this.request.requestID, this.reviewRequestForm.value).subscribe(response => {
      this.router.navigate(['request-detail/' + response.requestID]);
    }, error => {
      console.log('review request, submit', error);
    });
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
