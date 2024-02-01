import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService } from 'app/shared/services/breadcrumb.service';
import { BreadcrumbMenu, MenuItem } from 'app/shared/services/navigation/navigation-config';
import { NavigationService } from 'app/shared/services/navigation/navigation.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  public menuItems: BreadcrumbMenu[] = [];
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  
  constructor(private _breadcrumbService: BreadcrumbService, private router: Router) { }

  ngOnInit(): void {

    this._breadcrumbService.sideMenuItems$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((data: MenuItem[]) => {
        this.menuItems = []
        
        if(data) {
          let menuItem = data.find((item) => this.router.url.indexOf(item.route) > -1);
          //let menuItem = data.find((item) => this.router.url == item.route);
          if(menuItem) {
            this.generateBreadcrumbMenu(menuItem);
          } else {
            this.generateBreadcrumbMenu(data[0]);
          }
        } 
      });
  }

  generateBreadcrumbMenu(menuItem: MenuItem): void {
    this.menuItems = [];
    if(!menuItem.disableBreadcrumb)
      this.menuItems.push({title: menuItem.breadcrumbTitle ?? menuItem.title, link: menuItem.route });
    while(menuItem.parentItem) {
      menuItem = menuItem.parentItem;
      
      if(!menuItem.disableBreadcrumb)
        this.menuItems.push({title: menuItem.breadcrumbTitle ?? menuItem.title, link: menuItem.route });
    }
    this.menuItems.reverse();
  }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
