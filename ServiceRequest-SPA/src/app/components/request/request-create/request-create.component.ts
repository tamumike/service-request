import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RequestService } from 'src/app/services/request.service';

import { requestDateValidator } from 'src/app/validators/requestDateValidator';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/UI/modal/modal.component';

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
              private userService: UserService, private router: Router,
              private alertifyService: AlertifyService, public matDialog: MatDialog) { }

  ngOnInit() {
    this.sessionID = this.userService.getUserIdentifier();
    this.userInfo = this.userService.user;
    this.locations = this.requestService.locations;
    this.initializeRequestForm();
  }

  initializeRequestForm() {
    this.createRequestForm = this.formBuilder.group({
      requestDate: ['', [Validators.required, requestDateValidator]],
      location: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      deliverables: ['', Validators.required],
      attachments: ['']
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
    if (!this.createRequestForm.valid) {
      this.createRequestForm.markAllAsTouched();
    } else {
      this.createRequestForm.value.createdBy = this.userInfo.username;
      const dialogConfig = new MatDialogConfig();
      // The user can't close the dialog by clicking outside its body
      dialogConfig.disableClose = true;
      dialogConfig.id = 'modal-component';
      dialogConfig.data = {
        name: 'create',
        title: 'Confirm New Request',
        description: 'Are you sure you would like to submit this request?',
        actionButtonText: 'Submit',
        formData: this.createRequestForm.value,
        formAttachments: this.fileToUpload
      };
      const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
     }
  }

  handleInputFile(files: FileList) {
    this.fileToUpload = Object.values(files);
  }

}
