import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FooterComponent, HeaderComponent, SidebarComponent } from './components';
import { HomeComponent } from './home/home.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderMenuComponent } from './components/header/header-menu/header-menu.component';
import { NotificationBarComponent } from './components/notification-bar/notification-bar.component';
import { NavigationModule } from 'app/shared/services/navigation/navigation.module';
import { AppNavigation } from 'app/shared/services/navigation/app-navigation';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';

@NgModule({
  imports: [CommonModule, LayoutRoutingModule, NavigationModule.forRoot(AppNavigation.LoadConfig())],
  declarations: [
    LayoutComponent,
    SidebarComponent,
    BreadcrumbComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    HeaderMenuComponent,
    NotificationBarComponent,
  ],
})
export class LayoutModule {}
