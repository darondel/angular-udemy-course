import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { StoreModule } from "@ngrx/store";

import { CoreModule } from "./core/core.module";
import { RecipesModule } from "./recipes/recipes.module";
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthInterceptor } from "./auth/shared/auth.interceptor";
import { ingredientReducer } from "./shopping/store/reducers/ingredient.reducer";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({ingredient: ingredientReducer}),
    CoreModule,
    RecipesModule,
    AppRoutingModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
