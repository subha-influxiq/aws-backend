import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-tech-header',
  templateUrl: './tech-header.component.html',
  styleUrls: ['./tech-header.component.css']
})

export class TechHeaderComponent implements OnInit {

  public loader: boolean = true;

  constructor(public cookies: CookieService, public router: Router) { }

  ngOnInit() {
  }
  
  /**logout function start here**/
  logout() {
    this.cookies.deleteAll();
    this.router.navigateByUrl('/login');
  }
  /**logout function end here**/

}
