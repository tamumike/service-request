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
  private sessionID: string;

constructor(private http: HttpClient, private cookieService: CookieService) { }

getUserInfo(sessionID: any): Observable<any> {
  return this.http.get(this.baseUrl + 'User', sessionID);
}

getGroupMembers(): Observable<any> {
  return this.http.get(this.baseUrl + 'User/group');
}

isAdministrator(user: User): boolean {
  return user.role === 3;
}

getUserIdentifier(): any {
  return this.cookieService.get('esr-session');
}

login(): Observable<any> {
  this.sessionID = this.cookieService.get('esr-session');
  // console.log(this.sessionID);
  return this.http.post(this.baseUrl + 'User/login', null, { withCredentials: true });
}

}
