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
import { Summaries } from 'src/app/@models/transaction-summary.model';
import { PageModel } from 'src/app/@models/page.model';
import { TransactionTypeEnum } from 'src/app/@enums/transaction-type.enum';
import { TransactionCategoryService } from 'src/app/@services/transaction-category/transaction-category.service';
import { PeriodEnum } from 'src/app/@enums/period.enum';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  transactionsPage$: Observable<PageModel<Transactions>>;
  transactionCategories$: Observable<TransactionCategoryModel>;
  summaries$: Observable<Summaries>;

  transactionFormIsOpen = false;

  // TODO: MUDAR PARA NOME QUE FAÇA MAIS SENTIDO, COMO FILTER_FORM.
  paramsForm: FormGroup;
  transactionForm: FormGroup;

  constructor(
    private readonly transactionService: TransactionService,
    private readonly transactionCategoryService: TransactionCategoryService
  ) {}

  ngOnInit(): void {
    this.transactionForm = this.createTransactionForm();
    this.paramsForm = this.createParamsForm();
    this.findTransactions();
    this.findSummaries();
    this.findCategories();
  }

  createTransactionForm(): FormGroup {
    return new FormGroup({
      description: new FormControl(null, Validators.required),
      transactionDate: new FormControl(new Date(), Validators.required),
      value: new FormControl(null, Validators.required),
      transactionCategory: new FormControl(null, Validators.required),
      transactionType: new FormControl(
        TransactionTypeEnum.EXPENSE,
        Validators.required
      ),
      installment: new FormControl(1),
      totalInstallments: new FormControl(1, [
        Validators.required,
        Validators.min(1),
      ]),
      period: new FormControl(PeriodEnum.MONTHLY),
      id: new FormControl(),
      audit: new FormControl(),
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
    this.transactionForm = this.createTransactionForm();
  }

  findTransactions(): void {
    const params = this.paramsForm.value as TransactionParamsModel;
    this.transactionsPage$ = this.transactionService.findTransactions(params);
  }

  findSummaries(): void {
    const params = this.paramsForm.value as TransactionParamsModel;
    this.summaries$ = this.transactionService.getSummary(params);
  }

  findCategories(): void {
    this.transactionCategories$ =
      this.transactionCategoryService.findTransactionCategories();
  }

  saveTransaction(): void {
    const transaction = this.transactionForm.value;

    const request$ =
      transaction.id == null
        ? this.transactionService.saveTransaction(transaction)
        : this.transactionService.updateTransaction(transaction);

    request$.subscribe((_) => {
      this.closeTransactionFormDialog();
      this.paramsForm = this.createParamsForm();
      this.findTransactions();
      this.findSummaries();
    });
  }

  deleteTransaction(transaction: TransactionModel): void {
    this.transactionService.deleteTransaction(transaction).subscribe((_) => {
      this.findTransactions();
    });
  }

  editTransaction(transaction: TransactionModel): void {
    this.openTransactionFormDialog();
    this.transactionForm.patchValue(transaction);
  }

  get page(): AbstractControl {
    return this.paramsForm.get('page');
  }
}
