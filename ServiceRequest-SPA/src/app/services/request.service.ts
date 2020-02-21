import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Request } from '../models/request';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  baseUrl = environment.baseUrl;

constructor(private http: HttpClient) { }

  getRequests(requestParams?: any): Observable<Request[]> {
    let requestResult = null;

    let params = new HttpParams();

    if (requestParams != null) {
      console.log(requestParams);
      params = params.append('owner', requestParams.owner);
    }

    return this.http.get(this.baseUrl + 'Requests', { observe: 'response', params })
      .pipe(
        map(response => {
          requestResult = response.body;
          return requestResult;
        })
      );
  }

  getRequest(id: string): Observable<any> {
    return this.http.get(this.baseUrl + 'Requests/' + id);
  }

  getLocations(): Observable<any> {
    return this.http.get(this.baseUrl + 'Requests/locations');
  }

  postRequest(request: any): Observable<any> {
    return this.http.post(this.baseUrl + 'Requests', request);
  }

  postAttachment(attachment: any, id: string): Observable<any> {

    const formData = new FormData();
    formData.append('uploadFile', attachment);

    return this.http.post(this.baseUrl + 'Attachments/' + id, formData);
  }

  getPropertyCodes(): Observable<any> {
    return this.http.get(this.baseUrl + 'Requests/propcodes');
  }

  submitReviewedRequest(id: string, request: Request): Observable<any> {
    return this.http.put(this.baseUrl + 'Requests/reviewed/' + id, request);
  }

  updateRequest(id: string, request: Request): Observable<any> {
    return this.http.put(this.baseUrl + 'Requests/' + id, request);
  }
}
