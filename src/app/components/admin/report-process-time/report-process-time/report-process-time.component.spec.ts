import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportProcessTimeComponent } from './report-process-time.component';

describe('ReportProcessTimeComponent', () => {
  let component: ReportProcessTimeComponent;
  let fixture: ComponentFixture<ReportProcessTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportProcessTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportProcessTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
