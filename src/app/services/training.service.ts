import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TrainingApiService } from './training-api.service';
import { CookieService } from 'ngx-cookie-service';

export interface EndpointComponent {
  endpoint: string;
}
@Injectable({
  providedIn: 'root'
})

// export class TrainingService {

//   constructor() { }
// }

export class TrainingService implements Resolve<any> {
  public allCookiesData: any;
  public cookiesData: any;
  public userType: any;
  public userId: any;
  public user_details: any;


  constructor(private _apiService: TrainingApiService, private router: Router, public cookiesService: CookieService) {
    // this.allCookiesData = cookiesService.getAll();
    //   this.cookiesData = JSON.parse(this.allCookiesData.user_details);
    //   this.userType=this.cookiesData.type;

    //   this.userId = this.cookiesData._id;
    //   this.userType=this.cookiesData.type;
    // console.log("routeee",this.acti);
    this.user_details = JSON.parse(this.cookiesService.get('user_details'));

    console.log(this.user_details, "....?")


    this.userType = this.user_details.user_type;
    this.userId = this.user_details._id;

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    /* will come into play while editing otherwise no effect */
    let requestData: any = route.data.requestcondition;
    requestData.condition = Object.assign(requestData.condition, route.params);
    if (route.url[0].path == "training-center") {
      requestData.condition['user_id'] = this.userId;
      requestData.condition['type'] = "admin";
    }

    // lesson plan 
    if (route.url[0].path == "lesson-plan-material") {
      // requestData.condition['lesson_id'] = this.userId;
      delete requestData.condition.associated_training;
      // requestData.condition['type'] = "admin";
    }


    if (route.url[0].path == "training-center-dna") {
      requestData.condition['associated_training'] = route.params.associated_training;
      requestData['user_id'] = this.userId;
      requestData['type'] = this.userType;
      //    requestData['type'] = "mentor";
      requestData['associated_training'] = route.params.associated_training;

    }
    if (route.url[0].path == "training-report") {
      if (this.userType == "admin") {

      }
      if (this.userType == "salesrep") {
        requestData.condition['user_id'] = this.userId;
      }
      if (this.userType == "user") {
        requestData.condition['user_id'] = this.userId;
      }
    }
    return new Promise((resolve) => {
      this._apiService.CustomRequest(route.data.requestcondition, route.data.endpoint).subscribe(api_object => {
        if (api_object) {
          return resolve(api_object);
        } else { // id not found
          return true;
        }
      });
    });
  }
}
