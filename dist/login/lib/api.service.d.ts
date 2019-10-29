import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
export declare class ApiService {
    private _http;
    private _authHttp;
    private cookieService;
    lengthis: any;
    percentageis: any;
    inprogress: any;
    progress: any;
    uploadtype: any;
    uploaderror: any;
    accesstoken: any;
    fileservername: any;
    serverUrl: any;
    addendpointUrl: any;
    uploadEndpointUrl: any;
    updateendpointUrl: any;
    deletesingle_endpointUrl: any;
    updatestatus_single_endpointUrl: any;
    deletemultiple_endpointUrl: any;
    updatestatus_multiple_endpointUrl: any;
    getdata_endpointUrl: any;
    private subjectForServerUrl;
    private subjectForaddEndpointUrl;
    private subjectForuploadEndpointUrl;
    private subjectForupdateEndpointUrl;
    private subjectFordeletesingleEndpointUrl;
    private subjectForupdatestatusSingleEndpointUrl;
    private subjectForGetdataEndpointUrl;
    subscriptionServer: Subscription;
    subscriptionaddEndpoint: Subscription;
    subscriptionuploadEndpoint: Subscription;
    subscriptionupdateEndpoint: Subscription;
    subscriptiondeletesingleEndpoint: Subscription;
    subscriptionupdatestatusSingleEndpoint: Subscription;
    subscriptionGetdataEndpoint: Subscription;
    constructor(_http: HttpClient, _authHttp: HttpClient, cookieService: CookieService);
    setServerUrl(value: any): void;
    clearServerUrl(): void;
    getServerUrl(): Observable<any>;
    setaddEndpoint(value: any): void;
    clearaddEndpoint(): void;
    getaddEndpoint(): Observable<any>;
    /*****added by souresh******/
    setuploadEndpont(value: any): void;
    clearuploadEndpoint(): void;
    getuploadEndpoint(): Observable<any>;
    /********souresh end here********/
    setupdateEndpoint(value: any): void;
    clearupdateEndpoint(): void;
    getupdateEndpoint(): Observable<any>;
    setdeletesingleEndpoint(value: any): void;
    cleardeletesingleEndpoint(): void;
    getdeletesingleEndpoint(): Observable<any>;
    setupdatestatus_singleEndpoint(value: any): void;
    clearupdatestatus_singleEndpoint(): void;
    getupdatestatus_singleEndpoint(): Observable<any>;
    setgetdataEndpoint(value: any): void;
    cleargetdataEndpoint(): void;
    getdataEndpoint(): Observable<any>;
    isTokenExpired(): void;
    addData(requestdata: any): Observable<Object>;
    /*******added by souresh************/
    uploadFile(requestdata: any): Observable<Object>;
    /*******souresh end here********/
    UpdateData(requestdata: any): Observable<Object>;
    getData(requestdata: any): Observable<Object>;
    /*************** Added by himadri start here ***************/
    addLogin(requestdata: any): Observable<Object>;
    /*************** Added by himadri end here ***************/
    /*************** Added by himadri start here ***************/
    forgetPassword(requestdata: any): Observable<Object>;
    /*************** Added by himadri end here ***************/
    deleteSingleData(requestdata: any): Observable<Object>;
    deleteMultipleData(requestdata: any): Observable<Object>;
    UpdateStatusForSingleData(requestdata: any): Observable<Object>;
    UpdateStatusForMultipleData(requestdata: any): Observable<Object>;
    CustomRequest(requestdata: any, endpoint: any): Observable<Object>;
}
