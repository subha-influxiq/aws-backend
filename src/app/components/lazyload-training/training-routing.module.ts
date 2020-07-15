import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditTrainingComponent } from './training-management/manage-training/add-edit-training/add-edit-training.component';
import { ListingTrainingComponent } from './training-management/manage-training/listing-training/listing-training.component';
import { AuthguardService } from 'src/app/services/authguard.service';
import { TrainingService } from 'src/app/services/training.service';
import { AddEditLessonComponent } from './training-management/manage-lesson/add-edit-lesson/add-edit-lesson.component';
import { ListLessonComponent } from './training-management/manage-lesson/list-lesson/list-lesson.component';
import { ListQuizComponent } from './training-management/manage-quiz/list-quiz/list-quiz.component';
import { AddEditQuizComponent } from './training-management/manage-quiz/add-edit-quiz/add-edit-quiz.component';
import { AddEditAnswerComponent } from './training-management/manage-quiz/add-edit-answer/add-edit-answer.component';
import { ListAnswerComponent } from './training-management/manage-quiz/list-answer/list-answer.component';


const routes: Routes = [

  // training category management route

  {
    path: 'manage-training/add',
    component: AddEditTrainingComponent
  },
  {
    path: '',
    component: AddEditTrainingComponent
  },

  {
    path: 'manage-training/edit/:id',
    component: AddEditTrainingComponent
  },

  {
    path: 'manage-training/list',
    component: ListingTrainingComponent,
    // canActivate: [AuthguardService],
    resolve: { trainingdata: TrainingService },
    data: {
      requestcondition: {
        source: '',
        condition: { 'is_trash': { $ne: 1 } }
      },
      endpoint: 'gettrainingcategorydata'
    },
  },

  //lesson management route

  {
    path: 'manage-lesson/add',
    component: AddEditLessonComponent
  },

  {
    path: 'manage-lesson/edit/:id',
    component: AddEditLessonComponent
  },

  {
    path: 'manage-lesson/list',
    component: ListLessonComponent,
    // canActivate: [AuthguardService],
    resolve: { lessionData: TrainingService },
    data: {
      requestcondition: {
        source: '',
        condition: { 'is_trash': { $ne: 1 } }
      },
      endpoint: 'getlessondata'
    },
  },

  //manage quiz route
  {
    path: 'manage-quiz/list/:lesson_id',
    component: ListQuizComponent,
    resolve: { trainingdata: TrainingService },
    data: {
      requestcondition:
      {
        source: '',
        condition: {}
      },
      endpoint: 'getlessonquestiondata'
    }
  },

  {
    path: 'manage-quiz/add/:id',
    component: AddEditQuizComponent
  },

  {
    path: 'manage-quiz/edit/:_id/:lesson_id_object',
    component: AddEditQuizComponent,
    resolve: { quizQuestionData: TrainingService },
    data: {
      requestcondition:
        { source: '', condition: {} },
      endpoint: 'getlessonquestiondatabyid'
    }
  },

  {
    path: 'manage-quiz/add-answer/:id/:lessonid',
    component: AddEditAnswerComponent
  },
  
  {
    path: 'manage-quiz/update-answer/:questionId',
    component: ListAnswerComponent,
    resolve: { quizQuestionData: TrainingService },
    data: {
      requestcondition:
        { source: '', condition: {} },
      endpoint: 'getlessonanswerdata'
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
  ],
})
export class TrainingRoutingModule { }
