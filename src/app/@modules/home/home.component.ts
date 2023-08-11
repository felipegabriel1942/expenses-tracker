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
import { Operation } from 'src/app/@models/operation.model';
import { OperationType } from 'src/app/@enums/operation-type.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public transactionsPage$: Observable<PageModel<Transactions>>;
  public transactionCategories$: Observable<TransactionCategoryModel>;
  public summaries$: Observable<Summaries>;

  public transactionFormIsOpen = false;

  // TODO: MUDAR PARA NOME QUE FAÇA MAIS SENTIDO, COMO FILTER_FORM.
  public paramsForm: FormGroup;
  public transactionForm: FormGroup;

  public constructor(
    private readonly transactionService: TransactionService,
    private readonly transactionCategoryService: TransactionCategoryService
  ) {}

  public ngOnInit(): void {
    this.transactionForm = this.createTransactionForm();
    this.paramsForm = this.createParamsForm();
    this.findTransactions();
    this.findSummaries();
    this.findCategories();
  }

  private createTransactionForm(): FormGroup {
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
      repeat: new FormControl(false)
    });
  }

  private createParamsForm(): FormGroup {
    return new FormGroup({
      expense: new FormControl(true),
      revenue: new FormControl(true),
      page: new FormControl(0),
      elementsPerPage: new FormControl(5),
      period: new FormControl(new Date()),
    });
  }

  public openTransactionFormDialog(): void {
    this.transactionFormIsOpen = true;
  }

  public closeTransactionFormDialog(): void {
    this.transactionFormIsOpen = false;
    this.transactionForm = this.createTransactionForm();
  }

  public findTransactions(): void {
    const params = this.paramsForm.value as TransactionParamsModel;
    this.transactionsPage$ = this.transactionService.findTransactions(params);
  }

  public findSummaries(): void {
    const params = this.paramsForm.value as TransactionParamsModel;
    this.summaries$ = this.transactionService.getSummary(params);
  }

  public findCategories(): void {
    this.transactionCategories$ =
      this.transactionCategoryService.findTransactionCategories();
  }

  public saveTransaction(): void {
    this.createOrUpdate(this.transactionForm.value).subscribe((_) => {
      this.closeTransactionFormDialog();
      this.paramsForm = this.createParamsForm();
      this.findTransactions();
      this.findSummaries();
    });
  }

  private createOrUpdate(transaction: TransactionModel) {
    return transaction.id == null
      ? this.transactionService.saveTransaction(transaction)
      : this.transactionService.updateTransaction(transaction);
  }

  // TODO: Procurar uma forma de melhorar este metodo no futuro, fere principio OPEN/CLOSED
  public deleteTransaction(operation: Operation<TransactionModel>): void {
    const transactionId = operation.content.id;

    let request$;

    if (operation.operationType.includes(OperationType.ONLY_THIS)) {
      request$ = this.transactionService.deleteTransaction(transactionId);
    }

    if (operation.operationType.includes(OperationType.ALL)) {
      request$ = this.transactionService.deleteAllTransactions(transactionId);
    }

    if (operation.operationType.includes(OperationType.THIS_AND_FUTURE)) {
      request$ =
        this.transactionService.deleteThisAndFutureTransactions(transactionId);
    }

    request$.subscribe((_) => this.findTransactions());
  }

  public editTransaction(transaction: TransactionModel): void {
    this.openTransactionFormDialog();
    this.transactionForm.patchValue(transaction);
  }

  public get page(): AbstractControl {
    return this.paramsForm.get('page');
  }
}
