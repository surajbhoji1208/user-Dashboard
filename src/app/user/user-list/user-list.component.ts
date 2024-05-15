import { Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserServiceService } from '../user-service.service';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { LoaderService } from '../../loader/loader.service';
import { LoaderComponent } from '../../loader/loader.component';
import {MatButtonModule} from '@angular/material/button';

export interface UserData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}



@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatPaginatorModule,LoaderComponent,MatButtonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'email', 'first_name', 'last_name', 'avatar', 'actions'];
  dataSource = new MatTableDataSource<UserData>();

  totalItems: number = 0;
  pageSize: number = 5; // Default page size
  pageIndex: number = 0; // Default page index

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;


  constructor(private userService: UserServiceService, private router: Router,private loaderService:LoaderService) {

  }
  ngOnInit(): void {
    this.loaderService.showLoader('grid')
    this.fetchUserData();
  }

  fetchUserData() {
    this.userService.getUsers(this.pageIndex + 1).subscribe(
      (userData: any) => {
        this.dataSource.data = userData.data;
        this.totalItems = userData.total;
        this.loaderService.hideLoader('grid')
      },
      (error) => {
        console.error('Error fetching user data: ', error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  pageChanged(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchUserData();
  }

  viewDetails(userId: number) {
    this.router.navigate(['/users', userId]); // Navigate to user detail page with userId
  }
}
