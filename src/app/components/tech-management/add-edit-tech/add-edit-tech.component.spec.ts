import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTechComponent } from './add-edit-tech.component';

describe('AddEditTechComponent', () => {
  let component: AddEditTechComponent;
  let fixture: ComponentFixture<AddEditTechComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditTechComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
