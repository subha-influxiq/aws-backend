import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginDotorByAdminComponent } from './login-dotor-by-admin.component';

describe('LoginDotorByAdminComponent', () => {
  let component: LoginDotorByAdminComponent;
  let fixture: ComponentFixture<LoginDotorByAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginDotorByAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginDotorByAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
