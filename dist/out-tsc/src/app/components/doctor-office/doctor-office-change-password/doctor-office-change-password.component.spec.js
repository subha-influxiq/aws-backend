import { async, TestBed } from '@angular/core/testing';
import { DoctorOfficeChangePasswordComponent } from './doctor-office-change-password.component';
describe('DoctorOfficeChangePasswordComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DoctorOfficeChangePasswordComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(DoctorOfficeChangePasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=doctor-office-change-password.component.spec.js.map