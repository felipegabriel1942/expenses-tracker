import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ButtonColorEnum } from './enums/button-color.enum';
import { ButtonInterface } from './interface/button.interface';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements AfterViewChecked {
  @Input() options: ButtonInterface;

  constructor(private readonly changeDetection: ChangeDetectorRef) {}


  ngAfterViewChecked(): void {
    if (this.options != null && this.options.color == null) {
      this.options.color = ButtonColorEnum.PRIMARY;
      this.changeDetection.detectChanges();
    }
  }
}
