import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorOfficeManagementComponent } from './doctor-office-management.component';

describe('DoctorOfficeManagementComponent', () => {
  let component: DoctorOfficeManagementComponent;
  let fixture: ComponentFixture<DoctorOfficeManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorOfficeManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorOfficeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
