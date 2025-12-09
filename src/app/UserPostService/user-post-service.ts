import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PostRequest } from '../models/post-request.model';
import { PostResponse } from '../models/post-response.model';
@Injectable({
  providedIn: 'root',
})
export class UserPostService {
  
  // Base path for backend endpoints
  private readonly baseUrl = '/api/posts';

  constructor(private http: HttpClient) {}

  
  createPost(body: PostRequest): Observable<PostResponse> {
    return this.http.post<PostResponse>(this.baseUrl, body)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Get all approved posts
   * GET /api/posts/approved
   */
  getApprovedPosts(): Observable<PostResponse[]> {
    return this.http.get<PostResponse[]>(`${this.baseUrl}/approved`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Get posts for the currently authenticated user
   * GET /api/posts/user/posts
   */
  getUserPosts(): Observable<PostResponse[]> {
    return this.http.get<PostResponse[]>(`${this.baseUrl}/user/posts`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Common error handler
   */
  private handleError(error: HttpErrorResponse) {
    // Customize error message for UI
    let message = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side / network error
      message = `Network error: ${error.error.message}`;
    } else {
      // Backend returned status code
      if (error.error && error.error.message) {
        // If backend sends structured error { message: '...' }
        message = error.error.message;
      } else {
        message = `Server returned code ${error.status}: ${error.statusText || ''}`;
      }
    }
    // Optionally log to remote logging infra here
    return throwError(() => new Error(message));
  }
}
