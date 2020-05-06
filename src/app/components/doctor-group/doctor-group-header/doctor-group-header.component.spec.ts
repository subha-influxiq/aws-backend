import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorGroupHeaderComponent } from './doctor-group-header.component';

describe('DoctorGroupHeaderComponent', () => {
  let component: DoctorGroupHeaderComponent;
  let fixture: ComponentFixture<DoctorGroupHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorGroupHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorGroupHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
