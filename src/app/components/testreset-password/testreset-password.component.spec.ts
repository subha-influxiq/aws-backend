import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestresetPasswordComponent } from './testreset-password.component';

describe('TestresetPasswordComponent', () => {
  let component: TestresetPasswordComponent;
  let fixture: ComponentFixture<TestresetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestresetPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestresetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
