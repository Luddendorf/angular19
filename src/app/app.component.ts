import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { User } from './intefaces/user';
import { Album } from './intefaces/album';
import { Subscription } from 'rxjs';
import { AppService } from './app.service';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CallerComponent } from './components/caller/caller.component';
import { TicketComponent } from './components/ticket/ticket.component';

@Component({
  selector: 'app-root',
  imports: [MatTableModule, MatSortModule, CallerComponent, TicketComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  title = 'april';
  users: User[] = [];
  albums: Album[] = [];
  userSub: Subscription;
  albumSub: Subscription;
  displayedColumns: string[] = ['name', 'username', 'phone', 'companyName', 'albumTitle'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.users);

    this.userSub = this.appService.getUsersWithAlbum$().subscribe(usersWithAlbums => {
      this.users = usersWithAlbums;
      this.dataSource = new MatTableDataSource(this.users);

      // this.dataSource.sort = this.sort;
      // const sortState: Sort = {active: 'name', direction: 'desc'};
      // this.sort.active = sortState.active;
      // this.sort.direction = sortState.direction;
      // this.sort.sortChange.emit(sortState);
    });
  }
  
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
      this.userSub.unsubscribe();
  }
  
  onSort(sort: MatSort) {
    this.users = this.users.sort((a: User, b: User) => {
      const res = this.sortUsers(sort.direction, sort.active, a, b);
      return res;
    });
    this.dataSource = new MatTableDataSource(this.users);
  }

  sortUsers(direction: string, columnName: string, a: User, b: User): number {
    if (direction == 'asc') {
      if (columnName == 'name') {
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
      }
      if (columnName == 'username') {
        return a.username < b.username ? -1 : a.username > b.username ? 1 : 0;
      }
      if (columnName == 'phone') {
        return a.phone < b.phone ? -1 : a.phone > b.phone ? 1 : 0;
      }
      if (columnName == 'companyName') {
        return a.company.name < b.company.name ? -1 : a.company.name > b.company.name ? 1 : 0;
      }
      if (columnName == 'albumTitle') {
        return a.album.title < b.album.title ? -1 : a.album.title > b.album.title ? 1 : 0;
      }
    }
    if (direction == 'desc') {
      if (columnName == 'name') {
        return a.name > b.name ? -1 : a.name < b.name ? 1 : 0;
      }
      if (columnName == 'username') {
        return a.username > b.username ? -1 : a.username < b.username ? 1 : 0;
      }
      if (columnName == 'phone') {
        return a.phone > b.phone ? -1 : a.phone < b.phone ? 1 : 0;
      }
      if (columnName == 'companyName') {
        return a.company.name > b.company.name ? -1 : a.company.name < b.company.name ? 1 : 0;
      }
      if (columnName == 'albumTitle') {
        return a.album.title > b.album.title ? -1 : a.album.title < b.album.title ? 1 : 0;
      }
    }
    return 0;
  }
}
