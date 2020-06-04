import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedPatientReportsComponent } from './approved-patient-reports.component';

describe('ApprovedPatientReportsComponent', () => {
  let component: ApprovedPatientReportsComponent;
  let fixture: ComponentFixture<ApprovedPatientReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedPatientReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedPatientReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
