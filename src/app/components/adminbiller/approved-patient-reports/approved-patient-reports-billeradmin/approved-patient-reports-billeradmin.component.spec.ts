import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedPatientReportsBilleradminComponent } from './approved-patient-reports-billeradmin.component';

describe('ApprovedPatientReportsBilleradminComponent', () => {
  let component: ApprovedPatientReportsBilleradminComponent;
  let fixture: ComponentFixture<ApprovedPatientReportsBilleradminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedPatientReportsBilleradminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedPatientReportsBilleradminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
