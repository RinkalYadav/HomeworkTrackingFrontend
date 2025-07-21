import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user: User = {
    username: '',
    password: '',
    role: '',
    classes: ''
  };

  availableClasses: string[] = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'];
  selectedTeacherClasses: string[] = [];

  isSubmitted: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.isSubmitted = true;

    if (this.user.username && this.user.password && this.user.role) {
      // Set class values based on role
      if (this.user.role === 'TEACHER') {
        this.user.classes = this.selectedTeacherClasses.join(',');
      }

      this.authService.register(this.user).subscribe({
        next: () => {
          alert('Registration successful!');
          this.resetForm();
          this.router.navigate(['/login']);
        },
        error: (err) => {
          alert('Registration failed. Try again.');
          console.error(err);
        }
      });
    } else {
      alert('Please fill all required fields.');
    }
  }

  // ✅ These help Angular's *ngIf avoid strict comparison errors
  isTeacher(): boolean {
    return this.user.role === 'TEACHER';
  }

  isStudent(): boolean {
    return this.user.role === 'STUDENT';
  }

  // ✅ Optional: reset form after successful registration
  resetForm() {
    this.user = {
      username: '',
      password: '',
      role: '',
      classes: ''
    };
    this.selectedTeacherClasses = [];
    this.isSubmitted = false;
  }
}
