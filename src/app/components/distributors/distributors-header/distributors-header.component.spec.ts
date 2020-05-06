import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorsHeaderComponent } from './distributors-header.component';

describe('DistributorsHeaderComponent', () => {
  let component: DistributorsHeaderComponent;
  let fixture: ComponentFixture<DistributorsHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributorsHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
