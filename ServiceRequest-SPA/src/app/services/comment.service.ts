import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  baseUrl = environment.baseUrl;

constructor(private http: HttpClient) { }

postComment(comment: any): Observable<any> {
  return this.http.post(this.baseUrl + 'Comments/' + comment.requestID, comment);
}

getComments(id: string): Observable<any> {
  return this.http.get(this.baseUrl + 'Comments/' + id);
}

}
