import { AbstractControl, FormGroup } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Transactions } from 'src/app/@models/transaction.model';
import { PageModel } from 'src/app/@models/page.model';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
})
export class TransactionListComponent implements OnInit {
  @Input() transactionsPage: PageModel<Transactions>;
  @Input() form: FormGroup;

  @Output() onAddTransactionClick = new EventEmitter();
  @Output() onPageChange = new EventEmitter();
  @Output() onEditClick = new EventEmitter();
  @Output() onDeleteClick = new EventEmitter();
  @Output() onFilterChange = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  changePage(event: LazyLoadEvent): void {
    const nextPage = event.first / event.rows;
    this.page.setValue(nextPage);
    this.onPageChange.emit(nextPage);
  }

  get page(): AbstractControl {
    return this.form.get('page');
  }

  get elementsPerPage(): AbstractControl {
    return this.form.get('elementsPerPage');
  }
}
