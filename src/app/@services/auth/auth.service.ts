import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from 'src/app/@models/api-reponse.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLogged = new BehaviorSubject<boolean>(false);

  private baseApi = environment.baseApi;

  constructor(private readonly http: HttpClient) {}

  authenticateUser(user: any): Observable<string> {
    return this.http
      .post<ApiResponse<string>>(
        `${this.baseApi}/api/v1/auth/authenticate`,
        user
      )
      .pipe(
        map((res) => {
          return res.content;
        })
      );
  }
}
