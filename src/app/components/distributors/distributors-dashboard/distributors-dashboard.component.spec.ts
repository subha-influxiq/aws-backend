import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorsDashboardComponent } from './distributors-dashboard.component';

describe('DistributorsDashboardComponent', () => {
  let component: DistributorsDashboardComponent;
  let fixture: ComponentFixture<DistributorsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributorsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
