import { CheckboxInterface } from './../../@shared/components/checkbox/interface/checkbox.interface';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  form: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      expenses: new FormControl(false),
      receipts: new FormControl(false),
    });

    this.form.valueChanges.subscribe((values) => console.log(values));
  }

  public checkboxExpensesOptions(): CheckboxInterface {
    return {
      id: 'checkbox-despesas',
      label: 'Despesas',
      control: this.expenses,
    };
  }

  public checkboxReceiptsOptions(): CheckboxInterface {
    return {
      id: 'checkbox-receitas',
      label: 'Receitas',
      control: this.receipts,
    };
  }

  public get expenses(): AbstractControl {
    return this.form.get('expenses');
  }

  public get receipts(): AbstractControl {
    return this.form.get('receipts');
  }
}
