import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { CommentService } from '../services/comment.service';
@Injectable({
  providedIn: 'root'
})
export class CreateCommentResolverService implements Resolve<any> {

constructor(private commentService: CommentService, private router: Router) { }

resolve(route: ActivatedRouteSnapshot) {
  return route.params.requestID;
}

}
