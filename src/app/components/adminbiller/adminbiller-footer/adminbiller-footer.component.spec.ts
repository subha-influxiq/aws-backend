import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminbillerFooterComponent } from './adminbiller-footer.component';

describe('AdminbillerFooterComponent', () => {
  let component: AdminbillerFooterComponent;
  let fixture: ComponentFixture<AdminbillerFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminbillerFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminbillerFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
