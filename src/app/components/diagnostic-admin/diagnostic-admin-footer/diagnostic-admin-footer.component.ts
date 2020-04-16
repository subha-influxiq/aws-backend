import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diagnostic-admin-footer',
  templateUrl: './diagnostic-admin-footer.component.html',
  styleUrls: ['./diagnostic-admin-footer.component.css']
})

export class DiagnosticAdminFooterComponent implements OnInit {

  public htmlData: any = {};
  constructor() { 
    this.htmlData["year"] = new Date().getFullYear();
  }

  ngOnInit() {
  }

}
