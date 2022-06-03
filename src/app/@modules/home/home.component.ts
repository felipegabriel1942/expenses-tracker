import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, AbstractControl } from '@angular/forms';
import { InputInterface } from 'src/app/@shared/components/input/interface/input.interface';
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
      disableSelects: new FormControl(false),
      cars: new FormGroup({
        car: new FormControl(null),
        car2: new FormControl(null),
      }),
      pessoa: new FormGroup({
        nome: new FormControl(null),
      }),
    });

    this.form.valueChanges.subscribe((values) => console.log(values));

    this.car.setErrors({ require: true, email: true });
    this.nomePessoa.setErrors({ require: true });
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

  public checkboxDisableSelectOptions(): CheckboxInterface {
    return {
      id: 'checkbox-disable-selects',
      label: 'Desabilitar',
      control: this.disableSelects,
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

  public inputNomePessoaOptions(): InputInterface {
    return {
      id: 'input-nome-pessoa',
      control: this.nomePessoa,
      label: 'Nome',
    };
  }

  public disableCarSelects(checked: boolean): void {
    checked ? this.cars.disable() : this.cars.enable();
  }

  public get expenses(): AbstractControl {
    return this.form.get('expenses');
  }

  public get receipts(): AbstractControl {
    return this.form.get('receipts');
  }

  public get cars(): AbstractControl {
    return this.form.get('cars');
  }

  public get car(): AbstractControl {
    return this.cars.get('car');
  }

  public get car2(): AbstractControl {
    return this.cars.get('car2');
  }

  public get disableSelects(): AbstractControl {
    return this.form.get('disableSelects');
  }

  public get nomePessoa(): AbstractControl {
    return this.form.get(['pessoa', 'nome']);
  }
}
