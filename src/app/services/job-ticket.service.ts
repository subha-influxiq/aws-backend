import {ElementRef, EventEmitter, Injectable, Input, ViewChild} from '@angular/core';
import {switchMap, map, takeWhile, catchError} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
// for setting observables to get serverurl and endpointurl from app
import {Observable, Subject, Subscription, throwError} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {environment} from '../../environments/environment';
import {Router, ActivatedRoute} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import { url } from 'inspector';

@Injectable({
  providedIn: 'root'
})
export class JobTicketService {
 
  // public api_url = environment['api_url'];
  public api_url = "https://wfr9bu9th2.execute-api.us-east-1.amazonaws.com/dev/api1/";
  public api_url2 = environment['api_url_for_ip'];
  public domino_url = environment['domino_url'];
  public jwtToken = this.cookieService.get('jwtToken');
  public training_api_url: any = environment['training_api_url'];


  public fileimgsslurl: any;


  fileservername: any = [];
  serverUrl: any;
  addendpointUrl: any;
  uploadEndpointUrl: any; // souresh
  updateendpointUrl: any;
  deletesingle_endpointUrl: any;
  updatestatus_single_endpointUrl: any;
  deletemultiple_endpointUrl: any;
  updatestatus_multiple_endpointUrl: any;
  getdata_endpointUrl: any;
  public invalidApi: any;

  public tokenVal: any;

  constructor(private _http: HttpClient, private cookieService: CookieService, public router: Router, public activatedRoute: ActivatedRoute, private _snackBar: MatSnackBar) {
  // console.log("+++++++++",this.api_url)

  }

  isTokenExpired() {
  }

  /* read site setting data */
  public getSiteSettingData(url): Observable<any> {
    return this._http.get(url);
  }

  public getJsonData(url): Observable<any> {
    return this._http.get(url);
  }

// http by data and endpoint
  postDatawithoutToken(endpoint: any, data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',

      })
    };
    const result = this._http.post(this.api_url + endpoint, JSON.stringify(data), httpOptions).pipe(catchError((error) => {
      this.openSnackBar();
      return throwError(error);
    }), map(response => response));
    return result;
  }


  addDataApi1(requestdata: any) {
    // console.log('in adddata apiservice');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': this.cookieService.get('jwtToken')          //hard code written access-token(temp)
      })
    };
    const result = this._http.post(this.api_url + this.addendpointUrl, JSON.stringify(requestdata), httpOptions).pipe(catchError((error) => {
      this.openSnackBar();
      return throwError(error);
    }), map(response => response));
    return result;
  }

  /*************** Added by himadri start here ***************/


  getDataForDatalist(endpoint: any) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.cookieService.get('jwtToken')
      })
    };

    // this.isTokenExpired()
    const result = this._http.post(this.api_url + 'datalist', endpoint, httpOptions).pipe(catchError((error) => {
      this.openSnackBar();
      return throwError(error);
    }), map(response => response));
    return result;
  }

// getData end

  getDatalist(requestdata: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.cookieService.get('jwtToken')
      })
    };
    const result = this._http.post(this.api_url + requestdata.endpoint, JSON.stringify(requestdata), httpOptions).pipe(catchError((error) => {
      this.openSnackBar();
      return throwError(error);
    }), map(response => response));
    return result;

  }

  getDatalistforapi1(requestdata: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': this.cookieService.get('jwtToken')
      })
    };
    const result = this._http.post(this.api_url + requestdata.endpoint, JSON.stringify(requestdata), httpOptions).pipe(catchError((error) => {
      this.openSnackBar();
      return throwError(error);
    }), map(response => response));
    return result;

  }

  getDatalistWithToken(requestdata: any, endpoint: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const result = this._http.post(this.api_url + endpoint, JSON.stringify(requestdata), httpOptions).pipe(map(res => res));
    return result;
  }

  getTempToken() {
    const result = this._http.get(this.api_url + 'gettemptoken').pipe(catchError((error) => {
      this.openSnackBar();
      return throwError(error);
    }), map(response => response));
    return result;
  }

  /*************** Added by himadri end here ***************/

  getDatalistForResolve(requestdata: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.cookieService.get('jwtToken')
      })
    };
    // console.log(requestdata)

    const result = this._http.post(this.api_url + requestdata.endpoint, JSON.stringify(requestdata.requestcondition), httpOptions).pipe(catchError((error) => {
      this.openSnackBar();
      return throwError(error);
    }), map(response => response));
    return result;


  }


  getDataForResolve(requestdata: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    // console.log(requestdata)

    const result = this._http.post(this.api_url + requestdata.endpoint, JSON.stringify(requestdata.requestcondition), httpOptions).pipe(catchError((error) => {
      this.openSnackBar();
      return throwError(error);
    }), map(response => response));
    return result;
  }

  getDataForResolveAp1(requestdata: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    // console.log(requestdata)

    const result = this._http.post(this.api_url + requestdata.endpoint, JSON.stringify(requestdata.requestcondition), httpOptions).pipe(catchError((error) => {
      this.openSnackBar();
      return throwError(error);
    }), map(response => response));
    return result;
  }


  addLogin(requestdata: any) {
    // console.log('in addLogin apiservice');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        // 'Authorization': this.cookieService.get('jwtToken')          //hard code written access-token(temp)
      })
    };

    // console.log(this.serverUrl,requestdata);
    const result = this._http.post(this.serverUrl + this.addendpointUrl, JSON.stringify(requestdata), httpOptions).pipe(catchError((error) => {
      this.openSnackBar();
      return throwError(error);
    }), map(response => response));
    return result;
  }

  /*************** Added by himadri end here ***************/

  /*************** Added by himadri start here ***************/
  forgetPassword(requestdata: any) {
    // console.log('in forgetPassword apiservice');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        // 'Authorization': this.cookieService.get('jwtToken')          //hard code written access-token(temp)
      })
    };

    // console.log(this.serverUrl,requestdata);
    const result = this._http.post(this.serverUrl + this.addendpointUrl, JSON.stringify(requestdata), httpOptions).pipe(catchError((error) => {
      this.openSnackBar();
      return throwError(error);
    }), map(response => response));
    return result;
  }

  /*************** Added by himadri end here ***************/


  deleteSingleData(requestdata: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.cookieService.get('jwtToken')
      })
    };
    const result = this._http.post(this.api_url + this.deletesingle_endpointUrl, JSON.stringify(requestdata), httpOptions).pipe(catchError((error) => {
      this.openSnackBar();
      return throwError(error);
    }), map(response => response));
    return result;
  }

  deleteMultipleData(requestdata: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.cookieService.get('jwtToken')
      })
    };
    const result = this._http.post(this.serverUrl + this.deletesingle_endpointUrl + 'many', JSON.stringify(requestdata), httpOptions).pipe(catchError((error) => {
      this.openSnackBar();
      return throwError(error);
    }), map(response => response));
    return result;
  }

  UpdateStatusForSingleData(requestdata: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.cookieService.get('jwtToken')
      })
    };
    const result = this._http.post(this.serverUrl + this.updatestatus_single_endpointUrl, JSON.stringify(requestdata), httpOptions).pipe(catchError((error) => {
      this.openSnackBar();
      return throwError(error);
    }), map(response => response));
    return result;
  }

  UpdateStatusForMultipleData(requestdata: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.cookieService.get('jwtToken')
      })
    };
    const result = this._http.post(this.serverUrl + this.updatestatus_single_endpointUrl + 'many', JSON.stringify(requestdata), httpOptions).pipe(catchError((error) => {
      this.openSnackBar();
      return throwError(error);
    }), map(response => response));
    return result;
  }

  customRequest(requestdata: any, endpoint: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.cookieService.get('jwtToken')
      })
    };
    // console.log("sourav",url,endpoint);
    const result = this._http.post(this.api_url + endpoint, JSON.stringify(requestdata), httpOptions).pipe(catchError((error) => {
      this.openSnackBar();
      return throwError(error);
    }), map(response => response));
    return result;
  }

  customRequest1(requestdata: any, endpoint: any, url: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.cookieService.get('jwtToken')
      })
    };

    const result = this._http.post(this.api_url + endpoint, JSON.stringify(requestdata), httpOptions).pipe(catchError((error) => {
      this.openSnackBar();
      return throwError(error);
    }), map(response => response));
    return result;
  }


  addUpdateService(requestdata: any, endpoint: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const result = this._http.post(this.api_url + endpoint, JSON.stringify(requestdata), httpOptions).pipe(catchError((error) => {
      this.openSnackBar();
      return throwError(error);
    }), map(response => response));
    return result;
  }

  gettemptoken() {
    const result = this._http.get(this.api_url + 'gettemptoken').pipe(map(res => res));
    return result;
  }

  getJsonObject(path: any) {
    const result = this._http.get(path).pipe(catchError((error) => {
      this.openSnackBar();
      return throwError(error);
    }), map(response => response));
    return result;
  }

  /**add postData */
  postdata(requestdata: any) {
    // console.log('post Data');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        // 'Authorization': this.cookieService.get('jwtToken')          //hard code written access-token(temp)
      })
    };

    // console.log(this.serverUrl,requestdata);
    const result = this._http.post(this.serverUrl + this.addendpointUrl, JSON.stringify(requestdata), httpOptions).pipe(catchError((error) => {
      this.openSnackBar();
      return throwError(error);
    }), map(response => response));
    return result;
  }

  /**add addDataWithoutToken amitava 04-12-2019 */
  addDataWithoutToken(requestdata: any, endpoint: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const result = this._http.post(this.api_url + endpoint, JSON.stringify(requestdata), httpOptions).pipe(catchError((error) => {
      this.openSnackBar();
      return throwError(error);
    }), map(response => response));
    return result;
  }

  deleteSingleData1(requestdata: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.cookieService.get('jwtToken')
      })
    };
    const result = this._http.post(this.api_url + 'deletesingledata', JSON.stringify(requestdata), httpOptions).pipe(catchError((error) => {
      this.openSnackBar();
      return throwError(error);
    }), map(response => response));
    return result;
  }


  getDataForEndpoint(endpoint: any) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    // this.isTokenExpired()
    const result = this._http.get(this.api_url + endpoint, httpOptions).pipe(catchError((error) => {
      this.openSnackBar();
      return throwError(error);
    }), map(response => response));
    return result;
  }


  // api2 url section uttam //

  apiForIp(requestdata: any, endpoint: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'

      })
    };
    const result = this._http.post(this.api_url2 + endpoint, JSON.stringify(requestdata), httpOptions).pipe(catchError((error) => {
      this.openSnackBar();
      return throwError(error);
    }), map(response => response));
    return result;
  }

  getDataWithoutToken(requestdata: any, endpoint: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const result = this._http.post(this.api_url + endpoint, JSON.stringify(requestdata), httpOptions).pipe(catchError((error) => {
      this.openSnackBar();
      return throwError(error);
    }), map(response => response));
    return result;
  }


  getDataforAdminList(endpoint: any, requestdata: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.cookieService.get('jwtToken')
      })
    };
    const result = this._http.post(this.api_url + endpoint, JSON.stringify(requestdata), httpOptions).pipe(catchError((error) => {
      this.openSnackBar();
      return throwError(error);
    }), map(response => response));
    return result;
  }

  getData(endpoint: any, requestdata: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.cookieService.get('jwtToken')
      })
    };
    const result = this._http.post(this.api_url + endpoint, JSON.stringify(requestdata), httpOptions).pipe(catchError((error) => {
      this.openSnackBar();
      return throwError(error);
    }), map(response => response));
    return result;
  }


  getTrainingData(endpoint: any, requestdata: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.cookieService.get('jwtToken')
      })
    };
    const result = this._http.post(this.training_api_url + endpoint, JSON.stringify(requestdata), httpOptions).pipe(catchError((error) => {
      this.openSnackBar();
      return throwError(error);
    }), map(response => response));
    return result;
  }

  updatedata(requestdata: any, endpoint: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const result = this._http.post(this.api_url + endpoint, JSON.stringify(requestdata), httpOptions).pipe(catchError((error) => {
      this.openSnackBar();
      return throwError(error);
    }), map(response => response));
    return result;
  }

  getState() {
    const result = this._http.get('assets/data/states.json').pipe(catchError((error) => {
      this.openSnackBar();
      return throwError(error);
    }), map(response => response));
    return result;
  }


  // customRequest(requestdata: any, endpoint: any) {
  //   // const httpOptions = {
  //   //   headers: new HttpHeaders({
  //   //     'Content-Type': 'application/json',
  //   //     'Authorization': this.cookie.get('jwttoken')
  //   //   })
  //   // };
  //   if (this.cookieService.get('jwtToken') !=null && this.cookieService.get('jwtToken') !='') {
  //     var result = this._http.post( this.api_url+endpoint+'?token='+this.cookieService.get('jwtToken'), requestdata).pipe(catchError((error) => {this.openSnackBar(); return throwError(error);}),map(response => response));
  //     return result;
  //   }else{
  //     var result = this._http.post( this.api_url+endpoint, requestdata).pipe(catchError((error) => {this.openSnackBar(); return throwError(error);}),map(response => response));
  //     return result;
  //   }

  // }


  openSnackBar() {
    this._snackBar.open('Something Went Wrong ,Try Again!!', 'ok', {
      duration: 6000,
    });
  }
}
