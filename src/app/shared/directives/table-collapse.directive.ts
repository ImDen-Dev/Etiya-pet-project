import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({ selector: '[tableCollapseDirective]' })
export class TableCollapseDirective {
  isOpen = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}
  @HostBinding('style.cursor') cursor = 'pointer';
  @HostBinding('style.userSelect') userSelect = 'none';
  @HostListener('click', ['$event.target'])
  onClick(target: HTMLElement) {
    if (target.tagName === 'BUTTON' || target.tagName === 'INPUT') {
      return;
    }

    const nextElement = this.el.nativeElement.nextElementSibling;
    this.isOpen = !this.isOpen;
    this.isOpen
      ? this.renderer.addClass(nextElement, 'show')
      : this.renderer.removeClass(nextElement, 'show');
  }
}
