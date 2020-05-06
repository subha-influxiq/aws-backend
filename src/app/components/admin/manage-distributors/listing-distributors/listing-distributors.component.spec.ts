import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingDistributorsComponent } from './listing-distributors.component';

describe('ListingDistributorsComponent', () => {
  let component: ListingDistributorsComponent;
  let fixture: ComponentFixture<ListingDistributorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingDistributorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingDistributorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
