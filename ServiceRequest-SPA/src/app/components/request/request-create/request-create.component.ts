import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RequestService } from 'src/app/services/request.service';

import { requestDateValidator } from '../../../validators/requestDateValidator';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-request-create',
  templateUrl: './request-create.component.html',
  styleUrls: ['./request-create.component.css']
})
export class RequestCreateComponent implements OnInit {
  createRequestForm: FormGroup;
  locations: any;
  idForAttachment: string;
  fileToUpload: File = null;
  userInfo: User;
  @Output() requestCreated = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private requestService: RequestService, private userService: UserService) { }

  ngOnInit() {
    this.getUserInfo();
    this.initializeRequestForm();
    this.getLocationsForForm();
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
    this.userService.getUserInfo().subscribe(response => {
      this.userInfo = response;
    }, error => {
      console.log('request create, user info', error);
    });
  }

  createRequest() {
    console.log('create request');
    this.createRequestForm.value.createdBy = this.userInfo.username;

    this.requestService.postRequest(this.createRequestForm.value).subscribe(response => {
      console.log(response);

      this.requestService.postAttachment(this.fileToUpload, response.requestID).subscribe(res => {
        console.log(res);
      }, error => {
        console.log(error);
      });

      this.requestCreated.emit(true);

    }, error => {
      console.log(error);
    });

  }

  handleInputFile(files: FileList) {
    this.fileToUpload = files[0];
  }

  getLocationsForForm() {
    this.requestService.getLocations().subscribe(response => {
      this.locations = response;
    }, error => {
      console.log(error);
    });
  }

}
