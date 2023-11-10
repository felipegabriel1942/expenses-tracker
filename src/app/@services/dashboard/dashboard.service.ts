import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Dashboard } from './../../@models/dashboard.model';
import { ApiResponse } from './../../@models/api-reponse.model';

import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private baseUrl = `${environment.baseApi}/dashboard`;

  constructor(private readonly http: HttpClient) {}

  getDashboard(period: string): Observable<ApiResponse<Dashboard>> {
    return this.http.get<ApiResponse<Dashboard>>(
      `${this.baseUrl}?period=${period}`
    );
  }
}
