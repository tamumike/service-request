import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {
  @Input() requestsFromHome: any;
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // this.getRequests();
  }

  getRequests() {
    // this.http.get(this.baseUrl + 'requests').subscribe(response => {
    //   console.log(response);
    //   this.requests = response;
    // }, error => {
    //   console.log(error);
    // });
  }

}
