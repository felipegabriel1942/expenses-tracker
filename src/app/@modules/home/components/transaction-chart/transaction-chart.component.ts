import { Component, Input, OnInit } from '@angular/core';

import { ExpenseSummaries } from 'src/app/@models/expense-summary.model';

@Component({
  selector: 'app-transaction-chart',
  templateUrl: './transaction-chart.component.html',
  styleUrls: ['./transaction-chart.component.scss'],
})
export class TransactionChartComponent implements OnInit {
  @Input() set expenseSummaries(summaries: ExpenseSummaries) {
    if (summaries) {
      this.data = {
        labels: [...summaries.map((e) => e.category)],
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
            data: [...summaries.map((e) => e.total)],
          },
        ],
      };
    }
  }

  data: any;
  options: any;

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
}
