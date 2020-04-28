import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorGroupDashboardComponent } from './doctor-group-dashboard.component';

describe('DoctorGroupDashboardComponent', () => {
  let component: DoctorGroupDashboardComponent;
  let fixture: ComponentFixture<DoctorGroupDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorGroupDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorGroupDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
