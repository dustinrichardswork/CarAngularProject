import { NgModule, ModuleWithProviders } from '@angular/core';
import { BaseService } from './base.service';
import { PagerService } from './pager.service';

@NgModule({ providers: [PagerService] })
export class StantumCommonModule {}
