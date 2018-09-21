import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { ShoppingItemComponent } from './shopping-item.component';
import { Ingredient } from '../store/models/ingredient.model';
import { ShoppingFeatureState, shoppingReducers } from '../store/reducers/shopping.reducer';
import { DeleteOneFromShopping, UpdateOneFromShopping } from '../store/actions/ingredient.actions';

describe('ShoppingItemComponent', () => {
  let fixture: ComponentFixture<ShoppingItemComponent>;
  let component: ShoppingItemComponent;
  let id: string;
  let ingredient: Ingredient;
  let store: Store<ShoppingFeatureState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        StoreModule.forRoot({
          shopping: combineReducers(shoppingReducers)
        })
      ],
      declarations: [
        ShoppingItemComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    // Initialize the Shopping Item component.
    fixture = TestBed.createComponent(ShoppingItemComponent);
    component = fixture.componentInstance;

    // Mock the NgRx store dependency and spy on action dispatch.
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();

    // Mock the ingredient supplied by the parent component.
    id = 'tomato';
    ingredient = {name: 'Tomato', amount: 2};

    // Simulate the parent setting the Input() properties with that ingredient.
    component.id = id;
    component.ingredient = ingredient;

    // Trigger data binding.
    fixture.detectChanges();
  });

  function isTextDisplayed(text: any, selector: string): boolean {
    let result = false;

    for (const element of fixture.nativeElement.querySelectorAll(selector)) {
      result = result || element.textContent.includes(text);
    }

    return result;
  }

  function getButton(text: any): HTMLButtonElement {
    let result = null;

    for (const button of fixture.nativeElement.querySelectorAll('button')) {
      if (button.innerHTML.includes(text)) {
        result = button;
      }
    }

    return result;
  }

  describe('Constructor', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Template', () => {
    it('should display the ingredient name', () => {
      const result = isTextDisplayed(ingredient.name, 'span');

      expect(result).toBe(true);
    });

    it('should display the ingredient amount', () => {
      const result = isTextDisplayed(ingredient.amount, 'span');

      expect(result).toBe(true);
    });

    it('should make the delete button available', () => {
      const action = new DeleteOneFromShopping(id);
      const button = getButton('times');

      button.click();

      expect(store.dispatch).toHaveBeenCalledWith(action);
    });

    it('should make the increment button available', () => {
      const action = new UpdateOneFromShopping(id, {amount: ingredient.amount + 1});
      const button = getButton('plus');

      button.click();

      expect(store.dispatch).toHaveBeenCalledWith(action);
    });

    it('should make the decrement button available if the ingredient amount is greater than one', () => {
      const action = new UpdateOneFromShopping(id, {amount: ingredient.amount - 1});
      const button = getButton('minus');

      button.click();

      expect(store.dispatch).toHaveBeenCalledWith(action);
    });

    it('should make the decrement button unavailable if the ingredient amount is less or equal to one', () => {
      ingredient = {...ingredient, amount: 1};
      component.ingredient = ingredient;
      fixture.detectChanges();

      const action = new UpdateOneFromShopping(id, {amount: ingredient.amount - 1});
      const button = getButton('minus');

      button.click();

      expect(store.dispatch).not.toHaveBeenCalledWith(action);
    });
  });
});
