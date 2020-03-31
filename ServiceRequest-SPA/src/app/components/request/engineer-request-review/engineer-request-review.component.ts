import { Component, OnInit, ElementRef, ViewChild, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';

import { Request } from '../../../models/request';
import { expectedCostValidator } from 'src/app/validators/expectedCostValidator';
import { RequestService } from 'src/app/services/request.service';
import { requestDateValidator } from 'src/app/validators/requestDateValidator';
import { FinalCommentCreateComponent } from '../../comment/final-comment-create/final-comment-create.component';


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
              private requestService: RequestService, private router: Router) { }

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
      status: ['', [Validators.required, Validators.minLength(5)]]
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

    const commentForm = this.createComment.createCommentForm;

    if (this.resolveRequestForm.value.status.length > 0 && commentForm.value.content.length > 0) {

      this.requestService.resolveRequest(this.request.requestID, this.resolveRequestForm.value).subscribe(response => {
        if (response) {
          console.log(this.createComment.createCommentForm.value);
          this.createComment.createCommentForm.value.requestID = response.requestID;
          this.createComment.createCommentForm.value.resolution = true;
          this.createComment.createComment();
        }
        this.router.navigate(['request-list']);
      }, error => {
        console.log('engineer review, resolve', error);
      });
    } else {
      const statusControl = this.resolveRequestForm.controls.status;
      const commentContentControl = this.createComment.createCommentForm.controls.content;

      this.setFormErrors(statusControl, this.resolveRequestForm.value.status);
      this.setFormErrors(commentContentControl, commentForm.value.content);
    }
  }

  submit() {
    this.requestService.submitEngineerReviewedRequest(this.request.requestID, this.reviewRequestForm.value).subscribe(response => {
      console.log(response);
      this.router.navigate(['request-list']);
    }, error => {
      console.log('engineer review, submit', error);
    });
  }

}
