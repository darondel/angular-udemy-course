import { Component, Input } from '@angular/core';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';

import { Store } from '@ngrx/store';

import { DeleteOneFromShopping, UpdateOneFromShopping } from '../store/actions/ingredient.actions';
import { Ingredient } from '../store/models/ingredient.model';
import { ShoppingFeatureState } from '../store/reducers/shopping.reducer';

@Component({
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.css'],
  animations: [
    trigger('amountAnimation', [
      transition(':increment', [
        style({transform: 'scale(1)'}),
        animate(200, keyframes([
          style({transform: 'scale(1)', offset: 0}),
          style({transform: 'scale(1.2)', offset: 0.5}),
          style({transform: 'scale(1)', offset: 1})
        ]))
      ]),
      transition(':decrement', [
        style({transform: 'scale(1)'}),
        animate(200, keyframes([
          style({transform: 'scale(1)', offset: 0}),
          style({transform: 'scale(0.8)', offset: 0.5}),
          style({transform: 'scale(1)', offset: 1})
        ]))
      ])
    ])
  ]
})
export class ShoppingItemComponent {

  @Input() id: string;
  @Input() ingredient: Ingredient;

  constructor(private store: Store<ShoppingFeatureState>) {
  }

  /**
   * Tells whether the 'Delete' button is enabled or not.
   *
   * @return true if the 'Delete' button is enabled, false otherwise
   */
  get isDeleteEnabled(): boolean {
    return this.ingredient.amount > 1;
  }

  /**
   * Increments the amount of the ingredient.
   */
  onIncrementAmount() {
    this.store.dispatch(new UpdateOneFromShopping(this.id, {amount: this.ingredient.amount + 1}));
  }

  /**
   * Decrements the amount of the ingredient.
   */
  onDecrementAmount() {
    this.store.dispatch(new UpdateOneFromShopping(this.id, {amount: this.ingredient.amount - 1}));
  }

  /**
   * Removes the ingredient.
   */
  onRemoveIngredient() {
    this.store.dispatch(new DeleteOneFromShopping(this.id));
  }

}
