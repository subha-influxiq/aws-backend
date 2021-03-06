import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-list-answer',
  templateUrl: './list-answer.component.html',
  styleUrls: ['./list-answer.component.css']
})
export class ListAnswerComponent implements OnInit {

  public userData:any;

  public quizAnswerList : any=[];
  public serverDetails: any = {
    "serverUrl": environment.training_url,
    "jwttoken": ""
  };
  public formSource: any = {
    "source":"quiz_answer",
    "endpoint": "addorupdatedata",
    "deleteendpoint": "lessonanswerdatadelete",
    "showEndpoint":"datalist",
    "formTitleName": 'Training'
  }
  public jwtToken:any;
  
    constructor(public activatedRoute : ActivatedRoute,public cookie:CookieService) { 
      this.jwtToken = cookie.get('jwtToken');
      this.serverDetails.jwttoken=this.jwtToken;
    this.userData = JSON.parse(cookie.get('user_details'));

    }
  
    ngOnInit() {
      this.activatedRoute.data.forEach(data => {
        let result: any;
        result = data.quizQuestionData.res;
        this.quizAnswerList = result;
      })
    }
  
}
