import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsignupComponent } from './testsignup.component';

describe('TestsignupComponent', () => {
  let component: TestsignupComponent;
  let fixture: ComponentFixture<TestsignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
