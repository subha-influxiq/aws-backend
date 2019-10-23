import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})

export class AdminHeaderComponent implements OnInit {

  public loader: boolean = true;

  constructor(public cookies: CookieService, public router: Router) { }

  ngOnInit() {
  }
  
  /**logout function start here**/
  logout() {
    this.cookies.deleteAll();
    setTimeout(() => {
      this.router.navigateByUrl('/login');
    }, 1000);
  }
  /**logout function end here**/

}
