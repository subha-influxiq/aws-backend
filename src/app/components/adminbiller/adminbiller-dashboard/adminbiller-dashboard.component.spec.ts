import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminbillerDashboardComponent } from './adminbiller-dashboard.component';

describe('AdminbillerDashboardComponent', () => {
  let component: AdminbillerDashboardComponent;
  let fixture: ComponentFixture<AdminbillerDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminbillerDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminbillerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
