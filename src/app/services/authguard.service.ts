import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class AuthguardService implements CanActivate {

  constructor(public cookie: CookieService, private _router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    var getToken = this.cookie.get('jwtToken');
    if (getToken) {
      var allData: any = this.cookie.getAll();
      // allData['user_details'] = JSON.stringify(allData);
      console.log('////////',allData);
      // var user_details = JSON.stringify(allData.user_details);
      // console.log('++++++++++++++++',user_details);
      var userData: any = JSON.parse(allData.user_type);
      /* Login User */
      switch (next.url[0].path) {
        case 'login':
        case 'forget-password':
          this._router.navigate([userData.replace("_", "-") + '/dashboard']);
          break;
        default:
          if (userData == 'doctor_office' && next.url[0].path == 'doctor-office') {
            return true;
          } else {
            if (userData == 'diagnostic_admin' && next.url[0].path == 'diagnostic-admin') {
              return true;
            } else {
              if (userData == 'sales_person' && next.url[0].path == 'sales-person') {
                return true;
              } else {
                if (userData == 'doctor_group' && next.url[0].path == 'doctor-group') {
                  return true;
                } else {
                  if (userData == 'admin_biller' && next.url[0].path == 'admin-biller') {
                    return true;
                  } else {
                    if (next.url[0].path == userData) {
                      return true;
                    } else {
                      this._router.navigate([userData.replace("_", "-") + '/dashboard']);
                    }
                  }
                }
              }
            }
          }
          break;
      }
    } else {
      /* Login User */
      switch (next.url[0].path) {
        case 'login':
        case 'forget-password':
          return true;
          break;
        default:
          this._router.navigate(['/login']);
          break;
      }
    }
  }
}
