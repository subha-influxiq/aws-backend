import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingInsuranceComponent } from './listing-insurance.component';

describe('ListingInsuranceComponent', () => {
  let component: ListingInsuranceComponent;
  let fixture: ComponentFixture<ListingInsuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingInsuranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
