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
    requestData.condition = Object.assign(requestData.condition, route.params);

    /* This one is for Tech Dashboard Start */
    if(route.url[0].path == 'tech' && route.url[1].path == 'dashboard') {
      var allData: any = this.cookies.getAll();
      var userData = JSON.parse(allData.user_details);
      requestData.condition['user_id_object'] = userData._id;
    }
    /* This one is for Tech Dashboard End */

    /* This one is for Doctor Dashboard Start */
    if(route.url[0].path == 'doctor' && route.url[1].path == 'dashboard') {
      var allData: any = this.cookies.getAll();
      var userData = JSON.parse(allData.user_details);
      // requestData.condition.condition['_id'] = userData._id;
      // requestData.condition.condition1['_id'] = userData._id;
    }
    /* This one is for Doctor Dashboard End */
    
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
            } else { // id not found
              return true;
            }
          });
        }

        setTimeout(() => {
          return resolve(returnData);
        }, 3000);
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
