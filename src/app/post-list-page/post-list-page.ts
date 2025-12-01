import { Component, OnInit, signal } from '@angular/core';
import { Post } from '../post/post';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Comment } from '../comment/comment';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, FormsModule, Comment],
  templateUrl: './post-list-page.html',
  styleUrl: './post-list-page.css',
})
export class PostList implements OnInit {

  /**  Signals */
  posts = signal<any[]>([]);
  loading = signal(false);
  error = signal('');
  selectedPost = signal<any | null>(null);
  updateText = signal('');

  /**  Stores visibility of comments per post */
  showCommentsMap = signal<{ [postId: number]: boolean }>({});

  constructor(private post: Post) {}

  ngOnInit() {
    this.loadPosts();
  }

  /**  Load all posts */
  loadPosts() {
    this.loading.set(true);

    this.post.getAll().subscribe({
      next: data => {
        const sorted = data.sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        this.posts.set(sorted);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.error.set("Failed to load posts");
      }
    });
  }

  /**  Admin actions */
  approve(id: number) {
    this.post.approve(id).subscribe(() => this.loadPosts());
  }

  reject(id: number) {
    this.post.reject(id).subscribe(() => this.loadPosts());
  }

  close(id: number) {
    this.post.close(id).subscribe(() => this.loadPosts());
  }

  /**  Update Box */
  openUpdateBox(post: any) {
    this.selectedPost.set(post);
    this.updateText.set(post.assignedUpdate || "");
  }

  cancelUpdate() {
    this.selectedPost.set(null);
    this.updateText.set('');
  }

  saveUpdate() {

    const post = this.selectedPost();
    if (!post){
      return;
    }
    const body = { assignedUpdate: this.updateText() };

    this.post.assignUpdate(post.id, body).subscribe({
      next: () => {
        this.updateText.set('');
        this.loadPosts();

        setTimeout(() => {
        this.selectedPost.set(null);
      });
      },
      error: err => {
    }
    });
  }

  
  toggleComments(postId: number) {
    const current = this.showCommentsMap();

    this.showCommentsMap.set({
      ...current,
      [postId]: !current[postId]
    });
  }

  isCommentsVisible(postId: number) {
    return this.showCommentsMap()[postId];
  }
}
