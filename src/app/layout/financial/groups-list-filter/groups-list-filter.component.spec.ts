import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsListFilterComponent } from './groups-list-filter.component';

describe('GroupsListFilterComponent', () => {
  let component: GroupsListFilterComponent;
  let fixture: ComponentFixture<GroupsListFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupsListFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
