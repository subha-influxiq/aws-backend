import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditInsuranceComponent } from './add-edit-insurance.component';

describe('AddEditInsuranceComponent', () => {
  let component: AddEditInsuranceComponent;
  let fixture: ComponentFixture<AddEditInsuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditInsuranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
