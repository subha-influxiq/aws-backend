import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorGroupFooterComponent } from './doctor-group-footer.component';

describe('DoctorGroupFooterComponent', () => {
  let component: DoctorGroupFooterComponent;
  let fixture: ComponentFixture<DoctorGroupFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorGroupFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorGroupFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
