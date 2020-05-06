import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingDoctorgroupComponent } from './listing-doctorgroup.component';

describe('ListingDoctorgroupComponent', () => {
  let component: ListingDoctorgroupComponent;
  let fixture: ComponentFixture<ListingDoctorgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingDoctorgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingDoctorgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
