import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { InputInterface } from './interface/input.interface';
import { InputType } from 'src/app/@shared/components/input/enums/input-type.enum';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit, OnDestroy {
  @Input() options: InputInterface;

  public isFocused = false;

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  public setFocus(focused: boolean): void {
    this.isFocused = focused && !this.isDisabled;
  }

  public get isDisabled(): boolean {
    return this.options.control.disabled;
  }

  public get isInvalid(): boolean {
    return this.options.control.invalid && this.options.control.touched;
  }

  public get prefix(): string {
    const prefixes = {
      [InputType.CURRENCY]: 'R$ ',
    };

    return prefixes[this.options.type] || '';
  }

  public get mask(): string {
    const masks = {
      [InputType.CURRENCY]: 'separator.2',
    };

    return masks[this.options.type] || '';
  }
}
