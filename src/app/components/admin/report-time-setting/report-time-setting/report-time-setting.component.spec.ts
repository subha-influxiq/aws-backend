import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTimeSettingComponent } from './report-time-setting.component';

describe('ReportTimeSettingComponent', () => {
  let component: ReportTimeSettingComponent;
  let fixture: ComponentFixture<ReportTimeSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportTimeSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTimeSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
