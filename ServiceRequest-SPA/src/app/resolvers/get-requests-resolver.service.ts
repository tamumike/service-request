import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { RequestService } from '../services/request.service';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetRequestsResolverService implements Resolve<any> {

constructor(private requestService: RequestService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.requestService.getRequests()
      .pipe(
        catchError(error => {
          console.log(error);
          return of(null);
        })
      );
  }
}