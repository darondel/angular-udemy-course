import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {

  ingredientsSubscription: Subscription;
  ingredients: Ingredient[];

  constructor(private router: Router, private authService: AuthService, private shoppingListService: ShoppingListService) {
  }

  ngOnInit() {
    this.ingredientsSubscription = this.shoppingListService.getIngredients().subscribe(ingredients => this.ingredients = ingredients);
  }

  ngOnDestroy() {
    this.ingredientsSubscription.unsubscribe();
  }

  isUserLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  onLogout() {
    this.authService.signout();
    this.router.navigate(['']);
  }

}
