import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CptValidateReportSalesPersonComponent } from './cpt-validate-report-sales-person.component';

describe('CptValidateReportSalesPersonComponent', () => {
  let component: CptValidateReportSalesPersonComponent;
  let fixture: ComponentFixture<CptValidateReportSalesPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CptValidateReportSalesPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CptValidateReportSalesPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
