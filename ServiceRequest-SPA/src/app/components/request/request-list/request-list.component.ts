import { Component, OnInit, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';

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

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private requestService: RequestService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.requests = data.data;
    }, error => {
      console.log('request list', error);
    });
  }

  toggleViewDetail() {
    this.detailMode = !this.detailMode;
  }

  viewDetailHandler(id: string) {
    this.idForDetailView = id;
    this.toggleViewDetail();
  }

}
