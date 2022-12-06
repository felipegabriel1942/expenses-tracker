import { ExpenseSummaries } from './../../@models/expense-summary.model';
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
import { TransactionCategoryModel } from 'src/app/@models/transaction-category.model';
import { TransactionTypeModel } from 'src/app/@models/transaction-type.model';
import { MessageService } from 'primeng/api';
import { Summaries } from 'src/app/@models/transaction-summary.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private baseApi = 'http://localhost:8081/transaction';

  constructor(
    private readonly http: HttpClient,
    private readonly messageService: MessageService
  ) {}

  findTransactions(
    params: TransactionParamsModel
  ): Observable<PageModel<Transactions>> {
    return this.http
      .get<ApiResponse<PageModel<Transactions>>>(
        `${this.baseApi}/find?page=${params.page}&elements-per-page=${
          params.elementsPerPage
        }&expense=${params.expense}&revenue=${
          params.revenue
        }&user-id=1&period=${`${params.period.getFullYear()}-${
          params.period.getMonth() + 1
        }`}`
      )
      .pipe(
        map((res: ApiResponse<PageModel<Transactions>>) => {
          return res.content;
        })
      );
  }

  findTransactionCategories(
    transactionTypeId: number
  ): Observable<TransactionCategoryModel> {
    return this.http
      .get<ApiResponse<TransactionCategoryModel>>(
        `${this.baseApi}/categories?transactionTypeId=${transactionTypeId}`
      )
      .pipe(
        map((res: ApiResponse<TransactionCategoryModel>) => {
          return res.content;
        })
      );
  }

  findTransactionTypes(): Observable<TransactionTypeModel> {
    return this.http
      .get<ApiResponse<TransactionTypeModel>>(`${this.baseApi}/types`)
      .pipe(
        map((res: ApiResponse<TransactionTypeModel>) => {
          return res.content;
        })
      );
  }

  saveTransaction(transaction: TransactionModel): Observable<void> {
    // TODO: ARRUMAR OUTRA FORMA PARA SETAR O USUARIO
    transaction.user = 1;

    return this.http
      .post<ApiResponse<void>>(`${this.baseApi}/create`, transaction)
      .pipe(
        map((res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: res.message,
          });
        })
      );
  }

  updateTransaction(transaction: TransactionModel): Observable<void> {
    // TODO: ARRUMAR OUTRA FORMA PARA SETAR O USUARIO
    transaction.user = 1;

    return this.http
      .put<ApiResponse<void>>(`${this.baseApi}/update`, transaction)
      .pipe(
        map((res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: res.message,
          });
        })
      );
  }

  deleteTransaction(transaction: TransactionModel): Observable<void> {
    return this.http
      .delete<ApiResponse<void>>(`${this.baseApi}/delete?id=${transaction.id}`)
      .pipe(
        map((res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: res.message,
          });
        })
      );
  }

  getSummary(params: TransactionParamsModel): Observable<Summaries> {
    return this.http
      .get<ApiResponse<Summaries>>(
        `${
          this.baseApi
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

  getExpenseSummary(
    params: TransactionParamsModel
  ): Observable<ExpenseSummaries> {
    return this.http
      .get<ApiResponse<ExpenseSummaries>>(
        `${
          this.baseApi
        }/summary/expenses?user-id=1&period=${`${params.period.getFullYear()}-${
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
