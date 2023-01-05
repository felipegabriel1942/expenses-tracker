import { Component, Input, OnInit } from '@angular/core';
import { TransactionTypeEnum } from 'src/app/@enums/transaction-type.enum';
import { Summaries } from 'src/app/@models/transaction-summary.model';
import { IC_EXPENSE, IC_PROFITS, IC_SALARY } from 'src/app/consts';

@Component({
  selector: 'app-transaction-summary',
  templateUrl: './transaction-summary.component.html',
  styleUrls: ['./transaction-summary.component.scss'],
})
export class TransactionSummaryComponent implements OnInit {
  @Input() summaries: Summaries;

  public IC_EXPENSE = IC_EXPENSE;
  public IC_PROFITS = IC_PROFITS;
  public IC_SALARY = IC_SALARY;

  constructor() {}

  ngOnInit(): void {}

  get revenue(): number {
    return this.getSummaryByTypeId(TransactionTypeEnum.REVENUE);
  }

  get expense(): number {
    return this.getSummaryByTypeId(TransactionTypeEnum.EXPENSE);
  }

  private getSummaryByTypeId(transactionType: TransactionTypeEnum): number {
    if (this.summaries == null) {
      return 0;
    }

    const summaries = this.summaries.filter(
      (s) => s.transactionType === transactionType
    );

    return summaries.length === 0 ? 0 : summaries[0].total;
  }
}
