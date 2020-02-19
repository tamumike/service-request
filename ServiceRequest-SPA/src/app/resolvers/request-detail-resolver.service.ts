import { Injectable } from '@angular/core';
import { RequestService } from '../services/request.service';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestDetailResolverService implements Resolve<any> {

constructor(private requestService: RequestService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.requestService.getRequest(route.params.requestID)
    .pipe(
      catchError(error => {
        console.log(error);
        this.router.navigate(['request-list']);
        return of(null);
      })
    );
  }

}
