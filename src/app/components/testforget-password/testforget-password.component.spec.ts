import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestforgetPasswordComponent } from './testforget-password.component';

describe('TestforgetPasswordComponent', () => {
  let component: TestforgetPasswordComponent;
  let fixture: ComponentFixture<TestforgetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestforgetPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestforgetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
