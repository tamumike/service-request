import { Component, OnInit, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { User } from 'src/app/models/user';
import { Sort } from '@angular/material/sort';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {
  baseUrl = environment.baseUrl;
  requests: any;
  detailMode = false;
  @Output() idForDetailView: any;
  userInfo: User;
  requestParams: any = {};
  sortedData: any;
  fieldsForFilter = [
                    {display: 'Request ID', value: 'requestID'},
                    {display: 'Requested By', value: 'createdBy'},
                    {display: 'Location', value: 'location'},
                    {display: 'Status', value: 'status'},
                    ];
  filterRequestsForm: FormGroup;
  toggleFilterInputType = false;
  locations: any;
  filterMode = false;

  constructor(private route: ActivatedRoute,
              private router: Router, private formBuilder: FormBuilder,
              private requestService: RequestService, private modalService: ModalService) { }

  ngOnInit() {

    this.filterRequestsForm = this.formBuilder.group({
      field: [null],
      fieldValue: [''],
      fieldValue2: ['']
    });

    this.route.data.subscribe(data => {
      this.userInfo = data.user;
      if (this.userInfo.role === 3) {
        this.requestParams.owner = 'Admin';
      } else {
        this.requestParams.owner = this.userInfo.username;
      }
    }, error => {
      console.log('request list', error);
    });

    this.getRequests();
    this.getLocations();
  }

  toggleViewDetail() {
    this.detailMode = !this.detailMode;
  }

  clearFilter(event: any) {
    event.preventDefault();
    this.requestParams = {};

    if (this.userInfo.role !== 3) {
      this.requestParams.owner = this.userInfo.username;
    } else {
      this.requestParams.owner = 'Admin';
    }

    this.filterRequestsForm.reset();
    this.getRequests();
  }

  checkFilterInputType() {
    if (this.filterRequestsForm.value.field === 'location') {
      this.toggleFilterInputType = true;
    } else {
      this.toggleFilterInputType = false;
    }
  }

  filterRequests() {
    this.requestParams = {};
    if (this.filterRequestsForm.value.field !== null) {

      if (this.filterRequestsForm.value.field === 'location') {
        this.requestParams[this.filterRequestsForm.value.field] = this.filterRequestsForm.value.fieldValue2;
      } else {
        this.requestParams[this.filterRequestsForm.value.field] = this.filterRequestsForm.value.fieldValue;
      }

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

  getLocations() {
    this.requestService.getLocations().subscribe(response => {
      this.locations = response;
    }, error => {
      console.log('request-list, locations', error);
    });
  }

  viewDetailHandler(id: string) {
    this.idForDetailView = id;
    this.toggleViewDetail();
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
