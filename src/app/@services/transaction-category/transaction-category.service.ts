import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from 'src/app/@models/api-reponse.model';
import { TransactionCategoryModel } from 'src/app/@models/transaction-category.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TransactionCategoryService {
  private baseUrl = `${environment.baseApi}/transaction-category`;

  constructor(private readonly http: HttpClient) {}

  findTransactionCategories(): Observable<TransactionCategoryModel> {
    return this.http
      .get<ApiResponse<TransactionCategoryModel>>(`${this.baseUrl}/categories`)
      .pipe(
        map((res: ApiResponse<TransactionCategoryModel>) => {
          return res.content;
        })
      );
  }
}
