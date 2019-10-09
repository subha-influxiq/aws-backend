import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillerDashboardComponent } from './biller-dashboard.component';

describe('BillerDashboardComponent', () => {
  let component: BillerDashboardComponent;
  let fixture: ComponentFixture<BillerDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillerDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
