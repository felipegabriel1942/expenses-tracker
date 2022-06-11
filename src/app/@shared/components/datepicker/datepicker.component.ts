import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent implements OnInit {
  public dates: Date[] = [];
  public selectedMonth: number;
  public selectedYear: number;
  public selectedDate: Date;

  constructor() {}

  ngOnInit(): void {
    this.selectedMonth = new Date().getMonth();
    this.selectedYear = new Date().getFullYear();
    this.generateDatepickerDates();
  }

  public nextMonth(): void {
    if (this.selectedMonth + 1 > 11) {
      this.selectedMonth = 0;
      this.selectedYear++;
    } else {
      this.selectedMonth++;
    }

    this.generateDatepickerDates();
  }

  public previousMonth(): void {
    if (this.selectedMonth - 1 < 0) {
      this.selectedMonth = 11;
      this.selectedYear--;
    } else {
      this.selectedMonth--;
    }

    this.generateDatepickerDates();
  }

  private generateDatepickerDates(): void {
    this.dates = this.getActualMonthDates();

    if (!this.firstDayIsSunday(this.dates)) {
      this.dates.unshift(...this.getPreviousMonthDates());
    }

    this.dates.push(...this.getNextMonthDates());
  }

  private firstDayIsSunday(dates: Date[]): boolean {
    return dates[0].getDay() === 0;
  }

  private getPreviousMonthDates(): Date[] {
    const previousMonthDates = this.generatePreviousMonthDates();
    const numberOfdays = this.dates[0].getDay();

    return previousMonthDates.slice(
      previousMonthDates.length - numberOfdays,
      previousMonthDates.length
    );
  }

  private getNextMonthDates(): Date[] {
    const nextMonthDates = this.generateNextMonthDates();
    const numberOfDays = 42 - this.dates.length + this.dates[0].getDay();

    return nextMonthDates.slice(0, numberOfDays);
  }

  private getActualMonthDates(): Date[] {
    return this.createDates(this.selectedYear, this.selectedMonth);
  }

  private generatePreviousMonthDates(): Date[] {
    const year =
      this.selectedMonth - 1 < 0 ? this.selectedYear - 1 : this.selectedYear;

    const month = this.selectedMonth - 1 < 0 ? 11 : this.selectedMonth - 1;

    return this.createDates(year, month);
  }

  private generateNextMonthDates(): Date[] {
    const year =
      this.selectedMonth + 1 > 11 ? this.selectedYear + 1 : this.selectedYear;

    const month = this.selectedMonth + 1 > 11 ? 0 : this.selectedMonth + 1;

    return this.createDates(year, month);
  }

  private createDates(year: number, month: number): Date[] {
    const date = new Date(year, month, 1);
    const dates = [];

    while (date.getMonth() === month) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    return dates;
  }

  public onSelectDate(date: Date): void {
    if (!this.isFromSelectedMonth(date)) {
      return;
    }

    this.selectedDate = date;
    console.log(this.selectedDate);
  }

  public isFromSelectedMonth(date: Date): boolean {
    return (
      date.getMonth() === this.selectedMonth &&
      date.getFullYear() === this.selectedYear
    );
  }

  public isSelectedDate(date: Date): boolean {
    return date === this.selectedDate;
  }
}
