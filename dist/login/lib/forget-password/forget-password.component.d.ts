import { OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormGroupDirective } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
export declare class ForgetPasswordComponent implements OnInit {
    fb: FormBuilder;
    private http;
    router: Router;
    apiService: ApiService;
    message: any;
    formDirective: FormGroupDirective;
    forgetPasswordForm: FormGroup;
    formTitleValue: any;
    serverUrlValue: any;
    signUpRouteingUrlValue: any;
    private domanUrlValue;
    addEndpointValue: any;
    logoValue: any;
    domanUrl: any;
    formTitle: any;
    serverUrl: any;
    logo: any;
    addEndpoint: any;
    signUpRouteingUrl: any;
    constructor(fb: FormBuilder, http: HttpClient, router: Router, apiService: ApiService);
    ngOnInit(): void;
    /********* Forget password  Form Submit start here*********/
    forgetPasswordSubmit(): void;
    /********* Forget password  Form Submit end here*********/
    signup(): void;
    inputUntouched(val: any): void;
}
