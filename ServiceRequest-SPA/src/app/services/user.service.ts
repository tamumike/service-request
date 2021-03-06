import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.baseUrl;
  sessionID: any;
  user: User;
  groupMembers: any;
  isAdmin = false;

constructor(private http: HttpClient, private cookieService: CookieService) { }

getUserInfo(sessionID: any): Observable<any> {
  return this.http.get(this.baseUrl + 'User', this.sessionID);
}

getGroupMembers(): Observable<any> {
  return this.http.get(this.baseUrl + 'User/group');
}

isAdministrator(): boolean {
  return this.user.role === 3;
  // return this.http.get(this.baseUrl + 'User/checkprivs/' + this.cookieService.get('esr-session').toString());
}

isEngineer(): boolean {
  return this.user.role === 2;
}

setSessionID(): void {
  this.sessionID = this.cookieService.get('esr-session').toString();
}

getUserIdentifier(): any {
  return this.cookieService.get('esr-session').toString();
}

login(): Observable<any> {
  return this.http.post(this.baseUrl + 'User/login', null, { withCredentials: true });
}

}
