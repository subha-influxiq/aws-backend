import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-biller-footer',
  templateUrl: './biller-footer.component.html',
  styleUrls: ['./biller-footer.component.css']
})
export class BillerFooterComponent implements OnInit {

  public htmlData: any = {};
  constructor() { 
    this.htmlData["year"] = new Date().getFullYear();
  }

  ngOnInit() {
  }

}
