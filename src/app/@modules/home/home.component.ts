import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
import { Summaries } from 'src/app/@models/transaction-summary.model';
import { ExpenseSummaries } from 'src/app/@models/expense-summary.model';
import { PageModel } from 'src/app/@models/page.model';
import { TransactionTypeEnum } from 'src/app/@enums/transaction-type.enum';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  transactionsPage$: Observable<PageModel<Transactions>>;
  transactionCategories$: Observable<TransactionCategoryModel>;
  summaries$: Observable<Summaries>;
  expenseSummaries$: Observable<ExpenseSummaries>;

  transactionFormIsOpen = false;

  // TODO: MUDAR PARA NOME QUE FAÇA MAIS SENTIDO, COMO FILTER_FORM.
  paramsForm: FormGroup;
  transactionForm: FormGroup;

  constructor(
    private readonly transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.transactionForm = this.createTransactionForm();
    this.paramsForm = this.createParamsForm();
    this.findSummaries();
    this.findExpenseSummaries();
    this.findTransactions();
    this.findCategories();
  }

  createTransactionForm(): FormGroup {
    return new FormGroup({
      description: new FormControl(null, Validators.required),
      creationDate: new FormControl(new Date(), Validators.required),
      value: new FormControl(null, Validators.required),
      transactionCategory: new FormControl(null, Validators.required),
      transactionType: new FormControl(TransactionTypeEnum.EXPENSE, Validators.required),
      id: new FormControl(),
    });
  }

  createParamsForm(): FormGroup {
    return new FormGroup({
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

  findTransactions(): void {
    const params = this.paramsForm.value as TransactionParamsModel;
    this.transactionsPage$ = this.transactionService.findTransactions(params);
  }

  findSummaries(): void {
    const params = this.paramsForm.value as TransactionParamsModel;
    this.summaries$ = this.transactionService.getSummary(params);
  }

  findExpenseSummaries(): void {
    const params = this.paramsForm.value as TransactionParamsModel;
    this.expenseSummaries$ = this.transactionService.getExpenseSummary(params);
  }

  findCategories(): void {
    this.transactionCategories$ =
      this.transactionService.findTransactionCategories();
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
      this.findTransactions();
      this.findSummaries();
      this.findExpenseSummaries();
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
      creationDate: new Date()
    });
  }

  deleteTransaction(transaction: TransactionModel): void {
    this.transactionService.deleteTransaction(transaction).subscribe((_) => {
      this.findTransactions();
      this.findSummaries();
    });
  }

  editTransaction(transaction: TransactionModel): void {
    this.openTransactionFormDialog();

    this.transactionForm.patchValue(transaction);
    this.transactionForm
      .get('creationDate')
      .setValue(new Date(transaction.creationDate));
  }

  get page(): AbstractControl {
    return this.paramsForm.get('page');
  }
}
