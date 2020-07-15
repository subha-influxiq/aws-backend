import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-list-lesson',
  templateUrl: './list-lesson.component.html',
  styleUrls: ['./list-lesson.component.css']
})
export class ListLessonComponent implements OnInit {

  public manageLessionList : any=[];
  public userData:any;
  public isitdna:any=false;
  public manageTrainingList : any = [];
  public editPageRoute : any="/admin/training/manage-lesson/edit/";
  public addPageRoute : any="/admin/training/manage-lesson/add";
  public manageQuizRoute:any="/admin/training/manage-quiz/list/";
  public serverDetails: any = {
    "serverUrl": "https://obq0e0nxhk.execute-api.us-east-1.amazonaws.com/production/api1/",
    "jwttoken": ""
  };
  public formSource: any = {
    "source":'manage_lession',
    "endpoint": "lessondelete",
    "deleteManyEndpoint":"lessondeletemany",
    "searchEndpoint":"getlessondata",
    "associatedTrainingSourceName":"training_category_management",
    "statusUpdateEndpoint":"lessonstatusupdate",
    "statusUpdateManyEndpoint":"lessonstatusupdate",
    "statusUpdateSourceName":"manage_lession",
    "trashDataSource":"manage_lession_view",
    "retriveTrashDataEndpoint":"lessonrestoredata",
    "retriveTrashDataSourceName":"manage_lession",
    "trainingCountEndpoint" : "trainingcounts"
  }
  public jwtToken:any;
  public searchSourceName :any="manage_lession_view";
    constructor(public activatedRoute : ActivatedRoute,public cookie:CookieService) { 
      this.jwtToken = cookie.get('jwtToken');
      this.serverDetails.jwttoken=this.jwtToken;
      this.userData=JSON.parse(cookie.get('user_details'));
    }
  
    ngOnInit() {
      this.activatedRoute.data.forEach(data => {
        let result: any;
        result = data.lessionData.res;
        this.manageLessionList = result;      
      })
    }

}
