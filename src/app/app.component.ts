import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from './intefaces/user';
import { Album } from './intefaces/album';
import { Subscription } from 'rxjs';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'april';
  users: User[] = [];
  albums: Album[] = [];
  userSub: Subscription;
  albumSub: Subscription;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.userSub = this.appService.getUsersWithAlbum$().subscribe(usersWithAlbums => {
      this.users = usersWithAlbums;
    });
  }
  
  ngOnDestroy(): void {
      this.userSub.unsubscribe();
  }
}
