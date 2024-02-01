import { ElementRef, Renderer2 } from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { LimitInputDirective } from './limit-input.directive';

describe('LimitInputDirective', () => {
  const element = { nativeElement: {} } as ElementRef;
  const renderer = {
    setProperty: jasmine
      .createSpy('setProperty')
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      .and.callFake((elem, property, value) => (element.nativeElement[property] = value)),
  } as unknown as Renderer2;
  const formControl = { control: new FormControl('') } as unknown as NgControl;
  const directive = new LimitInputDirective(element, renderer, formControl);

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should set purified phone number to control value', () => {
    directive.regExpType = 'phone';
    directive.onChange('+38  (098)  76-54-321')

    expect(formControl.control.value).toEqual('+38 098 76 54 321');
  });
});
