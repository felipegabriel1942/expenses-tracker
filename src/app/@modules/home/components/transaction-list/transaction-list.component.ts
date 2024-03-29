import { AbstractControl, FormGroup } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  TransactionModel,
  Transactions,
} from 'src/app/@models/transaction.model';
import { PageModel } from 'src/app/@models/page.model';
import { LazyLoadEvent } from 'primeng/api';
import { DeviceDetectorService } from 'ngx-device-detector';
import { TransactionTypeEnum } from 'src/app/@enums/transaction-type.enum';
import { OperationType } from 'src/app/@enums/operation-type.enum';
import { Operation } from 'src/app/@models/operation.model';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
})
export class TransactionListComponent implements OnInit {
  public deleteConfirmationIsOpen = false;
  public selectedTransaction = new TransactionModel();
  public isMobile = false;
  public operationTypes = Object.values(OperationType);

  @Input() public transactionsPage: PageModel<Transactions>;
  @Input() public form: FormGroup;

  @Output() public onAddTransactionClick = new EventEmitter();
  @Output() public onPageChange = new EventEmitter();
  @Output() public onEditClick = new EventEmitter();
  @Output() public onDeleteClick = new EventEmitter();
  @Output() public onFilterChange = new EventEmitter();

  constructor(private deviceService: DeviceDetectorService) {}

  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile();
  }

  changePage(event: LazyLoadEvent): void {
    const nextPage = event.first / event.rows;
    this.page.setValue(nextPage);
    this.onPageChange.emit(nextPage);
  }

  public setBadgeColor(transaction: TransactionModel): string {
    if (this.isExpense(transaction)) {
      return 'danger';
    }

    if (this.isRevenue(transaction)) {
      return 'success';
    }
  }

  private isRevenue(transaction: TransactionModel): boolean {
    return (
      transaction.transactionCategory.transactionType ===
      TransactionTypeEnum.REVENUE
    );
  }

  private isExpense(transaction: TransactionModel): boolean {
    return (
      transaction.transactionCategory.transactionType ===
      TransactionTypeEnum.EXPENSE
    );
  }

  public openDeleteConfimation(transaction: TransactionModel): void {
    this.selectedTransaction = transaction;
    this.deleteConfirmationIsOpen = true;
  }

  public deleteTransaction(operationType?: OperationType): void {
    if (!operationType) {
      operationType = OperationType.ONLY_THIS;
    }

    const operation = new Operation<TransactionModel>();
    operation.content = this.selectedTransaction;
    operation.operationType = operationType;

    this.onDeleteClick.emit(operation);
    this.closeDeleteConfirmation();
  }

  public closeDeleteConfirmation(): void {
    this.selectedTransaction = new TransactionModel();
    this.deleteConfirmationIsOpen = false;
  }

  get page(): AbstractControl {
    return this.form.get('page');
  }

  get elementsPerPage(): AbstractControl {
    return this.form.get('elementsPerPage');
  }

  get listIsEmpty(): boolean {
    return this.transactionsPage.content.length === 0;
  }
}
