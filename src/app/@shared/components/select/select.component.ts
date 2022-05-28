import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

import { SelectOptionInterface } from './interfaces/select-option.interface';
import { SelectInterface } from './interfaces/select.inteface';

import { IC_DOWN_ARROW } from './../../../consts/assets';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit, OnDestroy {
  @Input() options: SelectInterface;

  @ViewChild('select', { static: false }) selectElement: ElementRef;

  public isOpen = false;
  public IC_DOWN_ARROW = IC_DOWN_ARROW;
  private unlistener: () => void;

  constructor(private readonly renderer: Renderer2) {}

  ngOnInit(): void {
    this.listenDomEvents();
  }

  ngOnDestroy(): void {
    this.unlistener();
  }

  private listenDomEvents(): void {
    this.unlistener = this.renderer.listen(
      'window',
      'click',
      (event: Event) => {
        this.openCloseDropdown(event);
      }
    );
  }

  private openCloseDropdown(event: Event): void {
    if (this.isDisabled) {
      return;
    }

    this.isOpen = this.componentIsClicked(event) && !this.isOpen;
  }

  private componentIsClicked(event: Event): boolean {
    return this.selectElement.nativeElement.contains(event.target);
  }

  public setSelectedOption(option: SelectOptionInterface): void {
    this.options.control.setValue(option);
    this.isOpen = false;
  }

  public get controlValue(): any {
    return this.options.control.value;
  }

  public get isDisabled(): boolean {
    return this.options.control.disabled;
  }

  public get isInvalid(): boolean {
    return this.options.control.invalid;
  }
}
