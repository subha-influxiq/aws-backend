import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPatientinformationComponent } from './add-edit-patientinformation.component';

describe('AddEditPatientinformationComponent', () => {
  let component: AddEditPatientinformationComponent;
  let fixture: ComponentFixture<AddEditPatientinformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditPatientinformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditPatientinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
