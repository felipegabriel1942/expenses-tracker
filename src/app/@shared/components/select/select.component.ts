import { Component, Input, OnInit } from '@angular/core';

import { SelectOptionInterface } from './interfaces/select-option.interface';
import { SelectInterface } from './interfaces/select.inteface';

import { IC_DOWN_ARROW } from './../../../consts/assets';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input() options: SelectInterface;

  public isFocused = false;
  public IC_DOWN_ARROW = IC_DOWN_ARROW;

  constructor() {}

  ngOnInit(): void {}

  public setFocus(focused: boolean): void {
    this.isFocused = focused && !this.isDisabled;
    this.markControlAsTouched();
  }

  private markControlAsTouched(): void {
    if (this.isFocused && this.options.control.untouched) {
      this.options.control.markAsTouched();
    }
  }

  public setSelectedOption(option: SelectOptionInterface): void {
    this.options.control.setValue(option);
    this.isFocused = false;
  }

  public get controlValue(): any {
    return this.options.control.value;
  }

  public get isDisabled(): boolean {
    return this.options.control.disabled;
  }

  public get isInvalid(): boolean {
    return this.options.control.invalid && this.options.control.touched;
  }
}
