import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { AdminHeaderComponent } from '../components/admin/admin-header/admin-header.component';
import { AdminFooterComponent } from '../components/admin/admin-footer/admin-footer.component';
import { DemoMaterialModule } from '../modules/materialModule';
// import { BrowserModule } from '@angular/platform-browser';
// import { TraningModule } from 'traning-lib-influxiq';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AdminHeaderComponent,
    AdminFooterComponent
  ],
  imports: [
    // CommonModule,
    DemoMaterialModule,
    // BrowserModule.withServerTransition({ appId: 'serverApp' }),
    // TraningModule,
    RouterModule
  ],
  exports: [
    AdminHeaderComponent,
    AdminFooterComponent,
    DemoMaterialModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
  ],
})
export class CommonTemplateModule { }
