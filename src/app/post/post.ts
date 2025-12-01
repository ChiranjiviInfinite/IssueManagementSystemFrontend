import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class Post {
  private base = '/api/posts';

  constructor(private http: HttpClient) {}

  createPost(data: any): Observable<any> {
    return this.http.post(this.base, data);
  }

  submitPost(id: number): Observable<any> {
    return this.http.put(`${this.base}/${id}/submit`, {});
  }

  getAll(): Observable<any> {
    return this.http.get(this.base);
  }

  approve(id: number): Observable<any> {
    return this.http.put(`${this.base}/${id}/approve`, {});
  }

  reject(id: number): Observable<any> {
    return this.http.put(`${this.base}/${id}/reject`, {});
  }

  close(id: number): Observable<any> {
    return this.http.put(`${this.base}/${id}/close`, {});
  }

  assignUpdate(id: number, body: any): Observable<any> {
    return this.http.put(`${this.base}/${id}/assign-update`, body);
  }
}
