import { OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { MatSnackBar } from '@angular/material';
export declare class ForgetPasswordComponent implements OnInit {
    fb: FormBuilder;
    router: Router;
    apiService: ApiService;
    private snackBar;
    message: any;
    buttonNameValue: any;
    formDirective: FormGroupDirective;
    forgetPasswordForm: FormGroup;
    formTitleValue: any;
    serverUrlValue: any;
    signUpRouteingUrlValue: any;
    loginRouteingUrlValue: any;
    private domainUrlValue;
    addEndpointValue: any;
    logoValue: any;
    durationInSeconds: number;
    buttonName: any;
    domainUrl: any;
    formTitle: any;
    serverUrl: any;
    logo: any;
    addEndpoint: any;
    signUpRouteingUrl: any;
    loginRouteingUrl: any;
    constructor(fb: FormBuilder, router: Router, apiService: ApiService, snackBar: MatSnackBar);
    ngOnInit(): void;
    /********* Forget password  Form Submit start here*********/
    forgetPasswordSubmit(): void;
    /********* Forget password  Form Submit end here*********/
    /********* openSnackBar function open start here*********/
    openSnackBar(): void;
    /********* openSnackBar function open end here*********/
    signup(): void;
    login(): void;
    inputUntouched(val: any): void;
    customFunction(link: any): void;
}
export declare class snackBarComponent {
}
