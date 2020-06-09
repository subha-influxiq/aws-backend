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

  constructor(public http: HttpClient, private _apiService: HttpServiceService, private router: Router, private cookieService: CookieService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    /* will come into play while editing otherwise no effect */
    let requestData: any = route.data.requestcondition;
    //requestData.condition = Object.assign(requestData.condition, route.params);
    //requestData.condition = requestData.condition;
    return new Promise((resolve) => {
      if (typeof route.data.requestcondition.source != 'string') {
        let returnData: any = {};
        for (let i = 0; i <= route.data.requestcondition.source.length - 1; i++) {
          var data: any = {
            source: route.data.requestcondition.source[i],
            condition: {}
          };
          /* If endpoint is 'view-event-eventdayarr' then include 'timezone' with data */
          if (route.data.endpoint == 'view-event-eventdayarr' && this.cookieService.check('timezone')) {
            data.timezone = this.cookieService.get('timezone');
          }

          /* If endpoint is 'view-event-eventdayarr' and user is not an admin */
          if (route.data.endpoint == 'view-event-eventdayarr' && this.cookieService.check('user_details')) {
            data.condition = JSON.parse(this.cookieService.get('user_details')).email;
          }

          this.ResolveViaPost(data, route.data.endpoint).subscribe(api_object => {
            if (api_object) {
              returnData[route.data.requestcondition.source[i]] = api_object;
            } else { // id not found
              return true;
            }
          });
        }
        setTimeout(() => {
          return resolve(returnData);
        }, 3000);
      } else {
        /* If endpoint is 'view-event-eventdayarr' then include 'timezone' with data */
        if (route.data.endpoint == 'view-event-eventdayarr' && this.cookieService.check('timezone')) {
          route.data.requestcondition.timezone = this.cookieService.get('timezone');
        }

        /* If user is not an admin */
        if (this.cookieService.check('user_details') && JSON.parse(this.cookieService.get('user_details')).user_type == 'tech') {
          route.data.requestcondition.condition = Object.assign(
            route.data.requestcondition.condition, {userid: {$in: [JSON.parse(this.cookieService.get('user_details'))._id]}}
          );
          // route.data.requestcondition.condition.$or.push({userid: JSON.parse(this.cookieService.get('user_details'))._id});
        } else {
          route.data.requestcondition.condition = Object.assign(
            route.data.requestcondition.condition, {userid: {$in: JSON.parse(this.cookieService.get('user_details')).tech_id}}
          );
        }

        this.ResolveViaPost(route.data.requestcondition, route.data.endpoint).subscribe(api_object => {
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
    var jwtToken = this.cookieService.get('jwtToken');

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

