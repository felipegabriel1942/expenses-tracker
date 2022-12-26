import { TransactionTypeEnum } from '../@enums/transaction-type.enum';

export class TransactionCategoryModel {
  id: number;
  description: string;
  transactionType: TransactionTypeEnum;
}

export type TransactionCategories = Array<TransactionCategoryModel>;
