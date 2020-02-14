import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-request-create',
  templateUrl: './request-create.component.html',
  styleUrls: ['./request-create.component.css']
})
export class RequestCreateComponent implements OnInit {
  createRequestForm: FormGroup;
  locations: any;

  constructor(private formBuilder: FormBuilder, private requestService: RequestService) { }

  ngOnInit() {
    this.initializeRequestForm();
    this.getLocationsForForm();
  }

  initializeRequestForm() {
    this.createRequestForm = this.formBuilder.group({
      requestDate: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
      deliverables: ['', Validators.required]
    });
  }

  createRequest() {
    console.log('create request');
  }

  getLocationsForForm() {
    this.requestService.getLocations().subscribe(response => {
      this.locations = response;
    }, error => {
      console.log(error);
    });
  }

}
