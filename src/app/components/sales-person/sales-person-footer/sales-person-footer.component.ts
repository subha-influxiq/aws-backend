import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales-person-footer',
  templateUrl: './sales-person-footer.component.html',
  styleUrls: ['./sales-person-footer.component.css']
})
export class SalesPersonFooterComponent implements OnInit {

  public htmlData: any = {};
  constructor() { 
    this.htmlData["year"] = new Date().getFullYear();
  }
  
  ngOnInit() {
  }

}
