import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-request-review',
  templateUrl: './request-review.component.html',
  styleUrls: ['./request-review.component.css']
})
export class RequestReviewComponent implements OnInit {
  request: any;
  groupMembers: any;
  propCodes: any;
  reviewRequestForm: FormGroup;

  constructor(private route: ActivatedRoute, private userService: UserService,
              private formBuilder: FormBuilder, private requestService: RequestService,
              private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.request = data.data;
    }, error => {
      console.log('request-review', error);
    });

    this.getGroupMembers();
    this.getPropertyCodes();
    this.initializeReviewRequestForm();
  }

  initializeReviewRequestForm() {
    this.reviewRequestForm = this.formBuilder.group({
      engineerAssigned: ['', Validators.required],
      afe: ['', Validators.required],
      coupaDate: ['', Validators.required],
      propertyCode: ['', Validators.required],
      approved: [],
      createdBy: [this.request.createdBy, Validators.required],
      acknowledged: [false, Validators.required]
    });
  }

  getGroupMembers() {
    this.userService.getGroupMembers().subscribe(response => {
      this.groupMembers = response;
    }, error => {
      console.log('request-review, group members', error);
    });
  }

  getPropertyCodes() {
    this.requestService.getPropertyCodes().subscribe(response => {
      this.propCodes = response;
    }, error => {
      console.log('review request, prop codes', error);
    });
  }

  submitRequestReview() {
    console.log('submit request review');
    this.requestService.submitReviewedRequest(this.request.requestID, this.reviewRequestForm.value).subscribe(response => {
      this.router.navigate(['request-detail/' + response.requestID]);
    }, error => {
      console.log('review request, submit', error);
    });
  }

}
