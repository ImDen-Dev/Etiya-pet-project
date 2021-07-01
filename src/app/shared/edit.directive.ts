import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[editDirective]',
})
export class EditDirective {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('click', ['$event.target']) onClick(target: HTMLElement) {
    let elements: any[] = [];
    console.log(this.elRef.nativeElement.childNodes);
    this.elRef.nativeElement.childNodes.forEach((elem: any) => {
      if (elem.tagName === 'TR') {
        elements.push(elem);
      }
      console.log(elements);
    });

    elements.forEach((elem: any, index: number) => {
      if (index % 2 === 1) {
        this.renderer.addClass(elem, 'hidden');
      }
      if (index % 2 === 0) {
        this.renderer.removeClass(elem, 'hidden');
      }
    });

    console.log((target.parentNode as HTMLElement).parentNode);
    if (target.classList.contains('edit')) {
      const parentNode = (target.parentNode as HTMLElement).parentNode;
      const nextElem = parentNode?.nextSibling;
      this.renderer.addClass(parentNode, 'hidden');
      this.renderer.removeClass(nextElem, 'hidden');
    }
  }
}
