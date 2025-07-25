import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {
  constructor(private http: HttpClient) {}

  // Existing homework submission method
  submitHomework(assignmentId: number, file: File): Observable<any> {
    const token = localStorage.getItem('auth_token') || '';
    if (!token) {
      throw new Error('No authentication token found');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('assignmentId', assignmentId.toString());

    return this.http.post(`${environment.apiUrl}/student/submit`, formData, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      }),
      withCredentials: true,
      responseType: 'text' as 'json'
    });
  }

  // ============= NEW METHODS =============

  /**
   * Submit feedback to a submission (for teachers)
   */
  submitFeedback(
    submissionId: number, 
    feedback: string, 
    score?: number
  ): Observable<any> {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    let params = new HttpParams()
      .set('feedback', feedback);

    if (score !== undefined) {
      params = params.set('score', score.toString());
    }

    return this.http.put(
      `${environment.apiUrl}/submission/${submissionId}/comment`,
      null, // No body for PUT with params
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`
        }),
        params
      }
    );
  }

  /**
   * Get all submissions for a student (including feedback)
   */
  getStudentSubmissions(): Observable<any[]> {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    return this.http.get<any[]>(
      `${environment.apiUrl}/student/submissions`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`
        })
      }
    );
  }

  /**
   * Get submissions for a specific assignment (for teachers)
   */
  getSubmissionsForAssignment(assignmentId: number): Observable<any[]> {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    return this.http.get<any[]>(
      `${environment.apiUrl}/teacher/submissions/${assignmentId}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`
        })
      }
    );
  }
}