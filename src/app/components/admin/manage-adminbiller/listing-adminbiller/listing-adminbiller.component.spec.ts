import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingAdminbillerComponent } from './listing-adminbiller.component';

describe('ListingAdminbillerComponent', () => {
  let component: ListingAdminbillerComponent;
  let fixture: ComponentFixture<ListingAdminbillerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingAdminbillerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingAdminbillerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
