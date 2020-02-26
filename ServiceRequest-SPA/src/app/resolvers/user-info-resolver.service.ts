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
  const sessionID = this.userService.getUserIdentifier();
  console.log('user info resolver', sessionID);
  return this.userService.getUserInfo(sessionID)
  .pipe(
    catchError(error => {
      console.log('user-info-resolver', error);
      return of(null);
    })
  );
}

}
