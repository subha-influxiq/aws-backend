import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditDoctorComponent } from './addedit-doctor.component';

describe('AddeditDoctorComponent', () => {
  let component: AddeditDoctorComponent;
  let fixture: ComponentFixture<AddeditDoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeditDoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeditDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
