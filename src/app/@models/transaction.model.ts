import { TransactionCategoryModel } from './transaction-category.model';
import { TransactionTypeModel } from './transaction-type.model';

export class TransactionModel {
  id: number;
  description: string;
  value: number;
  creationDate: Date;
  type: TransactionTypeModel;
  category: TransactionCategoryModel;
  user: number;
}

export type Transactions = Array<TransactionModel>;
