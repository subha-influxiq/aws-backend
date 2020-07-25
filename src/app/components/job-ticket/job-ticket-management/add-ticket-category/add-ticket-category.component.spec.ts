import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTicketCategoryComponent } from './add-ticket-category.component';

describe('AddTicketCategoryComponent', () => {
  let component: AddTicketCategoryComponent;
  let fixture: ComponentFixture<AddTicketCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTicketCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTicketCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
