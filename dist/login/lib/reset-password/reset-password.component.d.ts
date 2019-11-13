import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { MatSnackBar } from '@angular/material';
export declare class ResetPasswordComponent implements OnInit {
    fb: FormBuilder;
    http: HttpClient;
    router: Router;
    route: ActivatedRoute;
    apiService: ApiService;
    private snackBar;
    formDirective: FormGroupDirective;
    resetPasswordForm: FormGroup;
    fromTitleNameValue: any;
    serverUrlValue: any;
    message: any;
    addEndpointValue: any;
    logoValue: any;
    durationInSeconds: number;
    fromTitleName: any;
    serverUrl: any;
    addEndpoint: any;
    logo: any;
    accesscode: string;
    constructor(fb: FormBuilder, http: HttpClient, router: Router, route: ActivatedRoute, apiService: ApiService, snackBar: MatSnackBar);
    ngOnInit(): void;
    machpassword(passwordkye: string, confirmpasswordkye: string): (group: FormGroup) => void;
    /********* Reset Password Form Submit start here*********/
    resetPasswordSubmit(): void;
    openSnackBar(): void;
    /********* Reset Password Form Submit end here*********/
    inputUntouched(val: any): void;
}
export declare class snackBarResetComponent {
}
