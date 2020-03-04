import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { Request } from '../models/request';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  baseUrl = environment.baseUrl;
  locations: any;
  groupMembers: any;
  newRequestCount = new BehaviorSubject(0);

constructor(private http: HttpClient, private userService: UserService) {
 }

  getRequests(requestParams?: any): Observable<Request[]> {
    let requestResult = null;

    let params = new HttpParams();

    if (requestParams != null) {
      Object.keys(requestParams).forEach(x => {
        params = params.append(x, requestParams[x]);
      });
    }

    return this.http.get(this.baseUrl + 'Requests', { observe: 'response', params })
      .pipe(
        map(response => {
          requestResult = response.body;
          this.newRequestCount.next(this.getNewRequestsCount(requestResult));
          return requestResult;
        })
      );
  }

  getNewRequestsCount(requests: any) {
    let numberOfNewRequests = 0;
    requests.forEach(x => {
      if (!x.acknowledged && this.isRequestOwnedByUser(x)) {
        numberOfNewRequests += 1;
      }
    });

    return numberOfNewRequests;
  }

  getRequest(id: string): Observable<any> {
    return this.http.get(this.baseUrl + 'Requests/' + id);
  }

  getLocations(): Observable<any> {
    return this.http.get(this.baseUrl + 'Requests/locations');
  }

  postRequest(request: Request): Observable<any> {
    return this.http.post(this.baseUrl + 'Requests', request);
  }

  postAttachment(attachment: any, id: string): Observable<any> {

    const formData = new FormData();
    formData.append('uploadFile', attachment);

    return this.http.post(this.baseUrl + 'Attachments/' + id, formData);
  }

  submitReviewedRequest(id: string, request: Request): Observable<any> {
    return this.http.put(this.baseUrl + 'Requests/reviewed/' + id, request);
  }

  submitEngineerReviewedRequest(id: string, request: Request): Observable<any> {
    return this.http.put(this.baseUrl + 'Requests/ereviewed/' + id, request);
  }

  updateRequest(id: string, request: Request): Observable<any> {
    return this.http.put(this.baseUrl + 'Requests/' + id, request);
  }

  isRequestOwnedByUser(request: Request): boolean {
    const user = this.userService.user;
    const isAdmin = this.userService.isAdministrator();
    if ((request.owner === user.username) || (isAdmin && request.owner === 'Admin')) {
      return true;
    }

    return false;
  }
}
