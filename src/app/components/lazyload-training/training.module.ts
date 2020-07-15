import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingRoutingModule } from './training-routing.module';
import { AddEditTrainingComponent } from './training-management/manage-training/add-edit-training/add-edit-training.component';
import { ListingTrainingComponent } from './training-management/manage-training/listing-training/listing-training.component';
import { ListLessonComponent } from './training-management/manage-lesson/list-lesson/list-lesson.component';
import { AddEditLessonComponent } from './training-management/manage-lesson/add-edit-lesson/add-edit-lesson.component';
import { CommonTemplateModule } from '../../common-template/common-template.module';
import { TraningModule } from 'traning-lib-influxiq';
import { AddEditQuizComponent } from './training-management/manage-quiz/add-edit-quiz/add-edit-quiz.component';
import { ListQuizComponent } from './training-management/manage-quiz/list-quiz/list-quiz.component';
import { AddEditAnswerComponent } from './training-management/manage-quiz/add-edit-answer/add-edit-answer.component';
import { ListAnswerComponent } from './training-management/manage-quiz/list-answer/list-answer.component';


@NgModule({
  declarations: [ 
    AddEditTrainingComponent,

    ListingTrainingComponent,

    AddEditLessonComponent,

    ListLessonComponent,

    AddEditQuizComponent,

    ListQuizComponent,

    AddEditAnswerComponent,

    ListAnswerComponent,],
  imports: [
    CommonModule,
    TrainingRoutingModule,
    CommonTemplateModule,
    TraningModule
  ],
  exports: [
    // A11yModule,
    // FooterComponent,
    // HeaderComponent

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
  ],
})
export class TrainingModule { }
