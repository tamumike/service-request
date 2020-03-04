import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.css']
})
export class CommentCreateComponent implements OnInit {
  createCommentForm: FormGroup;
  @Input() requestID: string;
  user: User;
  @Output() commentSubmitted = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
              private commentService: CommentService,
              private route: ActivatedRoute, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.user = this.userService.user;
    this.initializeCommentForm();
  }

  initializeCommentForm() {
    this.createCommentForm = this.formBuilder.group({
      requestID: [this.requestID, Validators.required],
      content: [, Validators.required],
      author: [this.user.displayName]
    });
  }

  createComment() {
    if (this.createCommentForm.value.content !== null) {
      this.commentService.postComment(this.createCommentForm.value).subscribe(response => {
        this.createCommentForm.reset();
        this.commentSubmitted.emit(true);
      }, error => {
        console.log('create-comment, post', error);
      });
    }

  }

}
