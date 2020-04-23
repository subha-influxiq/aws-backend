import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingPatientinformationComponent } from './listing-patientinformation.component';

describe('ListingPatientinformationComponent', () => {
  let component: ListingPatientinformationComponent;
  let fixture: ComponentFixture<ListingPatientinformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingPatientinformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingPatientinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
