import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  baseUrl = environment.baseUrl;

constructor(private http: HttpClient) { }

  getRequests(): Observable<any> {
    return this.http.get(this.baseUrl + 'Requests');
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
}
