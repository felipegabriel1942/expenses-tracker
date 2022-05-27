import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
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

  @ViewChild('checkbox', { static: false }) selectElement: ElementRef;

  public IC_CHECK_WHITE = IC_CHECK_WHITE;
  public isFocused = false;
  private unlistener: () => void;

  constructor(private readonly renderer: Renderer2) {}

  ngOnInit(): void {
    this.initOptions();
    this.listenDomEvents();
  }

  ngOnDestroy(): void {
    this.unlistener();
  }

  initOptions(): void {}

  private listenDomEvents(): void {
    this.unlistener = this.renderer.listen(
      'window',
      'click',
      (event: PointerEvent) => {
        if (event.pointerId < 0) {
          return;
        }

        this.focusElement(event);
      }
    );
  }

  private focusElement(event: Event): void {
    if (this.isDisabled) {
      return;
    }

    this.isFocused = this.componentIsClicked(event) && !this.isChecked;
  }

  private componentIsClicked(event: Event): boolean {
    return this.selectElement.nativeElement.contains(event.target);
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
