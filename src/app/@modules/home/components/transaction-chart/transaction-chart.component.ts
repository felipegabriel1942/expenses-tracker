import { IC_ONLINE_PAYMENT, IC_NO_RESULTS } from './../../../../consts/assets';
import { Component, Input, OnInit } from '@angular/core';

import { ExpenseSummaries } from 'src/app/@models/expense-summary.model';

@Component({
  selector: 'app-transaction-chart',
  templateUrl: './transaction-chart.component.html',
  styleUrls: ['./transaction-chart.component.scss'],
})
export class TransactionChartComponent implements OnInit {
  @Input() set expenseSummaries(summaries: ExpenseSummaries) {
    this.summaries = summaries;

    if (this.summaries) {
      this.data = {
        labels: [...this.summaries.map((e) => e.category)],
        datasets: [
          {
            backgroundColor: [
              '#EC407A',
              '#AB47BC',
              '#42A5F5',
              '#7E57C2',
              '#66BB6A',
              '#FFCA28',
              '#26A69A',
            ],
            data: [...this.summaries.map((e) => e.total)],
          },
        ],
      };
    }
  }

  public data: any;
  public options: any;
  public summaries: ExpenseSummaries;
  public IC_NO_RESULTS = IC_NO_RESULTS;

  constructor() {}

  ngOnInit(): void {
    this.options = {
      plugins: {
        legend: {
          display: true,
          position: 'right',
        },
      },
    };
  }

  get summariesEmpty(): boolean {
    return this.summaries?.length === 0;
  }
}
