import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-distributors-footer',
  templateUrl: './distributors-footer.component.html',
  styleUrls: ['./distributors-footer.component.css']
})
export class DistributorsFooterComponent implements OnInit {

  public htmlData: any = {};
  constructor() { 
    this.htmlData["year"] = new Date().getFullYear();
  }

  ngOnInit() {
  }

}
