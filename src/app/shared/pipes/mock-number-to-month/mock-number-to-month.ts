import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'numberToMonth' })
export class MockedNumberToMonthPipe implements PipeTransform {
  public transform(): string {
    return 'January';
  }
}
