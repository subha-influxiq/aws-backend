import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { HttpServiceService } from './http-service.service';
import { environment } from '../../environments/environment';
import { map, catchError, tap } from 'rxjs/operators';

export interface EndpointComponent {
    endpoint: string;
}

@Injectable({
  providedIn: 'root'
})

export class CalendarService implements Resolve<any> {

  constructor(private http: HttpClient, public cookies: CookieService, private _apiService: HttpServiceService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    
    /* will come into play while editing otherwise no effect */
    var requestData: any = route.data.requestcondition;

    /* Condition for all dashboard */
    var allData: any = this.cookies.getAll();
    var userData = JSON.parse(allData.user_details);
    
    return new Promise((resolve) => {
      if(typeof route.data.requestcondition.source != 'string') {
        var returnData: any = {};

        for(let i = 0; i <= route.data.requestcondition.source.length - 1; i++) {
          let data: any = {
            source: route.data.requestcondition.source[i],
            condition: {}
          };

          this.ResolveViaPost(data, route.data.endpoint).subscribe(api_object => {
            if (api_object) {
              returnData[route.data.requestcondition.source[i]] = api_object;
              return resolve(returnData);
            } else { // id not found
              return true;
            }
          });
        }
      } else {
        /* If endpoint is 'view-event-eventdayarr' then include 'timezone' with data */
        if (route.data.endpoint == 'view-event-eventdayarr' && this.cookies.check('timezone')) {
          route.data.requestcondition.timezone = this.cookies.get('timezone');
        }

        /* If user is not an admin */
        // if (this.cookies.check('user_details') &&
        //   JSON.parse(this.cookies.get('user_details')).user_type != 'admin') {

        //   route.data.requestcondition.condition = Object.assign(
        //     route.data.requestcondition.condition, {useremail: JSON.parse(this.cookies.get('user_details')).email}
        //   );

        // }

        this._apiService.ResolveViaPost(route.data.requestcondition, route.data.endpoint).subscribe(api_object => {
          if (api_object) {
            return resolve(api_object);
          } else { // id not found
            return true;
          }
        });
      }
    });
  }

  ResolveViaPost(requestdata: any, endpoint: any): Observable<any> {
    var jwtToken = this.cookies.get('jwtToken');

    /* set common header */
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': jwtToken
      })
    };
    requestdata['token'] = jwtToken;

    return this.http.post(environment.calendarApi + endpoint, JSON.stringify(requestdata), httpOptions).pipe(map(res => res));
  }

}

