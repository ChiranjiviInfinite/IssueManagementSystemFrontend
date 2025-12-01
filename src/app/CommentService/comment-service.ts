import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommentResponse } from '../models/comment/comment-response.model';
import { CommentRequest } from '../models/comment/comment-request.model';
@Injectable({
  providedIn: 'root',
})
export class CommentService {
  
  private baseUrl = '/api/posts';

  constructor(private http: HttpClient) {}

  getCommentsByPostId(postId: number): Observable<CommentResponse[]> {
    return this.http.get<CommentResponse[]>(`${this.baseUrl}/${postId}/comments`);
  }

  addComment(postId: number, comment: CommentRequest): Observable<CommentResponse> {
    return this.http.post<CommentResponse>(`${this.baseUrl}/${postId}/comments`, comment);
  }
}
