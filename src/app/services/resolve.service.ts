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

    /* Condition for all dashboard */
    var allData: any = this.cookies.getAll();
    var userData = JSON.parse(allData.user_details)
    
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
        case 'manage-calender':
          if(route.url[2].path == 'manage-sehedule') {
            requestData.condition['userid'] = userData._id;
          }
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
        default:
          //requestData.condition['doctor_id_object'] = userData._id;
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

    /* This one is for Doctor Office Start */
    if(route.url[0].path == 'doctor-office') {
      switch(route.url[1].path) {
        case 'dashboard':
          requestData.condition['doctor_office_id'] = userData._id;
          break;
        case 'manage-appointments':
          requestData.condition['tech_id'] = userData.tech_id;
          requestData.condition['closeremail'] = userData.email;
          break;
      }
    }
    /* This one is for Doctor Office End */

    /* This one is for Diagnostic Admin Start */
    if(route.url[0].path == 'diagnostic-admin') {
      switch(route.url[1].path) {
        case 'dashboard':
          requestData.condition['diagnostic_admin_id'] = userData._id;
          break;
      }
      ;
    }
    /* This one is for Diagnostic Admin End */

    /* This one is for Doctor Group Start */
    if(route.url[0].path == 'doctor-group') {
      switch(route.url[1].path) {
        case 'dashboard':
          requestData.condition['doctor_group_id'] = userData._id;
          break;
      }
    }
    /* This one is for Doctor Group End */


    /* This one is for Distributors Start */
    if(route.url[0].path == 'distributors') {
      switch(route.url[1].path) {
        case 'dashboard':
          requestData.condition['distributors_id'] = userData._id;
          break;
      }
    }
    /* This one is for Distributors End */

    /* This one is for Sales Person Start */
    if(route.url[0].path == 'sales-person') {
      switch(route.url[1].path) {
        case 'dashboard':
          requestData.condition['sales_person_id'] = userData._id;
          break;
      }
    }
    /* This one is for Sales Person End */
    /////////////////////////////////////////////////////////////////////


    /* If send any query params */
    requestData.condition = Object.assign(requestData.condition, route.params);

    return new Promise((resolve) => {
      if(typeof route.data.requestcondition.source != 'string') {
        var returnData: any = {};

        for(let i = 0; i < route.data.requestcondition.source.length; i++) {
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
}
