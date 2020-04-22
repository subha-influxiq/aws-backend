import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditInsurancetypeComponent } from './add-edit-insurancetype.component';

describe('AddEditInsurancetypeComponent', () => {
  let component: AddEditInsurancetypeComponent;
  let fixture: ComponentFixture<AddEditInsurancetypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditInsurancetypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditInsurancetypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
