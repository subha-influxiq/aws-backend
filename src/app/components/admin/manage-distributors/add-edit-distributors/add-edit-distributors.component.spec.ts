import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDistributorsComponent } from './add-edit-distributors.component';

describe('AddEditDistributorsComponent', () => {
  let component: AddEditDistributorsComponent;
  let fixture: ComponentFixture<AddEditDistributorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditDistributorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditDistributorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
