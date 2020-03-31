import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-final-comment-create',
  templateUrl: './final-comment-create.component.html',
  styleUrls: ['./final-comment-create.component.css']
})
export class FinalCommentCreateComponent implements OnInit {
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
    console.log('initialized at comment create');
    this.createCommentForm = this.formBuilder.group({
      requestID: [this.requestID, Validators.required],
      content: ['', Validators.required],
      author: [this.user.displayName],
      resolution: [false, Validators.required]
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
