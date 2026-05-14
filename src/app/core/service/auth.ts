import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '@environments/environment'

import {  AuthResponse, AuthUser } from '@modules/auth/models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient)

  private apiUrl = `${environment.apiUrl}/api/token/`;

  public login(username:string, password:string): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(this.apiUrl, {username, password}).pipe(
      tap((response: AuthResponse)=>{
        console.log(response)
        this.setAccessToken(response.access)
        this.setUser(response.user);

      })
    )
  }

  private setAccessToken(token: string): void{
    localStorage.setItem('access_token',token)
  }

  public getAccessToken(): string | null{
    return localStorage.getItem('access_token')
  }

  private setUser(user: AuthUser): void {
    localStorage.setItem('user', JSON.stringify(user) as string);
  }

  public getUser(): AuthUser | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

}
