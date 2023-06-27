import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from 'src/app/@models/api-reponse.model';
import { TransactionCategoryModel } from 'src/app/@models/transaction-category.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionCategoryService {
  private baseApi = 'http://localhost:8081/transaction-category';

  constructor(private readonly http: HttpClient) {}

  findTransactionCategories(): Observable<TransactionCategoryModel> {
    return this.http
      .get<ApiResponse<TransactionCategoryModel>>(`${this.baseApi}/categories`)
      .pipe(
        map((res: ApiResponse<TransactionCategoryModel>) => {
          return res.content;
        })
      );
  }
}
