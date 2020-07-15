import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-list-quiz',
  templateUrl: './list-quiz.component.html',
  styleUrls: ['./list-quiz.component.css']
})
export class ListQuizComponent implements OnInit {
  public userData: any;
  public quizQuestionList: any = [];
  public addPageRoute: any = "/admin/training/manage-quiz/add/";
  public lessonPageRoute: any = "/admin/training/manage-lesson/list";
  public editPageRoute: any = "/admin/training/manage-quiz/edit/";
  public paramsId: any;
  // public updateAnswerRoute:any="/manage-quiz/update-answer/";
  public serverDetails: any = {
    "serverUrl": "https://obq0e0nxhk.execute-api.us-east-1.amazonaws.com/production/api1/",
    "jwttoken": ""
  };
  public formSource: any = {
    "source": 'quiz_question',
    "endpoint": "lessonquestiondelete",
    "searchEndpoint": "datalist",
    "statusUpdateEndpoint": "questionstatusupdate",
    "statusUpdateSourceName": "quiz_question",
  }
  public addUpdateAnswerRoute: any = {
    "addAnswerRoute": "/admin/training/manage-quiz/add-answer/",
    "updateAnswerRoute": "/admin/training/manage-quiz/update-answer/"
  }
  public jwtToken: any;

  constructor(public activatedRoute: ActivatedRoute, public cookie: CookieService) {
    this.paramsId = this.activatedRoute.snapshot.params.lesson_id;
    console.log("lesson id", this.paramsId);
    this.jwtToken = cookie.get('jwtToken');
    this.serverDetails.jwttoken = this.jwtToken;
    this.userData = JSON.parse(cookie.get('user_details'));

  }

  ngOnInit() {
    this.activatedRoute.data.forEach(data => {
      let result: any;
      result = data.trainingdata.res;
      this.quizQuestionList = result;
    })
  }

}
