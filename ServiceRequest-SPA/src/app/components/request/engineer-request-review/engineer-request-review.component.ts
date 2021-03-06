import { Component, OnInit, ElementRef, ViewChild, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';

import { Request } from '../../../models/request';
import { expectedCostValidator } from 'src/app/validators/expectedCostValidator';
import { RequestService } from 'src/app/services/request.service';
import { requestDateValidator } from 'src/app/validators/requestDateValidator';
import { FinalCommentCreateComponent } from '../../comment/final-comment-create/final-comment-create.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/UI/modal/modal.component';
import { Comment } from 'src/app/models/comment';

@Component({
  selector: 'app-engineer-request-review',
  templateUrl: './engineer-request-review.component.html',
  styleUrls: ['./engineer-request-review.component.css']
})
export class EngineerRequestReviewComponent implements OnInit {
  request: Request;
  reviewRequestForm: FormGroup;
  resolveRequestForm: FormGroup;
  @Output() resolveModeForComment = false;
  @ViewChild(FinalCommentCreateComponent) createComment: FinalCommentCreateComponent;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder,
              private requestService: RequestService, private router: Router, public matDialog: MatDialog) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.request = data.data;
    }, error => {
      console.log('e-request-review, data', error);
    });

    this.initializeReviewRequestForm();
    this.initializeResolveRequestForm();
  }

  initializeReviewRequestForm() {
    this.reviewRequestForm = this.formBuilder.group({
      promiseDate: ['', [Validators.required, requestDateValidator]],
      expectedCost: ['', [Validators.required, expectedCostValidator]],
      status: ['Working']
    });
  }

  initializeResolveRequestForm() {
    this.resolveRequestForm = this.formBuilder.group({
      status: ['', [Validators.required, Validators.minLength(5)]],
      comment: ['', Validators.required]
    });

  }

  toggleResolveMode() {
    this.resolveModeForComment = !this.resolveModeForComment;
  }

  setFormErrors(control: AbstractControl, value: string) {
    if (value.length <= 0) {
      control.markAsTouched();
      control.setErrors({
        required: true
      });
    }
  }

  resolveRequest() {
    const comment = {
      requestID: this.request.requestID,
      author: '',
      content: this.resolveRequestForm.value.comment,
      resolution: true
    } as Comment;

    const request = {
      status: this.resolveRequestForm.value.status
    } as Request;

    const data = {
      requestID: this.request.requestID,
      commentData: comment,
      requestData: request
    };

    if (!this.resolveRequestForm.valid) {
      this.resolveRequestForm.markAllAsTouched();
    } else {
      this.resolveRequestForm.value.requestID = this.request.requestID;
      this.resolveRequestForm.value.comment = comment;
      const dialogConfig = new MatDialogConfig();
      // The user can't close the dialog by clicking outside its body
      dialogConfig.disableClose = true;
      dialogConfig.id = 'modal-component';
      dialogConfig.data = {
        name: 'resolve',
        title: 'Confirm Request Review',
        description: 'Are you sure you would like to close this request?',
        actionButtonText: 'Submit',
        formData: data
      };
      const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
    }

    // if (this.resolveRequestForm.valid) {
    //   this.requestService.resolveRequest(this.request.requestID, this.resolveRequestForm.value).subscribe(response => {
    //     if (response) {
    //       console.log(this.createComment.createCommentForm.value);
    //       this.createComment.createCommentForm.value.requestID = response.requestID;
    //       this.createComment.createCommentForm.value.resolution = true;
    //       this.createComment.createComment();
    //     }
    //     this.router.navigate(['request-list']);
    //   }, error => {
    //     console.log('engineer review, resolve', error);
    //   });
    // } else {
    // }
  }

  submitEngineerReviewedRequest() {
    if (!this.reviewRequestForm.valid) {
      this.reviewRequestForm.markAllAsTouched();
    } else {
      this.reviewRequestForm.value.requestID = this.request.requestID;
      const dialogConfig = new MatDialogConfig();
      // The user can't close the dialog by clicking outside its body
      dialogConfig.disableClose = true;
      dialogConfig.id = 'modal-component';
      dialogConfig.data = {
        name: 'e-review',
        title: 'Confirm Request Review',
        description: 'Are you sure you would like to accept this request?',
        actionButtonText: 'Submit',
        formData: this.reviewRequestForm.value
      };
      const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
    }
  }

}
