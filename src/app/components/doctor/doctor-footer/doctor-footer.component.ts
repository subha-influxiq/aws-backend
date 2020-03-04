import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor-footer',
  templateUrl: './doctor-footer.component.html',
  styleUrls: ['./doctor-footer.component.css']
})
export class DoctorFooterComponent implements OnInit {

  public htmlData: any = {};
  constructor() { 
    this.htmlData["year"] = new Date().getFullYear();
  }

  ngOnInit() {
  }

}
