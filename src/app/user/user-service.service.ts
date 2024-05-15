import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {


  private cachedUsers: { [key: number]: any } = {};

  constructor(private http: HttpClient) { }

  getUsers(page: number): Observable<any> {
    // Check if users for the requested page are already cached
    if (this.cachedUsers[page]) {
      return of(this.cachedUsers[page]); // Return cached data as Observable
    } else {
      // Fetch data from the API and cache it
      return this.http.get<any>(`https://reqres.in/api/users?page=${page}`).pipe(
        map(response => {
          this.cachedUsers[page] = response; // Cache the response
          return response;
        }),
        catchError(error => {
          console.error('Error fetching users:', error);
          return of(null); 
        })
      );
    }
  }

  getUser(id: number): Observable<any> {
    return this.http.get<any>(`https://reqres.in/api/users/${id}`)
  }

 
}
