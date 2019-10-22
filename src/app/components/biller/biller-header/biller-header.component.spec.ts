import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillerHeaderComponent } from './biller-header.component';

describe('BillerHeaderComponent', () => {
  let component: BillerHeaderComponent;
  let fixture: ComponentFixture<BillerHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillerHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
