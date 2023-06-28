import { TransactionCategoryModel } from './transaction-category.model';

export class TransactionModel {
  id: number;
  description: string;
  value: number;
  transactionDate: Date;
  transactionCategory: TransactionCategoryModel;
  installment: number;
  isFixed: boolean;
  totalInstallments: number;
}

export type Transactions = Array<TransactionModel>;
