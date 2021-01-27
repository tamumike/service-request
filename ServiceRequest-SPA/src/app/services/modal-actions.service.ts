import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { CommentService } from './comment.service';
import { UserService } from './user.service';
import { Request } from 'src/app/models/request';

@Injectable({
  providedIn: 'root'
})
export class ModalActionsService {

constructor(private requestService: RequestService, private commentService: CommentService,
            private userService: UserService, private router: Router) { }

modalAction(modalData: any) {
  switch (modalData.name) {

    case 'create':
      this.createNewRequest(modalData);
      break;

    case 'review':
      this.submitRequestReview(modalData);
      break;

    case 'resolve':
      this.resolveRequest(modalData);
      break;

    case 'e-review':
      this.submitEngineerRequestReview(modalData);
      break;

    default:
      break;
  }
}

private resolveRequest(modalData: any) {
  modalData.formData.commentData.author = this.userService.user.displayName;
  forkJoin([
    this.requestService.resolveRequest(modalData.formData.requestID, modalData.formData.requestData),
    this.commentService.postComment(modalData.formData.commentData)
  ]).subscribe(response => {
    this.router.navigate(['request-list']);
  }, error => {
    console.log(error);
  });
}

private createNewRequest(modalData: any) {
  this.requestService.postRequest(modalData.formData).subscribe(response => {
    if (modalData.formAttachments) {
      for (const i of modalData.formAttachments) {
        this.requestService.postAttachment(i, response.requestID).subscribe(res => {
          console.log('Succesful file upload!');
        }, error => {
          console.log('file upload error', error);
        });
      }
    }
    this.router.navigate(['request-detail/' + response.requestID]);
  }, error => {
    console.log('error from request create', error);
  });
}

private submitRequestReview(modalData: any) {
  this.requestService.submitReviewedRequest(modalData.formData.requestID, modalData.formData).subscribe(response => {
    this.router.navigate(['request-detail/' + response.requestID]);
  }, error => {
    console.log('review request, submit', error);
  });
}

private submitEngineerRequestReview(modalData: any) {
  this.requestService.submitEngineerReviewedRequest(modalData.formData.requestID, modalData.formData).subscribe(response => {
    this.router.navigate(['request-list']);
  }, error => {
    console.log('engineer review, submit', error);
  });
}

}
