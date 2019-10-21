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

    let getToken = this.cookie.get('jwtToken');

    if (getToken) {
      return true;
    } else {
      this._router.navigate(['/login']);
    }
  }
}
