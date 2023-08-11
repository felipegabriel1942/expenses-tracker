import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { DeviceDetectorService } from 'ngx-device-detector';
import { PeriodEnum } from 'src/app/@enums/period.enum';

import { TransactionTypeEnum } from 'src/app/@enums/transaction-type.enum';
import { TransactionCategories } from 'src/app/@models/transaction-category.model';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
})
export class TransactionFormComponent implements OnInit, OnChanges {
  public isMobile = false;
  public transactionTypes = new Array<TransactionTypeEnum>();
  public filteredCategories: TransactionCategories;
  public periods = new Array<PeriodEnum>();

  @Input() form: FormGroup;
  @Input() transactionCategories: TransactionCategories;
  @Input() isOpen: boolean;

  @Output() onSave = new EventEmitter();
  @Output() onHide = new EventEmitter();

  constructor(private deviceService: DeviceDetectorService) {}

  public ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile();
    this.transactionTypes = Object.values(TransactionTypeEnum);
    this.periods = Object.values(PeriodEnum);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.filteredCategories = this.transactionCategories;

    const transactionDate = this.form.get('transactionDate').value;

    if (!(transactionDate instanceof Date)) {
      this.form
        .get('transactionDate')
        .setValue(new Date(`${transactionDate}T00:00:00`));
    }

    if (changes.isOpen != null && changes.isOpen.currentValue) {
      this.filterCategories();
    }
  }

  public filterCategories(): void {
    this.filteredCategories = this.transactionCategories.filter(
      (t) => t.transactionType === this.transactionType.value
    );
  }

  public save(): void {
    if (!this.canShowRepetitionFields) {
      this.resetRepetitionFields();
    }

    this.onSave.emit();
  }

  private resetRepetitionFields(): void {
    this.form.get('totalInstallments').setValue(1);
    this.form.get('period').setValue(PeriodEnum.MONTHLY);
  }

  public get description(): AbstractControl {
    return this.form.get('description');
  }

  public get transactionType(): AbstractControl {
    return this.form.get('transactionType');
  }

  public get canShowRepetitionFields(): boolean {
    return this.form?.get('id').value == null && this.form.get('repeat').value;
  }
}
