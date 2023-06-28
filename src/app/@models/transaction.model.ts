import { TransactionCategoryModel } from './transaction-category.model';
import { PeriodEnum } from '../@enums/period.enum';
import { Audit } from './audit.model';

export class TransactionModel {
  id: number;
  description: string;
  value: number;
  transactionDate: Date;
  transactionCategory: TransactionCategoryModel;
  installment: number;
  isFixed: boolean;
  totalInstallments: number;
  period: PeriodEnum;
  audit: Audit;
}

export type Transactions = Array<TransactionModel>;
