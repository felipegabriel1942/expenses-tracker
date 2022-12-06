import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { TransactionCategories } from 'src/app/@models/transaction-category.model';
import { TransactionTypes } from 'src/app/@models/transaction-type.model';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() types: TransactionTypes;
  @Input() categories: TransactionCategories;
  @Input() isOpen: boolean;

  @Output() onSave = new EventEmitter();
  @Output() onHide = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  get description(): AbstractControl {
    return this.form.get('description');
  }

}
