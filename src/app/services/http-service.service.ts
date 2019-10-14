import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

/* set common header */
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  private environment: any = "dev";
  private siteSettingData: any;
  public baseUrl:any="https://w8lauzoyaa.execute-api.us-east-1.amazonaws.com/dev/api/";

  constructor(private http: HttpClient) {
    // this.getSiteSettingData().subscribe(responce => {
    //   this.siteSettingData = responce;
    // });
   }
    /* read site setting data */
  public getSiteSettingData(url): Observable<any> {
    return this.http.get(url);
  }

  /* call api via post methord */
  httpViaPost(endpoint, jsonData): Observable<any> {
    return this.http.post(this.baseUrl + endpoint, jsonData);
  }

  /* call api via get methord */
  httpViaGet(endpoint, jsonData): Observable<any> {
    return this.http.get(this.baseUrl + endpoint, jsonData);
  }
}
