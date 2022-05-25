import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

import { SelectOptionInterface } from './interfaces/select-option.interface';
import { SelectInterface } from './interfaces/select.inteface';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input() options: SelectInterface;

  // TODO: CRIAR O ESTADO DE DESABILITADO
  @ViewChild('select', { static: false }) selectElement: ElementRef;

  public isOpen = false;

  constructor(private readonly renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.listen('window', 'click', (event: Event) => {
      this.isOpen =
        this.selectElement.nativeElement.contains(event.target) && !this.isOpen;
    });
  }

  public setSelectedOption(option: SelectOptionInterface): void {
    this.options.control.setValue(option);
    this.changeIsOpenState();
  }

  public changeIsOpenState(): void {
    this.isOpen = !this.isOpen;
  }

  public get controlValue(): any {
    return this.options.control.value;
  }
}
