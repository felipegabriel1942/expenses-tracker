import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, AbstractControl } from '@angular/forms';
import { SelectInterface } from 'src/app/@shared/components/select/interfaces/select.inteface';

import { CheckboxInterface } from './../../@shared/components/checkbox/interface/checkbox.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  form: FormGroup;
  selectOptions: SelectInterface;

  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      expenses: new FormControl(false),
      receipts: new FormControl({ value: false, disabled: true }),
      car: new FormControl(null),
      car2: new FormControl({ value: null, disabled: true }),
    });

    this.form.valueChanges.subscribe((values) => console.log(values));

    this.car.setErrors({require: true});
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

  public carSelectOptions1(): SelectInterface {
    return {
      id: 'select-car-1',
      control: this.car,
      label: 'Choose an car',
      options: [
        {
          value: 'volvo',
          label: 'Volvo',
        },
        {
          value: 'saab',
          label: 'Saab',
        },
        {
          value: 'mercedes',
          label: 'Mercedes',
        },
      ],
    };
  }

  public carSelectOptions2(): SelectInterface {
    return {
      id: 'select-car-2',
      control: this.car2,
      label: 'Choose an car',
      options: [
        {
          value: 'volvo',
          label: 'Volvo',
        },
        {
          value: 'saab',
          label: 'Saab',
        },
        {
          value: 'mercedes',
          label: 'Mercedes',
        },
      ],
    };
  }

  public get expenses(): AbstractControl {
    return this.form.get('expenses');
  }

  public get receipts(): AbstractControl {
    return this.form.get('receipts');
  }

  public get car(): AbstractControl {
    return this.form.get('car');
  }

  public get car2(): AbstractControl {
    return this.form.get('car2');
  }
}
