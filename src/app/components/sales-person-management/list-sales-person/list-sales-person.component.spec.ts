import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSalesPersonComponent } from './list-sales-person.component';

describe('ListSalesPersonComponent', () => {
  let component: ListSalesPersonComponent;
  let fixture: ComponentFixture<ListSalesPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSalesPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSalesPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
