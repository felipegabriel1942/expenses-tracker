import { Component, Input, OnInit } from '@angular/core';
import { ValidationUtils } from 'src/app/utils';
import { ErrroMessageInterface } from './interfaces/error-message.interface';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent implements OnInit {
  @Input() options: ErrroMessageInterface;

  constructor() {}

  ngOnInit(): void {}

  public get isInvalid(): boolean {
    return this.options.control.invalid;
  }

  public get errorMessage(): string {
    return ValidationUtils.getErrorMessage(this.options.control.errors);
  }
}
