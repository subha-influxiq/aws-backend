import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTicketCategoryComponent } from './job-ticket-management/add-ticket-category/add-ticket-category.component';
import { JobTicketCategoryListComponent } from './job-ticket-management/job-ticket-category-list/job-ticket-category-list.component';
import {JobTicketResolveService } from '../../services/job-ticket-resolve.service';

const routes: Routes = [
{
   path : 'add-jobticket-category',component : AddTicketCategoryComponent
  },
  {
    path : 'list-jobticket-category',component : JobTicketCategoryListComponent,
    resolve: { data: JobTicketResolveService},
    data: {
      requestcondition: {
        'condition': {
          'limit': 10, 'skip': 0
        },
        sort: {
          'type': 'desc', 'field': '_id'
        }
      },
      endpoint: 'getjobticketcategorylistdata'
    },
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
  ],
})
export class JobTicketRoutingModule { }
