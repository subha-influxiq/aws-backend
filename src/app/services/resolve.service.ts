import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

export interface EndpointComponent {
  endpoint: string;
}


@Injectable({
  providedIn: 'root'
})
export class ResolveService {

  constructor( private router: Router) { }
}
