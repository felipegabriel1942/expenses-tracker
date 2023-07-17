import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  TransactionModel,
  Transactions,
} from 'src/app/@models/transaction.model';
import { ApiResponse } from 'src/app/@models/api-reponse.model';
import { PageModel } from 'src/app/@models/page.model';
import { TransactionParamsModel } from 'src/app/@models/transaction-params.mode';
import { Summaries } from 'src/app/@models/transaction-summary.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private baseUrl = `${environment.baseApi}/transaction`;

  constructor(private readonly http: HttpClient) {}

  findTransactions(
    params: TransactionParamsModel
  ): Observable<PageModel<Transactions>> {
    return this.http
      .get<ApiResponse<PageModel<Transactions>>>(
        `${this.baseUrl}/find?page=${params.page}&elements-per-page=${
          params.elementsPerPage
        }&expense=${params.expense}&revenue=${
          params.revenue
        }&period=${`${params.period.getFullYear()}-${
          params.period.getMonth() + 1
        }`}`
      )
      .pipe(
        map((res: ApiResponse<PageModel<Transactions>>) => {
          return res.content;
        })
      );
  }

  saveTransaction(
    transaction: TransactionModel
  ): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(
      `${this.baseUrl}/create`,
      transaction
    );
  }

  updateTransaction(
    transaction: TransactionModel
  ): Observable<ApiResponse<void>> {
    return this.http.put<ApiResponse<void>>(
      `${this.baseUrl}/update`,
      transaction
    );
  }

  deleteTransaction(transactionId: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(
      `${this.baseUrl}/delete?id=${transactionId}`
    );
  }

  deleteThisAndFutureTransactions(
    transactionId: number
  ): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(
      `${this.baseUrl}/delete-this-and-future-transactions?id=${transactionId}`
    );
  }

  deleteAllTransactions(
    transactionId: number
  ): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(
      `${this.baseUrl}/delete-all-transactions?id=${transactionId}`
    );
  }

  getSummary(params: TransactionParamsModel): Observable<Summaries> {
    return this.http
      .get<ApiResponse<Summaries>>(
        `${
          this.baseUrl
        }/summary?user-id=1&period=${`${params.period.getFullYear()}-${
          params.period.getMonth() + 1
        }`}`
      )
      .pipe(
        map((res) => {
          return res.content;
        })
      );
  }
}
