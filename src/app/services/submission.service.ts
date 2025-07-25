import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {
  constructor(private http: HttpClient) {}

  submitHomework(assignmentId: number, file: File): Observable<any> {
    const token = localStorage.getItem('auth_token') || ''; // ✅ Consistent key



    if (!token) {
      console.error('❌ Token not found in localStorage.');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('assignmentId', assignmentId.toString());

    console.log('Submitting with:', { 
  token: !!token, 
  file: file.name, 
  assignmentId 
});

    return this.http.post(`${environment.apiUrl}/student/submit`, formData, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      }),
      withCredentials: true,  // 👈 THIS IS WHAT WAS MISSING
      responseType: 'text' as 'json' // ✅ Important fix
    });
  }
}
