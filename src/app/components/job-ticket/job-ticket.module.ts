import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonTemplateModule } from '../../common-template/common-template.module';
import { JobTicketRoutingModule } from './jobticket-routing.module';

import { AddTicketCategoryComponent } from './job-ticket-management/add-ticket-category/add-ticket-category.component';
import { JobTicketCategoryListComponent } from './job-ticket-management/job-ticket-category-list/job-ticket-category-list.component';

import { ListingModule } from 'listing-angular7';

@NgModule({
  declarations: [AddTicketCategoryComponent,JobTicketCategoryListComponent],
  imports: [
    CommonModule,
    CommonTemplateModule,
    JobTicketRoutingModule,
    ListingModule
  ]
})
export class JobTicketModule { }
