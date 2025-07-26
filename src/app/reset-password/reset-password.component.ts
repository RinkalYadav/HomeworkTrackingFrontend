import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  token: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  isSubmitted: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.token = localStorage.getItem('reset_token') || '';
    console.log('Loaded token from localStorage:', this.token);
  }

  onReset() {
    this.isSubmitted = true;

    if (!this.newPassword || !this.confirmPassword) {
      alert('Please fill in all fields');
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const payload = {
      token: this.token,
      newPassword: this.newPassword
    };

    this.http.post('https://homeworktrackingbackend.onrender.com/api/auth/reset-password', payload).subscribe({
      next: () => {
        alert('Password reset successfully!');
        localStorage.removeItem('reset_token');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Reset error:', err);
        alert('Invalid or expired token');
      }
    });
  }
}
