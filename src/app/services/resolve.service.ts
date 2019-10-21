import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { HttpServiceService } from './http-service.service';

export interface EndpointComponent {
    endpoint: string;
}

@Injectable({
  providedIn: 'root'
})

export class ResolveService implements Resolve<any> {

  constructor(private _apiService: HttpServiceService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    / will come into play while editing otherwise no effect /
    let requestData: any = route.data.requestcondition;
    requestData.condition = Object.assign(requestData.condition, route.params);

    return new Promise((resolve) => {
      if(typeof route.data.requestcondition.source != 'string') {
        let returnData: any = {};

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

        return resolve(returnData);
      } else {
        console.log("-------------");
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
