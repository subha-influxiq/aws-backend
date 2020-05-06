import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorsFooterComponent } from './distributors-footer.component';

describe('DistributorsFooterComponent', () => {
  let component: DistributorsFooterComponent;
  let fixture: ComponentFixture<DistributorsFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributorsFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorsFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
