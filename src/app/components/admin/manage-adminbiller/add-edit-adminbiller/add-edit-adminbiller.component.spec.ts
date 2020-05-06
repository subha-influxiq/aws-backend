import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAdminbillerComponent } from './add-edit-adminbiller.component';

describe('AddEditAdminbillerComponent', () => {
  let component: AddEditAdminbillerComponent;
  let fixture: ComponentFixture<AddEditAdminbillerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditAdminbillerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditAdminbillerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
