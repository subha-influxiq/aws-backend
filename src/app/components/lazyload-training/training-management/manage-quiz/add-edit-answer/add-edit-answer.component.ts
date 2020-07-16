import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from "../../../../../../environments/environment";

@Component({
  selector: 'app-add-edit-answer',
  templateUrl: './add-edit-answer.component.html',
  styleUrls: ['./add-edit-answer.component.css']
})
export class AddEditAnswerComponent implements OnInit {

  public header_txt: any = 'Add Answer'
  public userData: any;
  public paramsId: any;
  public lessonId: any;
  public listingPageRoute: any = "/admin/training/manage-quiz/list/";


  public serverDetails: any = {
    "serverUrl": environment.training_url,
    "jwttoken": ""
  };
  
  public formSource: any = {
    "source": 'quiz_answer',
    "endpoint": "addorupdatelessonanswer",
    "showEndpoint": "datalist",
    "AddheaderText": "Add Training",
    "EditheaderText": "Edit Training",
    "formTitleName": 'Training'
  }

  public dnaFlag: any = true;
  public jwtToken: any;

  constructor(public activatedRoute: ActivatedRoute, public cookie: CookieService) {
    this.paramsId = activatedRoute.snapshot.params.id;
    this.lessonId = activatedRoute.snapshot.params.lessonid;
    this.jwtToken = cookie.get('jwtToken');
    this.serverDetails.jwttoken = this.jwtToken;
    this.userData = JSON.parse(cookie.get('user_details'));

  }

  ngOnInit() {
  }
}
