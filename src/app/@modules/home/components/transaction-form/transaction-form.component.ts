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

  @Input() form: FormGroup;
  @Input() transactionCategories: TransactionCategories;
  @Input() isOpen: boolean;

  @Output() onSave = new EventEmitter();
  @Output() onHide = new EventEmitter();

  constructor(private deviceService: DeviceDetectorService) {}

  public ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile();
    this.transactionTypes = Object.values(TransactionTypeEnum);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.filteredCategories = this.transactionCategories;

    if (changes.isOpen != null && changes.isOpen.currentValue) {
      this.filterCategories();
    }
  }

  public filterCategories(): void {
    this.filteredCategories = this.transactionCategories.filter(
      (t) => t.transactionType === this.transactionType.value
    );
  }

  get description(): AbstractControl {
    return this.form.get('description');
  }

  get transactionType(): AbstractControl {
    return this.form.get('transactionType');
  }
}
