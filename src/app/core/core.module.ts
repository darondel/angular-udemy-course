import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from "./core-routing.module";

import { NavComponent } from "./nav/nav.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  declarations: [
    NavComponent,
    PageNotFoundComponent
  ],
  exports: [
    NavComponent
  ]
})
export class CoreModule {
}
