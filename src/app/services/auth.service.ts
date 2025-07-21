import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth'; // ✅ base URL for both login and register

  constructor(private http: HttpClient) {}

  // 🔐 Login API
  login(user: User): Observable<{ token: string; role: string; username: string }> {
    return this.http.post<{ token: string; role: string; username: string }>(
      `${this.apiUrl}/login`,
      user
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
