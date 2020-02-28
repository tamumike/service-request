import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { RequestService } from '../services/request.service';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetRequestsResolverService implements Resolve<any> {

constructor(private requestService: RequestService) { }

  resolve(route: ActivatedRouteSnapshot) {
    console.log('get requests resolver');
    return this.requestService.getRequests()
      .pipe(
        catchError(error => {
          console.log(error);
          return of(null);
        })
      );
  }
}
