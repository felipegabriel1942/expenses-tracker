import { AbstractControl } from '@angular/forms';
import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Weekdays } from './enums/weekdays.enum';

import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Months } from './enums/months.enum';
import { DatepickerInterface } from './interfaces/datepicker.interface';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent
  implements OnInit, AfterViewInit, AfterViewChecked
{
  @Input() public options: DatepickerInterface;

  public dates: Date[] = [];
  public selectedMonth: number;
  public selectedYear: number;
  public selectedDate: Date;
  public weekdays: string[] = [];
  public faAngleLeft = faAngleLeft;
  public faAngleRight = faAngleRight;
  public isFocused = false;
  public formattedDate = '';

  constructor(private readonly changeDetection: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.setInitialData();
    this.getWeekdays();
    this.generateDatepickerDates();
    this.listenControlChanges();
  }

  ngAfterViewChecked(): void {}

  private listenControlChanges(): void {
    this.control.valueChanges.subscribe((value: string) => {
      if (value === '' || value == null) {
        return;
      }

      if (typeof value === 'string') {
        this.formattedDate = value;
        this.control.setValue(new Date(this.format(value)), {
          emitEvent: false,
        });

        if (new Date(this.format(value)).toString() !== 'Invalid Date') {
          this.selectedDate = new Date(this.format(value));
        }
      }

      this.selectedMonth = this.selectedDate
        ? this.selectedDate.getMonth()
        : new Date().getMonth();

      this.selectedYear = this.selectedDate
        ? this.selectedDate.getFullYear()
        : new Date().getFullYear();

      this.generateDatepickerDates();
    });
  }

  private format(value: string): string {
    const splitted = value.split('/');

    if (value.includes('/')) {
      return `${splitted[1]}-${splitted[0]}-${splitted[2]}`;
    } else if (!value.includes('/') && value.length === 8) {
      return `${value.substring(2, 4)}-${value.substring(
        0,
        2
      )}-${value.substring(4, 8)}`;
    }

    return value;
  }

  private setInitialData(): void {
    if (this.control.value) {
      this.selectedDate = new Date(new Date(this.control.value).toDateString());
      this.formattedDate = this.convertDateToString(this.selectedDate);
    }

    const value = this.control.value;

    if (value === '' || value == null) {
      return;
    }

    if (typeof value === 'string') {
      this.formattedDate = value;
      this.control.setValue(new Date(this.format(value)), {
        emitEvent: false,
      });
    } else {
      this.formattedDate = this.convertDateToString(
        new Date(this.control.value)
      );
    }

    this.selectedMonth = this.selectedDate
      ? this.selectedDate.getMonth()
      : new Date().getMonth();

    this.selectedYear = this.selectedDate
      ? this.selectedDate.getFullYear()
      : new Date().getFullYear();

    this.generateDatepickerDates();
    this.changeDetection.detectChanges();
  }

  private convertDateToString(value?: Date): string {
    if (value == null) {
      return;
    }

    const day = value.getDate() < 10 ? `0${value.getDate()}` : value.getDate();
    const month =
      value.getMonth() + 1 < 10
        ? `0${value.getMonth() + 1}`
        : value.getMonth() + 1;

    return `${day}/${month}/${value.getFullYear()}`;
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
    return dates[0] !== null && dates[0].getDay() === 0;
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
    this.options.control.setValue(date);
    this.setFocus(false);
  }

  public isFromSelectedMonth(date: Date): boolean {
    return (
      date.getMonth() === this.selectedMonth &&
      date.getFullYear() === this.selectedYear
    );
  }

  public isSelectedDate(date: Date): boolean {
    if (!this.selectedDate) {
      return false;
    }

    return (
      date.getFullYear() === this.selectedDate.getFullYear() &&
      date.getMonth() === this.selectedDate.getMonth() &&
      date.getDate() === this.selectedDate.getDate() &&
      this.selectedMonth === this.selectedDate.getMonth()
    );
  }

  public setFocus(focused: boolean): void {
    this.isFocused = focused;

    if (
      !this.isFocused &&
      this.control.value !== '' &&
      this.control.value != null
    ) {
      this.formattedDate = this.convertDateToString(
        new Date(this.control.value)
      );
    }
  }

  public get month(): string {
    return Object.values(Months)[this.selectedMonth] as string;
  }

  public get isDisabled(): boolean {
    return this.options.control.disabled;
  }

  public get isInvalid(): boolean {
    return this.options.control.invalid && this.options.control.touched;
  }

  public get control(): AbstractControl {
    return this.options.control;
  }
}
