import { Directive, ElementRef, Renderer2, Input, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

const regExpOptions = {
  phone: {
    regExp: /(\s{2,})|[-()]/gi,
    replaceValue: ' ',
  },
};

type RegExpTypes = 'phone';

@Directive({
  selector: '[appLimitInput]',
})
export class LimitInputDirective {
  @Input()
  public set regExpType(type: RegExpTypes) {
    this.regExpItem = regExpOptions[type];
  }
  public regExpItem: { regExp: RegExp; replaceValue: string };
  private readonly element: HTMLElement;

  constructor(
    public readonly el: ElementRef,
    private readonly renderer: Renderer2,
    private readonly formControl: NgControl,
  ) {
    this.element = el.nativeElement;
  }

  @HostListener('input', ['$event.target.value'])
  public onChange(value: string) {
    if (!this.regExpItem) {
      return;
    }
    const newData = value
      .replace(this.regExpItem.regExp, this.regExpItem.replaceValue)
      .replace(this.regExpItem.regExp, this.regExpItem.replaceValue);
    this.renderer.setProperty(this.element, 'value', newData);
    this.formControl.control.setValue(newData);
  }
}
