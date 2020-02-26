import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Request } from '../../../models/request';
import { expectedCostValidator } from 'src/app/validators/expectedCostValidator';
import { RequestService } from 'src/app/services/request.service';


@Component({
  selector: 'app-engineer-request-review',
  templateUrl: './engineer-request-review.component.html',
  styleUrls: ['./engineer-request-review.component.css']
})
export class EngineerRequestReviewComponent implements OnInit {
  request: Request;
  reviewRequestForm: FormGroup;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder,
              private requestService: RequestService, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.request = data.data;
    }, error => {
      console.log('e-request-review, data', error);
    });

    this.initializeReviewRequestForm();
  }

  initializeReviewRequestForm() {
    this.reviewRequestForm = this.formBuilder.group({
      promiseDate: ['', Validators.required],
      expectedCost: ['', [Validators.required, expectedCostValidator]]
    });
  }

  submit() {
    this.requestService.submitEngineerReviewedRequest(this.request.requestID, this.reviewRequestForm.value).subscribe(response => {
      console.log(response);
      this.router.navigate(['request-detail/' + response.requestID]);
    }, error => {
      console.log('engineer review, submit', error);
    });
  }

}
