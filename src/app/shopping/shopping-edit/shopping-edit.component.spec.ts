import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { ShoppingEditComponent } from './shopping-edit.component';
import { UpsertOneFromShopping } from '../store/actions/ingredient.actions';
import { ShoppingFeatureState, shoppingReducers } from '../store/reducers/shopping.reducer';

describe('ShoppingEditComponent', () => {
  let fixture: ComponentFixture<ShoppingEditComponent>;
  let component: ShoppingEditComponent;
  let store: Store<ShoppingFeatureState>;
  let ingredientName: AbstractControl;
  let ingredientAmount: AbstractControl;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        StoreModule.forRoot({
          shopping: combineReducers(shoppingReducers)
        })
      ],
      declarations: [
        ShoppingEditComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    // Initialize the Shopping Edit component.
    fixture = TestBed.createComponent(ShoppingEditComponent);
    component = fixture.componentInstance;

    // Mock the NgRx store dependency.
    store = TestBed.get(Store);

    // Trigger changes.
    fixture.detectChanges();

    // Get the form inputs.
    ingredientAmount = component.form.get('ingredientAmount');
    ingredientName = component.form.get('ingredientName');
  });

  describe('Constructor', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Operations', () => {
    describe('isControlValid', () => {
      it('should return true if the control is untouched', () => {
        ingredientName.markAsUntouched();

        const result = component.isControlValid('ingredientName');

        expect(result).toBe(true);
      });

      it('should return true if the control is touched and valid', () => {
        ingredientName.markAsTouched();
        ingredientName.setValue('Ingredient Name');

        const result = component.isControlValid('ingredientName');

        expect(result).toBe(true);
      });

      it('should return false if the control is touched and invalid', () => {
        ingredientName.markAsTouched();

        const result = component.isControlValid('ingredientName');

        expect(result).toBe(false);
      });
    });

    describe('onAdd', () => {
      beforeEach(() => {
        spyOn(store, 'dispatch').and.callThrough();
      });

      it('should dispatch a UPSERT_ONE_FROM_SHOPPING store action', () => {
        const action = new UpsertOneFromShopping({
          name: ingredientName.value,
          amount: ingredientAmount.value
        });

        component.onAdd();

        expect(store.dispatch).toHaveBeenCalledWith(action);
      });
    });

    describe('onClear', () => {
      beforeEach(() => {
        spyOn(component.form, 'reset').and.callThrough();
      });

      it('should reset the form', () => {
        component.onClear();

        expect(component.form.reset).toHaveBeenCalled();
      });
    });
  });

  describe('Template', () => {
    describe('Form Inputs', () => {
      describe('Ingredient Name', () => {
        it('should be valid if is completed', () => {
          ingredientName.setValue('Ingredient Name');

          expect(ingredientName.valid).toBe(true);
        });

        it('should be invalid if is not completed', () => {
          expect(ingredientName.valid).toBe(false);
          expect(ingredientName.errors.required).toBe(true);
        });
      });

      describe('Ingredient Amount', () => {
        it('should be valid if is completed and greater or equal to one', () => {
          ingredientAmount.setValue(1);

          expect(ingredientAmount.valid).toBe(true);
        });

        it('should be invalid if is not completed', () => {
          expect(ingredientAmount.valid).toBe(false);
          expect(ingredientAmount.errors.required).toBe(true);
        });

        it('should be invalid if is completed and less than one', () => {
          ingredientAmount.setValue(0);

          expect(ingredientAmount.valid).toBe(false);
          expect(ingredientAmount.errors.min).toEqual({min: 1, actual: 0});
        });
      });
    });

    describe('Actions', () => {
      describe('Form Submission', () => {
        let button: HTMLButtonElement;

        beforeEach(() => {
          button = fixture.debugElement.query(By.css('button[type=submit]')).nativeElement;

          spyOn(component, 'onAdd').and.callThrough();
        });

        it('should be enabled if the form is valid', () => {
          ingredientName.setValue('Ingredient Name');
          ingredientAmount.setValue(1);
          fixture.detectChanges();

          expect(button.disabled).toBe(false);
        });

        it('should be disabled if the form is invalid', () => {
          expect(button.disabled).toBe(true);
        });

        it('should call onAdd operation', () => {
          button.disabled = false;
          button.click();

          expect(component.onAdd).toHaveBeenCalled();
        });
      });

      describe('Form Clearing', () => {
        let button: HTMLButtonElement;

        beforeEach(() => {
          button = fixture.debugElement.query(By.css('button[type=reset]')).nativeElement;

          spyOn(component, 'onClear').and.callThrough();
        });

        it('should be enabled', () => {
          expect(button.disabled).toBe(false);
        });

        it('should call onClear operation', () => {
          button.click();

          expect(component.onClear).toHaveBeenCalled();
        });
      });
    });
  });
});
