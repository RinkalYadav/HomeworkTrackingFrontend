import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-parentpage',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './parentpage.component.html',
  styleUrls: ['./parentpage.component.css'],
  providers: [DatePipe]
})
export class ParentpageComponent implements OnInit {
  parentName: string = 'Parent';
  childAssignments: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.parentName = params['username'] || 'Parent';
    });

    this.fetchAssignments();
  }

  fetchAssignments(): void {
    this.http.get<any[]>('http://localhost:8080/api/teacher/assignments').subscribe({
      next: (data) => this.childAssignments = data,
      error: () => alert('❌ Failed to load assignments'),
    });
  }
}
