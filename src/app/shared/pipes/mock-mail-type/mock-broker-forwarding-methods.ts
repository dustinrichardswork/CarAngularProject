import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'mailTypeTranslate' })
export class MockedMailAddressTypesPipe implements PipeTransform {
  public transform(): string[] {
    return [];
  }
}
