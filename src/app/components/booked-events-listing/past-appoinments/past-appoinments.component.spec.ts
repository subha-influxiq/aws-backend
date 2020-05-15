import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastAppoinmentsComponent } from './past-appoinments.component';

describe('PastAppoinmentsComponent', () => {
  let component: PastAppoinmentsComponent;
  let fixture: ComponentFixture<PastAppoinmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastAppoinmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastAppoinmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
