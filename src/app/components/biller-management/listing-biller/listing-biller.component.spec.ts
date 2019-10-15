import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingBillerComponent } from './listing-biller.component';

describe('ListingBillerComponent', () => {
  let component: ListingBillerComponent;
  let fixture: ComponentFixture<ListingBillerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingBillerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingBillerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
