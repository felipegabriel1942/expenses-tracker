import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Months } from '../../enums/months.enum';
import { Weekdays } from '../../enums/weekdays.enum';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() public selectedDate: Date;
  @Output() public onChange = new EventEmitter();

  public faAngleLeft = faAngleLeft;
  public faAngleRight = faAngleRight;
  public selectedMonth: number;
  public selectedYear: number;
  public weekdays: string[] = [];
  public dates: Date[] = [];

  constructor(private readonly changeDetection: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.getWeekdays();
    this.selectedMonth = this.selectedDate
      ? this.selectedDate.getMonth()
      : new Date().getMonth();

    this.selectedYear = this.selectedDate
      ? this.selectedDate.getFullYear()
      : new Date().getFullYear();

    this.generateDatepickerDates();
    this.changeDetection.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.selectedDate?.currentValue) {
      if (typeof this.selectedDate !== 'string') {
        this.generateDatepickerDates();
      }
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

    if (this.dates == null || this.dates.length === 0) {
      return;
    }

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

    this.onChange.emit(date);
  }

  public isFromSelectedMonth(date: Date): boolean {
    return (
      date.getMonth() === this.selectedMonth &&
      date.getFullYear() === this.selectedYear
    );
  }

  public isSelectedDate(date: Date): boolean {
    if (!this.selectedDate || typeof this.selectedDate === 'string') {
      return false;
    }

    return (
      date.getFullYear() === this.selectedDate.getFullYear() &&
      date.getMonth() === this.selectedDate.getMonth() &&
      date.getDate() === this.selectedDate.getDate() &&
      this.selectedMonth === this.selectedDate.getMonth()
    );
  }

  public get month(): string {
    return Object.values(Months)[this.selectedMonth] as string;
  }
}
