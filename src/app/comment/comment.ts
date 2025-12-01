import { Component, Input, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommentService } from '../CommentService/comment-service';
import { CommentResponse } from '../models/comment/comment-response.model';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './comment.html',
  styleUrls: ['./comment.css']
})
export class Comment implements OnInit {
  @Input() postId!: number;
  @Input() isAdminView: boolean = false;

  comments = signal<CommentResponse[]>([]);
  loading = signal(false);
  error = signal('');
  success = signal('');

  commentForm: FormGroup;

  constructor(private commentService: CommentService, private fb: FormBuilder) {
    this.commentForm = this.fb.group({ text: [''] });
  }

  ngOnInit() {
    this.loadComments();
  }

  loadComments() {
    this.loading.set(true);
    this.commentService.getCommentsByPostId(this.postId).subscribe({
      next: res => {
        this.loading.set(false);
        this.comments.set(res.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      },
      error: err => {
        this.loading.set(false);
        this.error.set('Failed to load comments.');
      }
    });
  }

  addComment() {
    const text = this.commentForm.value.text?.trim();
    if (!text) return;

    this.loading.set(true);
    this.commentService.addComment(this.postId, { text }).subscribe({
      next: res => {
        this.loading.set(false);
        this.success.set('Comment added!');
        this.commentForm.reset();
        this.comments.set([res, ...this.comments()]);
      },
      error: err => {
        this.loading.set(false);
        this.error.set('Failed to add comment.');
      }
    });
  }
}
