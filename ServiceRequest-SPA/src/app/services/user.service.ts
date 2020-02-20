import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.baseUrl;

constructor(private http: HttpClient) { }

getUserInfo(): Observable<any> {
  return this.http.get(this.baseUrl + 'User');
}

getGroupMembers(): Observable<any> {
  return this.http.get(this.baseUrl + 'User/group');
}

}
