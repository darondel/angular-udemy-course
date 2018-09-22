import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { ShoppingItemComponent } from './shopping-item.component';
import { ShoppingFeatureState, shoppingReducers } from '../store/reducers/shopping.reducer';
import { DeleteOneFromShopping, UpdateOneFromShopping } from '../store/actions/ingredient.actions';

describe('ShoppingItemComponent', () => {
  let fixture: ComponentFixture<ShoppingItemComponent>;
  let component: ShoppingItemComponent;
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

    // Mock the NgRx store dependency.
    store = TestBed.get(Store);

    // Mock the input properties.
    component.id = 'tomato';
    component.ingredient = {name: 'Tomato', amount: 2};

    // Trigger data binding.
    fixture.detectChanges();
  });

  describe('Constructor', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Properties', () => {
    describe('isDecrementEnabled', () => {
      it('should be true if the ingredient amount is greater than one', () => {
        component.ingredient = {...component.ingredient, amount: 2};
        fixture.detectChanges();

        expect(component.isDecrementEnabled).toBe(true);
      });

      it('should be false if the ingredient amount is less or equal to one', () => {
        component.ingredient = {...component.ingredient, amount: 1};
        fixture.detectChanges();

        expect(component.isDecrementEnabled).toBe(false);
      });
    });
  });

  describe('Operations', () => {
    beforeEach(() => {
      spyOn(store, 'dispatch').and.callThrough();
    });

    describe('onIncrementAmount', () => {
      it('should dispatch a UPDATE_ONE_FROM_SHOPPING store action by incrementing the ingredient amount', () => {
        const action = new UpdateOneFromShopping(component.id, {amount: component.ingredient.amount + 1});

        component.onIncrementAmount();

        expect(store.dispatch).toHaveBeenCalledWith(action);
      });
    });

    describe('onDecrementAmount', () => {
      it('should dispatch a UPDATE_ONE_FROM_SHOPPING store action by decrementing the ingredient amount', () => {
        const action = new UpdateOneFromShopping(component.id, {amount: component.ingredient.amount - 1});

        component.onDecrementAmount();

        expect(store.dispatch).toHaveBeenCalledWith(action);
      });
    });

    describe('onRemoveIngredient', () => {
      it('should dispatch a DELETE_ONE_FROM_SHOPPING store action', () => {
        const action = new DeleteOneFromShopping(component.id);

        component.onRemoveIngredient();

        expect(store.dispatch).toHaveBeenCalledWith(action);
      });
    });
  });

  describe('Template', () => {
    /**
     * Tells whether a given text content is displayed in the template.
     *
     * @param textContent the text content
     * @param selector the selector that includes the text content
     * @return true if the text content is displayed in the template, false otherwise
     */
    function isTextDisplayed(textContent: any, selector: string): boolean {
      let result = false;

      for (const element of fixture.nativeElement.querySelectorAll(selector)) {
        result = result || element.textContent.includes(textContent);
      }

      return result;
    }

    describe('Information', () => {
      it('should display the ingredient name', () => {
        const result = isTextDisplayed(component.ingredient.name, 'span');

        expect(result).toBe(true);
      });

      it('should display the ingredient amount', () => {
        const result = isTextDisplayed(component.ingredient.amount, 'span');

        expect(result).toBe(true);
      });
    });

    describe('Actions', () => {
      /**
       * Gets the button associated with a given inner HTML.
       *
       * @param innerHTML the inner HTML
       * @return the button, or null if there is no button matching the inner HTML
       */
      function getButton(innerHTML: any): HTMLButtonElement {
        let result = null;

        for (const button of fixture.nativeElement.querySelectorAll('button')) {
          if (button.innerHTML.includes(innerHTML)) {
            result = button;
          }
        }

        return result;
      }

      describe('Ingredient Deletion', () => {
        it('should be available', () => {
          const button = getButton('times');

          expect(button).toBeTruthy();

          spyOn(component, 'onRemoveIngredient').and.callThrough();
          button.click();

          expect(component.onRemoveIngredient).toHaveBeenCalled();
        });
      });

      describe('Ingredient Amount Increment', () => {
        it('should be available', () => {
          const button = getButton('plus');

          expect(button).toBeTruthy();

          spyOn(component, 'onIncrementAmount').and.callThrough();
          button.click();

          expect(component.onIncrementAmount).toHaveBeenCalled();
        });
      });

      describe('Ingredient Amount Decrement', () => {
        it('should be available if the ingredient amount is greater than one', () => {
          const button = getButton('minus');

          expect(button).toBeTruthy();

          spyOn(component, 'onDecrementAmount').and.callThrough();
          component.ingredient = {...component.ingredient, amount: 2};
          fixture.detectChanges();
          button.click();

          expect(component.onDecrementAmount).toHaveBeenCalled();
        });

        it('should be unavailable if the ingredient amount is less or equal to one', () => {
          const button = getButton('minus');

          expect(button).toBeTruthy();

          spyOn(component, 'onDecrementAmount').and.callThrough();
          component.ingredient = {...component.ingredient, amount: 1};
          fixture.detectChanges();
          button.click();

          expect(component.onDecrementAmount).not.toHaveBeenCalled();
        });
      });
    });
  });
});
