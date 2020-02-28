import { Component, OnInit, Output } from '@angular/core';

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
    { display: 'Property Code', value: 'propertyCode', toggleType: true },
    { display: 'Engineer', value: 'engineerAssigned', toggleType: true }
  ];
  filterRequestsForm: FormGroup;
  toggleFilterInputType = false;
  locations: any;
  groupMembers: any;
  propCodes: any;
  filterMode = false;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder,
              private requestService: RequestService, private modalService: ModalService,
              private userService: UserService) { }

  ngOnInit() {

    this.filterRequestsForm = this.formBuilder.group({
      field: [null],
      fieldValue: ['']
    });

    this.userInfo = this.userService.user;

    this.getRequests();
    this.getLocations();
    this.getGroupMembers();
    this.getPropCodes();
  }

  clearFilter(event: any) {
    event.preventDefault();
    this.resetRequestParams();

    this.getRequestParamsOwner();
    this.filterRequestsForm.get('fieldValue').setValue('');
    this.getRequests();
  }

  getRequestParamsOwner() {
    if (this.userService.isAdministrator()) {
      this.requestParams.owner = creds;
    } else {
      this.requestParams.owner = this.userInfo.username;
    }
  }

  resetRequestParams() {
    console.log(this.requestParams);
    this.requestParams =  {owner: this.requestParams.owner};
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
    this.resetRequestParams();

    if (this.filterRequestsForm.value.field !== null && this.filterRequestsForm.value.fieldValue.length > 0) {

      this.requestParams[this.filterRequestsForm.value.field] = this.filterRequestsForm.value.fieldValue;

      this.getRequests();
    }
  }

  toggleFilterMode() {
    this.filterMode = !this.filterMode;
  }

  getRequests() {
    this.requestService.getRequests(this.requestParams).subscribe(response => {
      this.requests = response;
      this.sortedData = this.requests.slice();
    }, error => {
      console.log('request list, get user requests', error);
    });
  }

  getPropCodes() {
    this.propCodes = this.requestService.propCodes;
  }

  getLocations() {
    this.locations = this.requestService.locations;
  }

  getGroupMembers() {
    this.groupMembers = this.userService.groupMembers;
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
        default: return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
