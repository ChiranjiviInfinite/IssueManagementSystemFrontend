import { Component, OnInit, signal } from '@angular/core'; 
import { PostResponse } from '../models/post-response.model';
import { UserPostService } from '../UserPostService/user-post-service';
import { CommonModule } from '@angular/common';
import { Comment } from '../comment/comment';


@Component({
  selector: 'app-user-post',
  imports: [CommonModule, Comment],
  templateUrl: './user-post.html',
  styleUrls: ['./user-post.css'], 
})
export class UserPost implements OnInit {

  
  posts = signal<PostResponse[]>([]);

  
  loading = signal(false);
  error = signal<string | null>(null);

  
  showCommentsMap = signal<{ [postId: number]: boolean }>({});

  constructor(private postsService: UserPostService) { }

  ngOnInit(): void {
    this.fetchMyPosts();
  }

  fetchMyPosts(): void {
    this.loading.set(true); 
    this.error.set(null);   
    this.postsService.getUserPosts().subscribe({
      next: data => {
        
        this.posts.set(data.sort((a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ));
        this.loading.set(false); 
      },
      error: (err) => {
        this.error.set(err.message || 'Failed to load your posts');
        this.loading.set(false); 
      }
    });
  }

  toggleComments(postId: number) {
    const currentMap = this.showCommentsMap();
  this.showCommentsMap.set({
    ...currentMap,
    [postId]: !currentMap[postId] 
  });
  }
  
  isCommentsVisible(postId: number) {
    return this.showCommentsMap()[postId];
  }
}
