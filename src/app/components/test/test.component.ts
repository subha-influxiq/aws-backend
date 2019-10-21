import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})

export class TestComponent implements OnInit {
  
  public usersData: any = [];

  constructor(public activeRoute :ActivatedRoute) {
  }

  ngOnInit() {
    this.getResolveData();
  }

  /* Get resolve data */
  getResolveData() {
    this.activeRoute.data.forEach((data)=>{
      console.log(data);
      this.usersData = data.data.res;
    })
  }

}
