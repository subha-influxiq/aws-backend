import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditTrainingComponent } from './training-management/manage-training/add-edit-training/add-edit-training.component';
import { ListingTrainingComponent } from './training-management/manage-training/listing-training/listing-training.component';
import { AuthguardService } from 'src/app/services/authguard.service';
import { TrainingService } from 'src/app/services/training.service';


const routes: Routes = [

  {
    path:'manage-training/add',
    component:AddEditTrainingComponent
  },
  {
    path:'',
    component:AddEditTrainingComponent
  },

  {
    path:'manage-training/edit/:id',
    component:AddEditTrainingComponent
  },

  {
    path:'manage-training/list',
    component:ListingTrainingComponent,
    // canActivate: [AuthguardService],
    resolve: { trainingdata: TrainingService },
    data: {
      requestcondition: {
        source: '',
        condition: {'is_trash':{$ne:1}}
      },
      endpoint: 'gettrainingcategorydata'
    },
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA
],
})
export class TrainingRoutingModule { }
