import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent, NavigationEnd } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {
  request: any;

  constructor(private route: ActivatedRoute, private router: Router, private requestService: RequestService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.request = data.data;
    }, error => {
      console.log(error);
    });
  }

  refreshComponent(refresh: boolean) {
    if (refresh) {
      this.requestService.getRequest(this.request.requestID).subscribe(response => {
        this.request = response;
      }, error => {
        console.log('request-detail, refresh', error);
      });
    }
  }

}
