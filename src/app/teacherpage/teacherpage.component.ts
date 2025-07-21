import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-teacherpage',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './teacherpage.component.html',
  styleUrls: ['./teacherpage.component.css']
})
export class TeacherpageComponent implements OnInit {
  teacherName: string = 'Teacher';
  title: string = '';
  description: string = '';
  deadline: string = '';
  homeworkList: any[] = [];
  submissions: { [key: number]: any[] } = {};

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.teacherName = params['username'] || 'Teacher';
    });

    this.loadAssignments();
  }

  onSubmitAssignment() {
    if (!this.title || !this.description || !this.deadline) {
      alert('All fields are required.');
      return;
    }

    const assignmentData = {
      title: this.title,
      description: this.description,
      deadline: this.deadline
    };

    const token = localStorage.getItem('auth_token');
    if (!token) {
      alert('Unauthorized. Please login again.');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.post('http://localhost:8080/api/teacher/assignments', assignmentData, { headers })
      .subscribe({
        next: () => {
          alert('✅ Assignment submitted successfully!');
          this.title = '';
          this.description = '';
          this.deadline = '';
          this.loadAssignments();
        },
        error: (err) => {
          console.error('Submit Error:', err);
          alert('❌ Failed to submit assignment. Make sure you are logged in as a teacher.');
        }
      });
  }

  loadAssignments() {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      alert('Unauthorized. Please login again.');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any[]>('http://localhost:8080/api/teacher/assignments', { headers }).subscribe({
      next: (data) => {
        this.homeworkList = data;
      },
      error: (err) => {
        console.error('Load Error:', err);
        alert('❌ Failed to load assignments');
      }
    });
  }

  viewSubmissions(assignmentId: number) {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any[]>(`http://localhost:8080/api/teacher/submissions/${assignmentId}`, { headers })

      .subscribe({
        next: (data) => {
          this.submissions[assignmentId] = data;
        },
        error: () => {
          alert('❌ Failed to load submissions.');
        }
      });
  }

  submitFeedback(submissionId: number, feedback: string, score: number) {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = { feedback, score };

    this.http.put(`http://localhost:8080/api/student/submission/${submissionId}/comment`, null, {
      params,
      headers
    }).subscribe({
      next: () => {
        alert('✅ Feedback submitted.');
      },
      error: () => {
        alert('❌ Failed to submit feedback.');
      }
    });
  }

  // Optional utility for HTML: replace backslashes in file path for URLs
  sanitizeFilePath(filePath: string): string {
    return filePath.replace(/\\/g, '/');
  }
}
