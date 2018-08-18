import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { AuthService } from '../../auth/shared/auth.service';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingService } from '../../shopping/shared/shopping.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {

  ingredientsSubscription: Subscription;
  ingredients: Ingredient[];

  constructor(private router: Router, protected authService: AuthService, private shoppingService: ShoppingService) {
  }

  ngOnInit() {
    this.ingredientsSubscription = this.shoppingService.getIngredients().subscribe(ingredients => this.ingredients = ingredients);
  }

  ngOnDestroy() {
    this.ingredientsSubscription.unsubscribe();
  }

  onLogout() {
    this.authService.signout();
    this.router.navigate(['']);
  }

}
