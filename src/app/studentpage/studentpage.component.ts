import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AssignmentService } from '../services/assignment.service';
import { SubmissionService } from '../services/submission.service';
import { Assignment } from '../models/assignment.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-studentpage',
  standalone: true,
  templateUrl: './studentpage.component.html',
  styleUrls: ['./studentpage.component.css'],
  imports: [CommonModule],
})
export class StudentComponent implements OnInit {
  assignments: Assignment[] = [];
  studentName: string = '';
  studentClass: string = '';
  selectedFiles: { [assignmentId: number]: File } = {};
  submittedAssignments: number[] = [];
  loading: { [assignmentId: number]: boolean } = {};

  constructor(
    private assignmentService: AssignmentService,
    private submissionService: SubmissionService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
     this.studentName = localStorage.getItem('username') || 'Student';
  this.studentClass = localStorage.getItem('studentClass') || '';
    this.fetchStudentProfile();

    this.assignmentService.getAllTeacherAssignments().subscribe({
      next: (data: Assignment[]) => {
        this.assignments = data;
      },
      error: () => {
        alert('❌ Failed to fetch assignments from teacher.');
      }
    });
  }

  // ✅ Get student name and class from localStorage
  fetchStudentProfile() {
    const name = localStorage.getItem('username');
    const className = localStorage.getItem('studentClass');

    console.log('👤 Loaded from localStorage:', name, className); // Debug only

    this.studentName = name ?? 'Student';
    this.studentClass = className ?? '';
  }

  onFileSelected(event: any, assignmentId: number) {
    const file: File = event.target.files[0];
    if (file) {
      const maxSizeMB = 10;
      if (file.size > maxSizeMB * 1024 * 1024) {
        alert(`File must be smaller than ${maxSizeMB}MB.`);
        return;
      }
      this.selectedFiles[assignmentId] = file;
    }
  }

  submitHomework(assignmentId: number) {
    const file = this.selectedFiles[assignmentId];
    if (!file) {
      alert('⚠️ Please select a file before submitting.');
      return;
    }

    this.loading[assignmentId] = true;

    this.submissionService.submitHomework(assignmentId, file).subscribe({
      next: () => {
        alert('✅ Homework submitted successfully!');
        delete this.selectedFiles[assignmentId];
        this.submittedAssignments.push(assignmentId);
        this.loading[assignmentId] = false;
      },
      error: () => {
        alert('❌ Failed to submit homework.');
        this.loading[assignmentId] = false;
      }
    });
  }
}
