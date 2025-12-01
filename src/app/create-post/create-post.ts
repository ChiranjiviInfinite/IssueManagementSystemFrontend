import { Component } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from '../post/post';
import { PostType } from '../post/post-type.enum';
import { signal } from '@angular/core';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-post.html',
  styleUrls: ['./create-post.css'],
})
export class CreatePost {
  title: string = '';
  description: string = '';
  type: PostType | null = null;

  postTypes = Object.values(PostType); // ['ISSUE','COMPLAINT','ANNOUNCEMENT','LOST','HELP']

  loading = signal(false);
  error = signal('');
  success = signal('');

  constructor(private postService: Post, private router: Router) {}

  createPost() {
    if (!this.title || !this.type) {
      this.error.set('Title and Post Type are required');
      this.success.set('');
      return;
    }

    this.loading.set(true);
    this.error.set('');
    this.success.set('');

    const postRequest = {
      title: this.title,
      description: this.description,
      type: this.type
    };

    this.postService.createPost(postRequest).subscribe({
      next: (res: any) => {
        this.loading.set(false);
        this.success.set('Post created successfully!');
        this.error.set('');

        // reset form
        this.title = '';
        this.description = '';
        this.type = null;

        // Optionally submit it immediately after creation
        this.postService.submitPost(res.id).subscribe({
          next: () => {
            this.success.set('Post created and submitted successfully!');
            
          },
          error: err => {
            this.error.set('Post created but failed to submit.');
          }
        });
      },
      error: err => {
         this.loading.set(false);
        this.error.set('Failed to create post. Please try again.');
        this.success.set('');
      }
    });
  }
}

