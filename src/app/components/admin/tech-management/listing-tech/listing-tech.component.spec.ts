import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingTechComponent } from './listing-tech.component';

describe('ListingTechComponent', () => {
  let component: ListingTechComponent;
  let fixture: ComponentFixture<ListingTechComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingTechComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
