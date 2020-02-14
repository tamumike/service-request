import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
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

  getLocations(): Observable<any> {
    return this.http.get(this.baseUrl + 'Requests/locations');
  }
}
