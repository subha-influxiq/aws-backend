import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-admin-footer',
  templateUrl: './admin-footer.component.html',
  styleUrls: ['./admin-footer.component.css']
})
export class AdminFooterComponent implements OnInit {

  public htmlData: any = {};
  constructor() { 
    this.htmlData["year"] = new Date().getFullYear();
  }

  ngOnInit() {
  }
  // isSticky: boolean = false;

  // @HostListener('window:scroll', ['$event'])

  // checkScroll() {
  //   this.isSticky = window.pageYOffset >= 150;
    
  // }

}
