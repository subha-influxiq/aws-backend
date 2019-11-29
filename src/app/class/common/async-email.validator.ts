import { AbstractControl } from '@angular/forms';
import { HttpServiceService } from '../../services/http-service.service';

export class ValidateEmailNotTaken {
    static createValidator(httpService: HttpServiceService) {
        // return (control: AbstractControl) => {
        //     return httpService.checkingDuplicateEmail(control.value).map((res) => {
        //         if (res.data.length > 0) {
        //             return { emailTaken: false };
        //         } else {
        //             return { emailTaken: true };
        //         }
        //     });
        // };
    }
}