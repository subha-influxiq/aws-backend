import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSalesPersonComponent } from './add-edit-sales-person.component';

describe('AddEditSalesPersonComponent', () => {
  let component: AddEditSalesPersonComponent;
  let fixture: ComponentFixture<AddEditSalesPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditSalesPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditSalesPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
