import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

import { CheckboxInterface } from './interface/checkbox.interface';
import { IC_CHECK_WHITE } from './../../../consts/assets';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements OnInit, OnDestroy {
  @Input() options: CheckboxInterface;

  @Output() valueChange = new EventEmitter<boolean>();

  public IC_CHECK_WHITE = IC_CHECK_WHITE;
  public isFocused = false;

  constructor() {}

  ngOnInit(): void {
    this.initOptions();
  }

  ngOnDestroy(): void {}

  initOptions(): void {}

  public setFocus(focused: boolean): void {
    this.isFocused = focused && !this.isChecked;
  }

  public onChange(): void {
    this.valueChange.emit(!this.options?.control?.value);
  }

  public get isChecked(): boolean {
    return this.options.control.value;
  }

  public get isDisabled(): boolean {
    return this.options.control.disabled;
  }
}
