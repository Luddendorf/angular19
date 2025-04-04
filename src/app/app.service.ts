import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, concatMap, map, Observable, take } from 'rxjs';
import { User } from './intefaces/user';
import { environment } from './environment/environment';
import { Album } from './intefaces/album';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  users: User[] = [];

  constructor(private http: HttpClient) { }

  getUsers$(): Observable<User[]> {
    const userUrl = `${environment.baseUrl}/users`;
    return this.http.get<User[]>(userUrl, { withCredentials: true });
  }

  getAlbums$(): Observable<Album[]> {
    const albumUrl = `${environment.baseUrl}/albums`;
    return this.http.get<Album[]>(albumUrl, { withCredentials: true });
  }

  getUsersWithAlbum$(): Observable<User[]> {
    return this.getUsers$().pipe(
      take(1),
      concatMap(users => {
        this.users = users;
        return this.getAlbums$()
      }), take(1), map(albums => {
        const usersWithAlbums = albums.map(album => {
          const userOfAlbum = this.users.find(u => u.id == album.userId);
          if (userOfAlbum) {
            return {...userOfAlbum, album: album};
          }
          return null;
        });
        let uniqueIds = [];
        let unique = [];
        usersWithAlbums.forEach(u => {
          if (!uniqueIds.includes(u.album.id)) {
            unique.push(u);
            uniqueIds.push(u.album.id);
          }
        });
        return unique;
      }));
  }
}