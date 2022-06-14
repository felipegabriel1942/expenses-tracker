import { AbstractControl, FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { Weekdays } from './enums/weekdays.enum';

import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Months } from './enums/months.enum';
import { DatepickerInterface } from './interfaces/datepicker.interface';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent implements OnInit {
  @Input() public options: DatepickerInterface;

  public dates: Date[] = [];
  public selectedMonth: number;
  public selectedYear: number;
  public selectedDate: Date;
  public weekdays: string[] = [];
  public faAngleLeft = faAngleLeft;
  public faAngleRight = faAngleRight;
  public isFocused = false;
  public datepickerControl: AbstractControl = new FormControl();

  constructor() {}

  ngOnInit(): void {
    this.setInitialData();
    this.getWeekdays();
    this.generateDatepickerDates();
    this.listenDatepickerControlEvents();
  }

  private setInitialData(): void {
    this.selectedDate =
      this.controlValue == null ? new Date() : new Date(this.controlValue);

    this.selectedDate = new Date(this.selectedDate.toDateString());
    this.selectedMonth = this.selectedDate.getMonth();
    this.selectedYear = this.selectedDate.getFullYear();

    this.options.control.setValue(this.selectedDate);
    this.datepickerControl.setValue(
      this.convertDateToString(this.selectedDate)
    );
  }

  private convertDateToString(value: Date): string {
    const day = value.getDate() < 10 ? `0${value.getDate()}` : value.getDate();
    const month =
      value.getMonth() + 1 < 10
        ? `0${value.getMonth() + 1}`
        : value.getMonth() + 1;

    return `${day}/${month}/${value.getFullYear()}`;
  }

  private listenDatepickerControlEvents(): void {
    this.datepickerControl.valueChanges.subscribe((value) => {
      this.validateDate(value);
      this.options.control.setValue(this.convertStringtoDate(value));
    });
  }

  private convertStringtoDate(value: string): Date {
    const splittedValue = value.split('/');
    const day = +splittedValue[0];
    const month = +splittedValue[1] - 1;
    const year = +splittedValue[2];

    return new Date(year, month, day);
  }

  private validateDate(value: string): void {
    console.log(value);

    if (
      value != null &&
      value !== '' &&
      new Date(value).toString() === 'Invalid Date'
    ) {
      console.log('entrou....');
      this.datepickerControl.setErrors({ invalidDate: true });
      this.options.control.setErrors({ invalidDate: true });
    }
  }

  public getWeekdays(): void {
    this.weekdays = Object.values(Weekdays).filter(
      (value) => typeof value === 'string'
    ) as Array<string>;
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
    const totalOfDaysOnCalendar = 42;
    const numberOfDays =
      totalOfDaysOnCalendar - this.dates.length + this.dates[0].getDay();

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
    this.datepickerControl.setValue(
      this.convertDateToString(this.selectedDate)
    );
    this.setFocus(false);
  }

  public isFromSelectedMonth(date: Date): boolean {
    return (
      date.getMonth() === this.selectedMonth &&
      date.getFullYear() === this.selectedYear
    );
  }

  public isSelectedDate(date: Date): boolean {
    return (
      date.getFullYear() === this.selectedDate.getFullYear() &&
      date.getMonth() === this.selectedDate.getMonth() &&
      date.getDate() === this.selectedDate.getDate() &&
      this.selectedMonth === this.selectedDate.getMonth()
    );
  }

  public setFocus(focused: boolean): void {
    this.isFocused = focused;
  }

  public get month(): string {
    return Object.values(Months)[this.selectedMonth] as string;
  }

  public get isDisabled(): boolean {
    return this.datepickerControl.disabled;
  }

  public get isInvalid(): boolean {
    return this.datepickerControl.invalid && this.datepickerControl.touched;
  }

  public get controlValue(): any {
    return this.options.control.value;
  }
}
