import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSettingTimeComponent } from './add-setting-time.component';

describe('AddSettingTimeComponent', () => {
  let component: AddSettingTimeComponent;
  let fixture: ComponentFixture<AddSettingTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSettingTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSettingTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
