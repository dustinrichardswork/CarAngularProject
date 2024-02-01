import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'discountTypesTranslate' })
export class MockedDiscountTypesPipe implements PipeTransform {
  public transform(val: { [key: string]: number }): string[] {
    return Object.keys(val);
  }
}
