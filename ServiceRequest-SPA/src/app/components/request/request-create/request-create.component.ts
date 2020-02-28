import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RequestService } from 'src/app/services/request.service';

import { requestDateValidator } from 'src/app/validators/requestDateValidator';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-request-create',
  templateUrl: './request-create.component.html',
  styleUrls: ['./request-create.component.css']
})
export class RequestCreateComponent implements OnInit {
  createRequestForm: FormGroup;
  locations: any;
  fileToUpload: File[] = null;
  userInfo: User;
  modalConfig: any;
  private sessionID: any;

  constructor(private formBuilder: FormBuilder, private requestService: RequestService,
              private userService: UserService, private modalService: ModalService) { }

  ngOnInit() {
    this.sessionID = this.userService.getUserIdentifier();
    this.getUserInfo();
    this.initializeRequestForm();
    this.getLocationsForForm();
  }

  testConfirm() {
    this.modalService.toggleDisplay({ display: true, type: 'confirm'});
  }

  initializeRequestForm() {
    this.createRequestForm = this.formBuilder.group({
      requestDate: ['', [Validators.required, requestDateValidator]],
      location: ['', Validators.required],
      description: ['', Validators.required],
      deliverables: ['', Validators.required],
      attachments: ['', Validators.required]
    });
  }

  getUserInfo() {
    this.userService.getUserInfo(this.sessionID).subscribe(response => {
      this.userInfo = response;
    }, error => {
      console.log('request create, user info', error);
    });
  }

  createRequest() {
    console.log('create request');
    this.createRequestForm.value.createdBy = this.userInfo.username;
    this.modalService.toggleDisplay({display: true, type: 'loading'});

    this.requestService.postRequest(this.createRequestForm.value).subscribe(response => {

      for (const i of this.fileToUpload) {
        this.requestService.postAttachment(i, response.requestID).subscribe(res => {
          console.log(res);
          console.log('Succesful file upload!');
        }, error => {
          console.log('error inspect', error);
        });
      }
      this.modalService.toggleDisplay({display: false, type: ''});
    }, error => {
      console.log(error);
    });
  }

  handleInputFile(files: FileList) {
    this.fileToUpload = Object.values(files);
  }

  getLocationsForForm() {
    this.locations = this.requestService.locations;
  }

}
