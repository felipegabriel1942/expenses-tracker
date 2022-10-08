import { Component, Input, OnInit } from '@angular/core';
import { Summaries } from 'src/app/@models/transaction-summary.model';

@Component({
  selector: 'app-transaction-summary',
  templateUrl: './transaction-summary.component.html',
  styleUrls: ['./transaction-summary.component.scss'],
})
export class TransactionSummaryComponent implements OnInit {
  @Input() summaries: Summaries;

  constructor() {}

  ngOnInit(): void {}

  get revenue(): number {
    return this.getSummaryByTypeId(1);
  }

  get expense(): number {
    return this.getSummaryByTypeId(2);
  }

  private getSummaryByTypeId(typeId: number): number {
    if (this.summaries == null) {
      return 0;
    }

    const summaries = this.summaries.filter((s) => s.typeId === typeId);

    return summaries.length === 0 ? 0 : summaries[0].total;
  }
}
