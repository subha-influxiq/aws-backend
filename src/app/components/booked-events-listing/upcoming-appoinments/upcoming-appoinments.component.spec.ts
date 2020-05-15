import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingAppoinmentsComponent } from './upcoming-appoinments.component';

describe('UpcomingAppoinmentsComponent', () => {
  let component: UpcomingAppoinmentsComponent;
  let fixture: ComponentFixture<UpcomingAppoinmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpcomingAppoinmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingAppoinmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
