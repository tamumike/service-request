import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  @Input() CommentsFromRequest: any;
  commentCount = 0;

  constructor() { }

  ngOnInit() {
    this.commentCount = this.CommentsFromRequest.length;
  }

  refreshCount(count: any) {
    this.commentCount = count;
  }

}
