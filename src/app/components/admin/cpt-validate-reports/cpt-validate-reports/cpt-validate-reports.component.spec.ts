import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CptValidateReportsComponent } from './cpt-validate-reports.component';

describe('CptValidateReportsComponent', () => {
  let component: CptValidateReportsComponent;
  let fixture: ComponentFixture<CptValidateReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CptValidateReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CptValidateReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
