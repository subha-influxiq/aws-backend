import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor-office-footer',
  templateUrl: './doctor-office-footer.component.html',
  styleUrls: ['./doctor-office-footer.component.css']
})
export class DoctorOfficeFooterComponent implements OnInit {

  public htmlData: any = {};
  constructor() { 
    this.htmlData["year"] = new Date().getFullYear();
  }

  ngOnInit() {
  }

}
