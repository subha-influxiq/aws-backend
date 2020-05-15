import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminbillerHeaderComponent } from './adminbiller-header.component';

describe('AdminbillerHeaderComponent', () => {
  let component: AdminbillerHeaderComponent;
  let fixture: ComponentFixture<AdminbillerHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminbillerHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminbillerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
