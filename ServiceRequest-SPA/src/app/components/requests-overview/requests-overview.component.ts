import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-requests-overview',
  templateUrl: './requests-overview.component.html',
  styleUrls: ['./requests-overview.component.css']
})
export class RequestsOverviewComponent implements OnInit {
  @Input() requestsFromHome;
  statusCounts = {Open: 0, Pending: 0, 'Under Review': 0 };
  baseUrl = environment.baseUrl;
  requests: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getStatusCounts();
  }

  getStatusCounts() {
    this.http.get(this.baseUrl + 'Requests').subscribe(response => {
      this.requests = response;
      this.requests.forEach(x => {
        this.statusCounts[x.status] += 1;
      });
      console.log(this.statusCounts);
    });

    // if (this.requestsFromHome) {
    //   this.requestsFromHome.forEach(r => {
    //     this.statusCounts[r.status] += 1;
    //   });
    //   console.log(this.statusCounts);
    // }

  }

}
