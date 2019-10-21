import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class HttpServiceService {
  private environment: any = "dev";
  private siteSettingData: any;
  public baseUrl: any = "https://w8lauzoyaa.execute-api.us-east-1.amazonaws.com/dev/api/";

  constructor(private http: HttpClient, public CookieService: CookieService) {
    // this.getSiteSettingData().subscribe(responce => {
    //   this.siteSettingData = responce;
    // });
  }
  /* read site setting data */
  public getSiteSettingData(url): Observable<any> {
    return this.http.get(url);
  }

  /* call api via post method */
  httpViaPost(endpoint, jsonData): Observable<any> {
    /* set common header */
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.CookieService.get('jwtToken')
      })
    };
    return this.http.post(this.baseUrl + endpoint, jsonData);
  }
<<<<<<< HEAD

  /* call api via get method */

=======
  /* call api via get methord */
>>>>>>> dd9a8f932113e53681991b20f316f5c40f6044cd
  httpViaGet(endpoint, jsonData): Observable<any> {
    /* set common header */
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.CookieService.get('jwtToken')
      })
    };
    return this.http.get(this.baseUrl + endpoint, jsonData);
  }

  /* Resolve service */
  ResolveViaPost(requestdata: any, endpoint: any): Observable<any> {
    /* set common header */
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.CookieService.get('jwtToken')
      })
    };

    return this.http.post(this.baseUrl + endpoint, JSON.stringify(requestdata), httpOptions).pipe(map(res => res));
  }


}


