import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBillerComponent } from './add-edit-biller.component';

describe('AddEditBillerComponent', () => {
  let component: AddEditBillerComponent;
  let fixture: ComponentFixture<AddEditBillerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditBillerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditBillerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
