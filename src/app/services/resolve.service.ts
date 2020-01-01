import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { HttpServiceService } from './http-service.service';

export interface EndpointComponent {
    endpoint: string;
}

@Injectable({
  providedIn: 'root'
})

export class ResolveService implements Resolve<any> {

  constructor(public cookies: CookieService, private _apiService: HttpServiceService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    
    /* will come into play while editing otherwise no effect */
    var requestData: any = route.data.requestcondition;


    ////////////////// Condition for all dashboard ////////////////////
    var allData: any = this.cookies.getAll();
    var userData = JSON.parse(allData.user_details);
    /* This one is for Tech Dashboard Start */
    if(route.url[0].path == 'admin') {
      switch(route.url[1].path) {
        case 'dashboard':
          requestData.condition['admin_id'] = userData._id;
          break;
      }
    }
    /* This one is for Tech Dashboard End */
    
    /* This one is for Tech Dashboard Start */
    if(route.url[0].path == 'tech') {
      switch(route.url[1].path) {
        case 'dashboard':
          requestData.condition['tech_id'] = userData._id;
          break;
      }
    }
    /* This one is for Tech Dashboard End */

    /* This one is for Doctor Dashboard Start */
    if(route.url[0].path == 'doctor') {
      switch(route.url[1].path) {
        case 'dashboard':
          requestData.condition['doctor_id'] = userData._id;
          break;
      }
    }
    /* This one is for Doctor Dashboard End */

    /* This one is for Biller Dashboard Start */
    if(route.url[0].path == 'biller') {
      switch(route.url[1].path) {
        case 'dashboard':
          requestData.condition['biller_id'] = userData._id;
          break;
      }
    }
    /* This one is for Biller Dashboard End */
    /////////////////////////////////////////////////////////////////////

    /* If send any query params */
    requestData.condition = Object.assign(requestData.condition, route.params);

    return new Promise((resolve) => {
      if(typeof route.data.requestcondition.source != 'string') {
        var returnData: any = {};

        for(let i = 0; i <= route.data.requestcondition.source.length - 1; i++) {
          let data: any = {
            source: route.data.requestcondition.source[i],
            condition: {}
          };

          this._apiService.ResolveViaPost(data, route.data.endpoint).subscribe(api_object => {
            if (api_object) {
              returnData[route.data.requestcondition.source[i]] = api_object;
              return resolve(returnData);
            } else { // id not found
              return true;
            }
          });
        }
      } else {
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
}
