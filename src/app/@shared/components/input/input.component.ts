import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { InputInterface } from './interface/input.interface';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit, OnDestroy {
  @Input() options: InputInterface;

  @ViewChild('input', { static: false }) selectElement: ElementRef;

  public isFocused = false;
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

    this.isFocused = this.componentIsClicked(event);
  }

  private componentIsClicked(event: Event): boolean {
    return this.selectElement.nativeElement.contains(event.target);
  }

  public get isDisabled(): boolean {
    return this.options.control.disabled;
  }

  public get isInvalid(): boolean {
    return this.options.control.invalid && this.options.control.touched;
  }
}
