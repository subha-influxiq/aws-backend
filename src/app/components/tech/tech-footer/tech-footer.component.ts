import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tech-footer',
  templateUrl: './tech-footer.component.html',
  styleUrls: ['./tech-footer.component.css']
})

export class TechFooterComponent implements OnInit {

  public htmlData: any = {};
  constructor() { 
    this.htmlData["year"] = new Date().getFullYear();
  }

  ngOnInit() {
  }

}
