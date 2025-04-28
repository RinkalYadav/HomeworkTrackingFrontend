import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';  
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  fname: string = '';
  lname: string = '';
  email: string = '';
  password: string = '';
  mobile: string = '';
  isSubmitted: boolean = false;

  
  constructor(private router: Router) {}

  onSubmit() {
    this.isSubmitted = true;
    if (this.fname && this.lname && this.email && this.password && this.mobile) {
      console.log('Form Submitted Successfully');
      this.router.navigate(['/login']); 
    } else {
      console.error('Please fill all the required fields');
    }
  }
}
