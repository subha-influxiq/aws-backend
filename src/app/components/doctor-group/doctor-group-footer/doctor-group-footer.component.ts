import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor-group-footer',
  templateUrl: './doctor-group-footer.component.html',
  styleUrls: ['./doctor-group-footer.component.css']
})
export class DoctorGroupFooterComponent implements OnInit {

  public htmlData: any = {};
  constructor() { 
    this.htmlData["year"] = new Date().getFullYear();
  }

  ngOnInit() {
  }

}
