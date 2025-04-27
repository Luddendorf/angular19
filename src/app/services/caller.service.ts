import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, map, Observable, of } from 'rxjs';
import { environment } from '../environment/environment';
import { CommentSimple } from '../intefaces/comment-simple';

@Injectable({
  providedIn: 'root'
})
export class CallerService {
  userIdFromBackend: string;
  userPosts: any[];

  constructor(private http: HttpClient) {}

  getUserComments$(userId: string): Observable<CommentSimple[]> {
    console.log('Got userId ', userId);
    const usersUrl = `${environment.callerUrl}/users`;
    const postsUrl = `${environment.callerUrl}/posts`;
    const commentsUrl = `${environment.callerUrl}/comments`;

    return this.http.get<any>(usersUrl).pipe(
      map(users => {
        return users.find(u => u.id == userId).id;
      }),
      concatMap(userIdFromBackend => {
        this.userIdFromBackend = userIdFromBackend;
        return this.http.get<any>(postsUrl)
      }),
      map(posts => {
        return posts.filter(post => post.userId == this.userIdFromBackend)
      }),
      concatMap(posts => {
        this.userPosts = posts;
        return this.http.get<any>(commentsUrl)
      }),
      map(comments => {
        const postIds = this.userPosts.map(p => p.id);
        return comments.filter(comment => postIds.includes(comment.postId))
          .map(comment => {
            return {email: comment.email, body: comment.body};
          });
      })
    )
  }
}
