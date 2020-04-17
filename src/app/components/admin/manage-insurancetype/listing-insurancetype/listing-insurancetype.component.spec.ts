import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingInsurancetypeComponent } from './listing-insurancetype.component';

describe('ListingInsurancetypeComponent', () => {
  let component: ListingInsurancetypeComponent;
  let fixture: ComponentFixture<ListingInsurancetypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingInsurancetypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingInsurancetypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
