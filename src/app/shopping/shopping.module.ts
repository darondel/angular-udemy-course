import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { ShoppingRoutingModule } from "./shopping-routing.module";

import { ShoppingComponent } from "./shopping.component";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ShoppingRoutingModule
  ],
  declarations: [
    ShoppingComponent,
    ShoppingEditComponent
  ]
})
export class ShoppingModule {
}
