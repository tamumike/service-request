import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserInfoResolverService implements Resolve<any> {

constructor(private userService: UserService) { }

resolve(route: ActivatedRouteSnapshot) {
  return this.userService.getUserInfo()
  .pipe(
    catchError(error => {
      console.log('user-info-resolver', error);
      return of(null);
    })
  );
}

}
