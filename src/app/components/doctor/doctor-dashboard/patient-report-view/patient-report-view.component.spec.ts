import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientReportViewComponent } from './patient-report-view.component';

describe('PatientReportViewComponent', () => {
  let component: PatientReportViewComponent;
  let fixture: ComponentFixture<PatientReportViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientReportViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientReportViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
