import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'userRolesTranslate' })
export class MockedUserRolesTranslatePipe implements PipeTransform {
  public transform(val: string): string {
    return val;
  }
}
