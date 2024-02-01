import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'brokerForwardingMethodsTranslate' })
export class MockedBrokerForwardingMethodsPipe implements PipeTransform {
  public transform(): string[] {
    return [];
  }
}
