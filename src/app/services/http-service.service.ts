import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class HttpServiceService {

  public baseUrl: any = environment.apiBaseUrl;
  public baseUrl1: any = environment.apiBaseUrl1;
  public calendarApiUrl: any = environment.calendarApi;
  public jwtToken: any = "";
  public training_url:any=environment.training_url;

  constructor(private http: HttpClient, public CookieService: CookieService) {
    this.jwtToken = this.CookieService.get('jwtToken');
  }

  /* read site setting data */
  public getSiteSettingData(url): Observable<any> {
    return this.http.get(url);
  }

  /* call api via post method */
  httpViaPost(endpoint, jsonData): Observable<any> {
    this.jwtToken = this.CookieService.get('jwtToken');

    /* set common header */
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.jwtToken
      })
    };
    return this.http.post(this.baseUrl + endpoint, jsonData);
  }

  /* call api via post method */
  httpViaPostbyApi1(endpoint, jsonData): Observable<any> {
    this.jwtToken = this.CookieService.get('jwtToken');

    /* set common header */
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.jwtToken
      })
    };
    return this.http.post(this.baseUrl1 + endpoint, jsonData);
  }

  //ip track api function
  getclientip() {
    var result = this.http.get("https://ipinfo.io/?format=json&token=9797c42b93078a").pipe(map(res => res));
    return result;
  }

  /* call api via get method */
  httpViaGet(endpoint, jsonData): Observable<any> {
    this.jwtToken = this.CookieService.get('jwtToken');

    /* set common header */
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.jwtToken
      })
    };
    return this.http.get(this.baseUrl + endpoint, jsonData);
  }


  /* call api via post method for calendar api */
  postRequest(endpoint, jsonData): Observable<any> {
    this.jwtToken = this.CookieService.get('jwtToken');

    /* set common header */
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.jwtToken
      })
    };
    return this.http.post(this.calendarApiUrl + endpoint, jsonData);
  }

  /* Resolve service */
  ResolveViaPost(requestdata: any, endpoint: any): Observable<any> {
    this.jwtToken = this.CookieService.get('jwtToken');

    /* set common header */
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.jwtToken
      })
    };
    requestdata['token'] = this.jwtToken;

    return this.http.post(this.baseUrl + endpoint, JSON.stringify(requestdata), httpOptions).pipe(map(res => res));
  }

  checkingDuplicateEmail(requestdata: any): Observable<any> {
    this.jwtToken = this.CookieService.get('jwtToken');
    let data: any = { "email": requestdata, "source": "users" };

    /* set common header */
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.CookieService.get('jwtToken')
      })
    };

    return this.http.post(this.baseUrl + 'duplicate-email-checking', JSON.stringify(data), httpOptions).pipe(map(res => res));
  }

  /* call api via get method */
  httpViaGetExt(url, jsonData): Observable<any> {
    this.jwtToken = this.CookieService.get('jwtToken');

    /* set common header */
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.jwtToken
      })
    };
    return this.http.get(url, jsonData);
  }

  getRequest(url, data) {
    return this.http.get(this.baseUrl + url, data);
  }

  get(url) {
    return this.http.get(url);
  }

  CustomRequest(requestdata: any, endpoint: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.jwtToken
      })
    };
    var result = this.http.post(this.training_url + endpoint, JSON.stringify(requestdata), httpOptions).pipe(map(res => res));
    return result;
  }

}


