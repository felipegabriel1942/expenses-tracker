import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import {
  TransactionModel,
  Transactions,
} from 'src/app/@models/transaction.model';
import { TransactionService } from 'src/app/@services/transaction/transaction.service';
import { TransactionParamsModel } from 'src/app/@models/transaction-params.mode';
import { TransactionCategoryModel } from 'src/app/@models/transaction-category.model';
import { TransactionTypeModel } from 'src/app/@models/transaction-type.model';
import { Summaries } from 'src/app/@models/transaction-summary.model';
import { ExpenseSummaries } from 'src/app/@models/expense-summary.model';
import { PageModel } from 'src/app/@models/page.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  transactionsPage$: Observable<PageModel<Transactions>>;
  categories$: Observable<TransactionCategoryModel>;
  types$: Observable<TransactionTypeModel>;
  summaries$: Observable<Summaries>;
  expenseSummaries$: Observable<ExpenseSummaries>;

  transactionFormIsOpen = false;
  paramsForm: FormGroup;
  transactionForm: FormGroup;

  constructor(private readonly transactionService: TransactionService) {}

  ngOnInit(): void {
    this.buildTransactionForm();
    this.buildParamsForm();
    this.loadTypes();
    this.loadSummaries();
    this.loadExpenseSummaries();
    this.loadTransactions();
  }

  buildTransactionForm(): void {
    this.transactionForm = new FormGroup({
      description: new FormControl(null, Validators.required),
      creationDate: new FormControl(new Date(), Validators.required),
      value: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      id: new FormControl(),
    });

    this.type.valueChanges.subscribe((value) => {
      this.categories$ = this.transactionService.findTransactionCategories(
        value.id
      );
    });
  }

  buildParamsForm(): void {
    this.paramsForm = new FormGroup({
      expense: new FormControl(true),
      revenue: new FormControl(true),
      page: new FormControl(0),
      elementsPerPage: new FormControl(5),
      period: new FormControl(new Date()),
    });
  }

  openTransactionFormDialog(): void {
    this.transactionFormIsOpen = true;
  }

  closeTransactionFormDialog(): void {
    this.transactionFormIsOpen = false;
    this.resetTransactionForm();
  }

  loadTransactions(): void {
    const params = this.paramsForm.value as TransactionParamsModel;
    this.transactionsPage$ = this.transactionService.findTransactions(params);
  }

  loadSummaries(): void {
    const params = this.paramsForm.value as TransactionParamsModel;
    this.summaries$ = this.transactionService.getSummary(params);
  }

  loadExpenseSummaries(): void {
    const params = this.paramsForm.value as TransactionParamsModel;
    this.expenseSummaries$ = this.transactionService.getExpenseSummary(params);
  }

  loadTypes(): void {
    this.types$ = this.transactionService.findTransactionTypes();
  }

  saveTransaction(): void {
    const transaction = this.transactionForm.value;

    const request$ =
      transaction.id == null
        ? this.transactionService.saveTransaction(transaction)
        : this.transactionService.updateTransaction(transaction);

    request$.subscribe((_) => {
      this.closeTransactionFormDialog();
      this.resetParamsForm();
      this.loadTransactions();
      this.loadSummaries();
      this.loadExpenseSummaries();
    });
  }

  resetParamsForm(): void {
    this.paramsForm.reset({
      expense: true,
      revenue: true,
      elementsPerPage: 10,
      page: 0,
      period: this.paramsForm.get('period').value,
    });
  }

  resetTransactionForm(): void {
    this.transactionForm.reset({
      creationDate: new Date(),
    });
  }

  deleteTransaction(transaction: TransactionModel): void {
    this.transactionService.deleteTransaction(transaction).subscribe((_) => {
      this.loadTransactions();
      this.loadSummaries();
    });
  }

  editTransaction(transaction: TransactionModel): void {
    this.transactionForm.patchValue(transaction);
    this.transactionForm
      .get('creationDate')
      .setValue(new Date(transaction.creationDate));
    this.openTransactionFormDialog();
  }

  get page(): AbstractControl {
    return this.paramsForm.get('page');
  }

  get type(): AbstractControl {
    return this.transactionForm.get('type');
  }
}
