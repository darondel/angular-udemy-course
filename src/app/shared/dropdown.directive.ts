import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  static readonly showClass = 'show';
  static readonly ariaExpandedAttr = 'aria-expanded';

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('click') onClick() {
    const elements = [this.elementRef.nativeElement];
    const children = elements[0].children;

    for (let i = 0; i < children.length; i++) {
      elements.push(children[i]);
    }

    elements.forEach(element => {
      if (element instanceof HTMLLIElement || element instanceof HTMLDivElement) {
        if (element.classList.contains(DropdownDirective.showClass)) {
          this.renderer.removeClass(element, DropdownDirective.showClass);
        } else {
          this.renderer.addClass(element, DropdownDirective.showClass);
        }
      } else if (element instanceof HTMLAnchorElement) {
        this.renderer.setAttribute(element, DropdownDirective.ariaExpandedAttr, this.getNewAriaExpandedValue(element));
      }
    });
  }

  getNewAriaExpandedValue(element: Element): string {
    return element.getAttribute(DropdownDirective.ariaExpandedAttr) === 'true' ? 'false' : 'true';
  }

}
