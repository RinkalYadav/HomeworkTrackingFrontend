import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://homeworktrackingbackend.onrender.com/api/auth'; // ✅ base URL for both login and register

  constructor(private http: HttpClient) {}

  // 🔐 Login API
  login(user: User): Observable<{ token: string; role: string; username: string }> {
    return this.http.post<{ token: string; role: string; username: string; classes: string}>(
      `${this.apiUrl}/login`,
      user
       ).pipe(
    tap((response) => {
      this.setToken(response.token);
      // ✅ Store username (EXACTLY like teacher)
      localStorage.setItem('username', response.username); 
      // ✅ Store class (student-specific)
      localStorage.setItem('studentClass', response.classes); 
    })
    );
  }

  // 📝 Register API
  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  // Token management
  setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  logout(): void {
    localStorage.removeItem('auth_token');
  }
}
