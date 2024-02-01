import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationService } from './navigation.service';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { NavigationConfig } from './navigation-config';
import { ResizeService } from './resize.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
})
export class NavigationModule {

  static forRoot(config: NavigationConfig): ModuleWithProviders {
    return {
      ngModule: NavigationModule,
      providers: [
        ResizeService,
        { provide: NavigationConfig, useValue: config },
        {
          provide: APP_INITIALIZER,
          useFactory: (ds: NavigationService) => () => {
            return ds.load();
          },
          deps: [NavigationService],
          multi: true
        }
      ]
    };
  }
}
