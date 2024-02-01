import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LimitInputDirective } from './limit-input/limit-input.directive';

const directives = [LimitInputDirective];

@NgModule({
  imports: [CommonModule],
  declarations: directives,
  exports: directives,
})
export class SharedDirectivesModule {}
