import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDoctorgroupComponent } from './add-edit-doctorgroup.component';

describe('AddEditDoctorgroupComponent', () => {
  let component: AddEditDoctorgroupComponent;
  let fixture: ComponentFixture<AddEditDoctorgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditDoctorgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditDoctorgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
