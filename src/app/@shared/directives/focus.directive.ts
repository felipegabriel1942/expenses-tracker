import {
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appFocus]',
})
export class FocusDirective implements OnInit, OnDestroy {
  @Output() onFocus = new EventEmitter();

  private unlistener: () => void;

  constructor(
    private readonly element: ElementRef,
    private readonly renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.listenDomEvents();
  }

  ngOnDestroy(): void {
    this.unlistener();
  }

  private listenDomEvents(): void {
    this.renderer.listen('window', 'click', (event: PointerEvent) => {
      if (event.pointerId < 0) {
        return;
      }
      const isFocused = this.componentIsFocused(event);
      this.onFocus.emit(isFocused);
    });
  }

  private componentIsFocused(event: Event): boolean {
    return this.element.nativeElement.contains(event.target);
  }
}
