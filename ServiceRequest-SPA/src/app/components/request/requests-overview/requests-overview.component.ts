import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-requests-overview',
  templateUrl: './requests-overview.component.html',
  styleUrls: ['./requests-overview.component.css']
})
export class RequestsOverviewComponent implements OnInit {
  statusCounts = {Open: 0, Pending: 0, 'Under Review': 0, Approved: 0 };
  baseUrl = environment.baseUrl;
  requests: any;
  userInfo: User;
  requestParams: any = {};
  numberOfNewRequests = 0;

  constructor(private route: ActivatedRoute, private router: Router, private requestService: RequestService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.userInfo = data.user;
      if (this.userInfo.role === 2) {
        this.requestParams.owner = 'Admin';
      } else {
        this.requestParams.owner = this.userInfo.username;
      }
    });
    this.getUserRequests();
  }

  getUserRequests() {
    this.requestService.getRequests(this.requestParams).subscribe(response => {
      this.requests = response;
      this.requests.forEach(x => {
        this.statusCounts[x.status] += 1;
        if (!x.acknowledged) {
          this.numberOfNewRequests += 1;
        }
      });
    }, error => {
      console.log('requests-overview, get user requests', error);
    });
  }

  showNewRequests() {
    this.router.navigate(['/request-detail/20-001']);
  }

}
