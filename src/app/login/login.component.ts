import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
})
export class LoginComponent {
  user: User = { username: '', password: '', email: '' };
  isSubmitted: boolean = false;

  constructor(private authService: AuthService, public router: Router) {}

  onSubmit() {
    this.isSubmitted = true;

    if (!this.user.username || !this.user.password) {
      alert('Username and Password are required');
      return;
    }

    this.authService.login(this.user).subscribe({
      next: (response: { token: string; role: string; username: string }) => {
        // ✅ Save token in localStorage
        localStorage.setItem('token', response.token);
        console.log("🔐 Token saved to localStorage:", response.token);

        // Optional: also set in authService if needed
        this.authService.setToken(response.token);

        const role = response.role?.toUpperCase();
        const username = response.username;

        switch (role) {
          case 'STUDENT':
            this.router.navigate(['/student'], { queryParams: { username } });
            break;
          case 'TEACHER':
            this.router.navigate(['/teacherpage'], { queryParams: { username } });
            break;
          case 'PARENT':
            this.router.navigate(['/parent'], { queryParams: { username } });
            break;
          default:
            alert('Unknown role');
        }
      },
      error: () => alert('Invalid credentials')
    });
  }

  onForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
}
