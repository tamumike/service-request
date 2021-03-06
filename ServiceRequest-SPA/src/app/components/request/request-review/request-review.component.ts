import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestService } from 'src/app/services/request.service';
import { CommentService } from 'src/app/services/comment.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/UI/modal/modal.component';

@Component({
  selector: 'app-request-review',
  templateUrl: './request-review.component.html',
  styleUrls: ['./request-review.component.css']
})
export class RequestReviewComponent implements OnInit {
  request: any;
  groupMembers: any;
  reviewRequestForm: FormGroup;
  pendingApproval: boolean = true;
  @ViewChild('commentList') commentListComponent: any;

  constructor(private route: ActivatedRoute, private userService: UserService,
              private formBuilder: FormBuilder, private requestService: RequestService,
              private router: Router, private commentService: CommentService, public matDialog: MatDialog) { }

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
      approved: [true],
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
    this.reviewRequestForm.value.approved = this.pendingApproval;

    if (this.reviewRequestForm.value.approved) {
      this.reviewRequestForm.value.status = 'Approved';
    } else {
      this.reviewRequestForm.value.status = 'Denied';
    }
    this.requestService.submitReviewedRequest(this.request.requestID, this.reviewRequestForm.value).subscribe(response => {

      this.router.navigate(['request-detail/' + response.requestID]);
    }, error => {
      console.log('review request, submit', error);
    });
  }

  openDialog() {
    if (!this.reviewRequestForm.valid) {
      this.reviewRequestForm.markAllAsTouched();
    } else {
      this.reviewRequestForm.value.status = this.reviewRequestForm.value.approved ? 'Approved' : 'Denied';
      this.reviewRequestForm.value.requestID = this.request.requestID;
      const dialogConfig = new MatDialogConfig();
      // The user can't close the dialog by clicking outside its body
      dialogConfig.disableClose = true;
      dialogConfig.id = 'modal-component';
      dialogConfig.data = {
        name: 'review',
        title: `Confirm ${this.reviewRequestForm.value.status} Request`,
        description: 'Are you sure you would like to submit this request review?',
        actionButtonText: 'Submit',
        formData: this.reviewRequestForm.value
      };
      const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
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

  // this method clears the required condition of form values if the request is to be denied (unchecked)
  // it will restore the required condition if the approved box is checked 
  toggleApprovalStatus() {
    this.pendingApproval = !this.pendingApproval;

    if (!this.pendingApproval) {
      this.reviewRequestForm.controls['afe'].clearValidators();
      this.reviewRequestForm.controls['afe'].setValue('');
      this.reviewRequestForm.controls['coupaDate'].clearValidators();
      this.reviewRequestForm.controls['coupaDate'].setValue('');
      this.reviewRequestForm.controls['engineerAssigned'].clearValidators();
      this.reviewRequestForm.controls['engineerAssigned'].setValue('');
    } else {
      this.reviewRequestForm.controls['afe'].setValidators([Validators.required]);
      this.reviewRequestForm.controls['coupaDate'].setValidators([Validators.required]);
      this.reviewRequestForm.controls['engineerAssigned'].setValidators([Validators.required]);
    }

    this.reviewRequestForm.controls['afe'].updateValueAndValidity();
    this.reviewRequestForm.controls['coupaDate'].updateValueAndValidity();
    this.reviewRequestForm.controls['engineerAssigned'].updateValueAndValidity();
  }

}
