import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.css']
})
export class CommentCreateComponent implements OnInit {
  createCommentForm: FormGroup;
  requestID: string;
  username: string;
  @Output() commentSubmitted = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
              private commentService: CommentService,
              private route: ActivatedRoute, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.requestID = data.data.requestID;
      console.log(this.requestID);
    }, error => {
      console.log('comment-create', error);
    });

    this.userService.getUserInfo().subscribe(response => {
      this.username = response;
    }, error => {
      console.log('comment-create, username', error);
    });

    this.initializeCommentForm();
  }

  initializeCommentForm() {
    this.createCommentForm = this.formBuilder.group({
      requestID: [this.requestID, Validators.required],
      // author: [this.username, Validators.required],
      content: ['', Validators.required]
    });
  }

  createComment() {
    console.log('create comment');
    this.createCommentForm.value.author = this.username;
    this.commentService.postComment(this.createCommentForm.value).subscribe(response => {
      console.log('create-comment, post', response);
      this.createCommentForm.reset();
      this.commentSubmitted.emit(true);
      // this.router.navigate(['request-detail/' + this.requestID]);
    }, error => {
      console.log('create-comment, post', error);
    });
  }

}
