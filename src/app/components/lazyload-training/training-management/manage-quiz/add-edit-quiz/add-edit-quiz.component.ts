import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-add-edit-quiz',
  templateUrl: './add-edit-quiz.component.html',
  styleUrls: ['./add-edit-quiz.component.css']
})
export class AddEditQuizComponent implements OnInit {
  public userData:any;
  public lessonIdInedit:any;
  public quizQuestionSingleDataList:any=[];
  public lessonId:any;
  public header_txt:any='Add Quiz';
  public serverDetails: any = {
    "serverUrl": "https://obq0e0nxhk.execute-api.us-east-1.amazonaws.com/production/api1/",
    "jwttoken": ""
  };
  
  public formSource: any = {
    "source":"quiz_question",
    "endpoint": "addorupdatelessonquestion",
    "showEndpoint":"datalist",
    "formTitleName": 'Training'
  }

  public listingPageRoute : any="/admin/training/manage-quiz/list/";
  public jwtToken:any
  constructor(public activatedRoute : ActivatedRoute,public cookie:CookieService) { 
    console.log(this.activatedRoute.snapshot.params.lesson_id_object);
    this.lessonIdInedit=this.activatedRoute.snapshot.params.lesson_id_object;
    this.lessonId = this.activatedRoute.snapshot.params.id;
    this.jwtToken = cookie.get('jwtToken');
    this.serverDetails.jwttoken=this.jwtToken;
    this.userData = JSON.parse(cookie.get('user_details'));
  }

  ngOnInit() {
    if(this.activatedRoute.snapshot.params._id){
      this.header_txt = 'Edit Quiz'
      this.activatedRoute.data.forEach(data => {
        let result: any;
        result = data.quizQuestionData.res;
        this.quizQuestionSingleDataList = result;
      })
    }
  }

}
