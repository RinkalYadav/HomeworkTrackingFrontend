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
  user: User = { username: '', password: '', email: '', role: '', classes: '' };
  isSubmitted: boolean = false;
  selectedClass: string = '';
  classes: string[] = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'];

  constructor(private authService: AuthService, public router: Router) {}

  onSubmit() {
    this.isSubmitted = true;

    if (!this.user.username || !this.user.password || !this.user.role) {
      alert('Username, Password, and Role are required');
      return;
    }

    if ((this.user.role === 'STUDENT' || this.user.role === 'TEACHER') && !this.selectedClass) {
      alert('Class selection is required for ' + this.user.role.toLowerCase());
      return;
    }

    // Attach class to user if student
    if (this.user.role === 'STUDENT') {
      this.user.classes = this.selectedClass;
    }
    else if (this.user.role === 'TEACHER') {
    this.user.classes = this.selectedClass; // send selected class to validate
  }

    this.authService.login(this.user).subscribe({
      next: (response: { token: string; role: string; username: string; classes?: string }) => {
        localStorage.setItem('auth_token', response.token);
        this.authService.setToken(response.token);

        const role = response.role?.toUpperCase();
        const username = response.username;
        const classes = response.classes;

        switch (role) {
          case 'STUDENT':
            this.router.navigate(['/student'], { queryParams: { username, classes } });
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
