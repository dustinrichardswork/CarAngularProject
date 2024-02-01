import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AddressDetailsComponent } from './address-details.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [AddressDetailsComponent],
  exports: [AddressDetailsComponent],
})
export class AddressDetailsModule {}
