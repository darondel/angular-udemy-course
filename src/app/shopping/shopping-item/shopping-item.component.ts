import { Component, Input } from '@angular/core';
import { animate, animation, keyframes, style, transition, trigger, useAnimation } from '@angular/animations';

import { Store } from '@ngrx/store';

import { DeleteOneFromShopping, UpdateOneFromShopping } from '../store/actions/ingredient.actions';
import { Ingredient } from '../store/models/ingredient.model';
import { ShoppingFeatureState } from '../store/reducers/shopping.reducer';

export const bubbleAnimation = animation([
  style({transform: 'scale(1)'}),
  animate('{{ timings }}', keyframes([
    style({transform: 'scale(1)', offset: 0}),
    style({transform: 'scale({{ scale }})', offset: 0.5}),
    style({transform: 'scale(1)', offset: 1})
  ]))
]);

@Component({
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.css'],
  animations: [
    trigger('amountAnimation', [
      transition(':increment', useAnimation(bubbleAnimation, {params: {timings: '.2s', scale: 1.2}})),
      transition(':decrement', useAnimation(bubbleAnimation, {params: {timings: '.2s', scale: 0.8}}))
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
