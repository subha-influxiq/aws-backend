import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedAppoinmentsComponent } from './booked-appoinments.component';

describe('BookedAppoinmentsComponent', () => {
  let component: BookedAppoinmentsComponent;
  let fixture: ComponentFixture<BookedAppoinmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookedAppoinmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookedAppoinmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});