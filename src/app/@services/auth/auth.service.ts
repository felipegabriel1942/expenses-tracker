import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from 'src/app/@models/api-reponse.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  authenticateUser(user: any): Observable<string> {
    return this.http
      .post<ApiResponse<string>>(`http://localhost:8081/api/v1/auth/authenticate`, user)
      .pipe(
        map(res => {
          return res.content;
        })
      );
  }
}
