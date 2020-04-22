import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ModalActionsService {

constructor(private requestService: RequestService, private router: Router) { }

modalAction(modalData: any) {
  switch (modalData.name) {

    case 'create':
      this.createNewRequest(modalData);
      break;

    case 'review':
      this.submitRequestReview(modalData);
      break;

    case 'e-review':
      this.submitEngineerRequestReview(modalData);
      break;

    default:
      break;
  }
}

private createNewRequest(modalData: any) {
  console.log(modalData);
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
  console.log(modalData);
  this.requestService.submitReviewedRequest(modalData.formData.requestID, modalData.formData).subscribe(response => {
    this.router.navigate(['request-detail/' + response.requestID]);
  }, error => {
    console.log('review request, submit', error);
  });
}

private submitEngineerRequestReview(modalData: any) {
  this.requestService.submitEngineerReviewedRequest(modalData.formData.requestID, modalData.formData).subscribe(response => {
    console.log(response);
    this.router.navigate(['request-list']);
  }, error => {
    console.log('engineer review, submit', error);
  });
}

}
