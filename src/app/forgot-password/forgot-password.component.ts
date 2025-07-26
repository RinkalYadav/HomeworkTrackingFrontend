import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  username: string = '';
  isSubmitted: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.isSubmitted = true;

    if (!this.username) {
      alert('Username is required');
      return;
    }

    this.http
      .post<{ message: string; token: string }>(
        'https://homeworktrackingbackend.onrender.com/api/auth/forgot-password',
        { username: this.username }
      )
      .subscribe({
        next: (res) => {
          console.log('Token received:', res.token);
          localStorage.setItem('reset_token', res.token);
          alert('Reset token has been sent. Check your console (for dev only).');
          this.router.navigate(['/reset-password']);
        },
        error: (err) => {
          console.error('Forgot Password Error:', err);
          alert('User not found');
        },
      });
  }
}
