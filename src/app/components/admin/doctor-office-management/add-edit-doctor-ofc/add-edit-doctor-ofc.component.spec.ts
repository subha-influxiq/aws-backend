import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDoctorOfcComponent } from './add-edit-doctor-ofc.component';

describe('AddEditDoctorOfcComponent', () => {
  let component: AddEditDoctorOfcComponent;
  let fixture: ComponentFixture<AddEditDoctorOfcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditDoctorOfcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditDoctorOfcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
