import { TransactionTypeEnum } from '../@enums/transaction-type.enum';

export class TransactionSummaryModel {
  transactionType: TransactionTypeEnum;
  total: number;
}

export type Summaries = Array<TransactionSummaryModel>;
