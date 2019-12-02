import * as tslib_1 from "tslib";
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
let AppBrowserModule = class AppBrowserModule {
};
AppBrowserModule = tslib_1.__decorate([
    NgModule({
        imports: [
            AppRoutingModule,
            AppModule,
            BrowserTransferStateModule,
            BrowserAnimationsModule
        ],
        providers: [],
        bootstrap: [AppComponent]
    })
], AppBrowserModule);
export { AppBrowserModule };
//# sourceMappingURL=app.browser.module.js.map