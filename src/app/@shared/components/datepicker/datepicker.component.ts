import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent implements OnInit {
  public days: number[] = [];

  constructor() {}

  ngOnInit(): void {
    console.log(this.getDaysInMonth(6, 2022));
  }

  getDaysInMonth(month, year): void {
    const date = new Date(year, month, 1);

    while (date.getMonth() === month) {
      this.days.push(new Date(date).getDate());
      date.setDate(date.getDate() + 1);
    }
  }
}
