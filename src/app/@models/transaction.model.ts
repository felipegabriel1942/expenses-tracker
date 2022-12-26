import { TransactionTypeEnum } from '../@enums/transaction-type.enum';
import { TransactionCategoryModel } from './transaction-category.model';

export class TransactionModel {
  id: number;
  description: string;
  value: number;
  creationDate: Date;
  transactionType: TransactionTypeEnum;
  transactionCategory: TransactionCategoryModel;
  user: number;
}

export type Transactions = Array<TransactionModel>;
