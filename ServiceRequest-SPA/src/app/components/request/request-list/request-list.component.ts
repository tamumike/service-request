import { Component, OnInit, Output, ElementRef, ViewChild } from '@angular/core';

import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { User } from 'src/app/models/user';
import { Sort } from '@angular/material/sort';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';
import { UserService } from 'src/app/services/user.service';
import { creds } from 'src/app/helpers/creds';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {
  baseUrl = environment.baseUrl;
  requests: any;
  userInfo: User;
  requestParams: any = {};
  sortedData: any;
  fieldsForFilter = [
    { display: 'Request ID', value: 'requestID', toggleType: false},
    { display: 'Requested By', value: 'createdBy', toggleType: false },
    { display: 'Location', value: 'location', toggleType: true },
    { display: 'Status', value: 'status', toggleType: false },
    { display: 'AFE', value: 'afe', toggleType: false},
    { display: 'Engineer', value: 'engineerAssigned', toggleType: true }
  ];
  filterRequestsForm: FormGroup;
  toggleFilterInputType = false;
  locations: any;
  groupMembers: any;
  filterMode = false;
  showAllMode = false;
  requestsCount = 0;
  @ViewChild('toggleAllBtn') toggleAllBtn: ElementRef;
  @ViewChild('toggleAssignedBtn') toggleAssignedBtn: ElementRef;
  activeClasses = ['esr-headline-box esr-headline-sub-box esr-headline-box-active'];

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder,
              private requestService: RequestService, private modalService: ModalService,
              private userService: UserService, private router: Router) { }

  ngOnInit() {

    this.initializeFilterRequestsForm();

    this.userInfo = this.userService.user;

    this.initializeRequestParams();

    this.getRequests();
    this.locations = this.requestService.locations;
    this.groupMembers = this.userService.groupMembers;
  }

  initializeFilterRequestsForm() {
    this.filterRequestsForm = this.formBuilder.group({
      field: [null],
      fieldValue: ['']
    });
  }

  initializeRequestParams() {
    if (!this.showAllMode) {
      this.requestParams = { owner: this.getRequestParamsOwner() };
    }
  }

  clearFilter(event: any) {
    event.preventDefault();

    for (const key of Object.keys(this.requestParams)) {
      if (key !== 'owner') {
        delete this.requestParams[key];
      }
    }

    this.filterRequestsForm.get('fieldValue').setValue('');
    this.getRequests();
  }

  getRequestParamsOwner() {
    if (this.userService.isAdministrator()) {
      return creds;
    } else {
      return this.userInfo.username;
    }
  }

  checkFilterInputType() {
    this.filterRequestsForm.value.fieldValue = '';
    this.filterRequestsForm.get('fieldValue').setValue('');

    for (const value of this.fieldsForFilter) {
      if (value.value === this.filterRequestsForm.value.field) {
        this.toggleFilterInputType = value.toggleType;
      }
    }
  }

  filterRequests() {

    if (this.filterRequestsForm.value.field !== null && this.filterRequestsForm.value.fieldValue.length > 0) {

      this.requestParams[this.filterRequestsForm.value.field] = this.filterRequestsForm.value.fieldValue;

      this.getRequests();
    }
  }

  toggleFilterMode() {
    this.filterMode = !this.filterMode;
  }

  toggleShowAll(event: any) {

    this.clearActiveHeadline();

    this.toggleAllBtn.nativeElement.classList.add('esr-headline-box-active');

    if (!this.showAllMode) {
      this.showAllMode = true;
      delete this.requestParams.owner;
      this.getRequests();
    }
  }

  toggleShowAssigned() {

    this.clearActiveHeadline();

    this.toggleAssignedBtn.nativeElement.classList.add('esr-headline-box-active');

    if (this.showAllMode) {
      this.showAllMode = false;
      this.requestParams.owner = this.getRequestParamsOwner();
      this.getRequests();
    }
  }

  clearActiveHeadline() {
    const elements = [this.toggleAllBtn, this.toggleAssignedBtn];

    elements.forEach(el => {
      el.nativeElement.classList.remove('esr-headline-box-active');
    });

  }

  getRequests() {
    this.requestService.getRequests(this.requestParams).subscribe(response => {
      this.requests = response;
      this.sortedData = this.requests.slice();
      this.requestsCount = this.requests.length;
    }, error => {
      console.log('request list, get user requests', error);
    });
  }

  navToRequest(id: string) {
    this.router.navigate(['request-detail/' + id]);
  }

  sortData(sort: Sort) {
    const data = this.requests.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'requestID': return compare(a.requestID, b.requestID, isAsc);
        case 'createdBy': return compare(a.createdBy, b.createdBy, isAsc);
        case 'requestDate': return compare(a.requestDate, b.requestDate, isAsc);
        case 'location': return compare(a.location, b.location, isAsc);
        case 'status': return compare(a.status, b.status, isAsc);
        case 'submitted': return compare(a.submitted, b.submitted, isAsc);
        case 'approved': return compare(a.approved, b.approved, isAsc);
        case 'title': return compare(a.title, b.title, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
