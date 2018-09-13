import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';

import { ShoppingRoutingModule } from './shopping-routing.module';

import { ShoppingComponent } from './shopping.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingItemComponent } from './shopping-item/shopping-item.component';
import { shoppingReducers } from './store/reducers/shopping.reducer';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature('shopping', shoppingReducers),
    ShoppingRoutingModule
  ],
  declarations: [
    ShoppingComponent,
    ShoppingEditComponent,
    ShoppingItemComponent
  ]
})
export class ShoppingModule {
}
