import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'userRolesEnumTranslate' })
export class MockedUserRolesEnumTranslatePipe implements PipeTransform {
  public transform(val: { [key: string]: number }): string[] {
    return Object.keys(val);
  }
}
