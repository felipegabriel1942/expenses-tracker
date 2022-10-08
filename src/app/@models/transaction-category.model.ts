import { TransactionTypeModel } from './transaction-type.model';

export class TransactionCategoryModel {
  id: number;
  description: string;
}

export type TransactionCategories = Array<TransactionTypeModel>;
