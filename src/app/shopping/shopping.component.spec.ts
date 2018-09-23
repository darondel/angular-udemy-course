import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { ShoppingComponent } from './shopping.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingItemComponent } from './shopping-item/shopping-item.component';
import { initialState } from './store/reducers/ingredient.reducer';
import { ShoppingFeatureState, shoppingReducers } from './store/reducers/shopping.reducer';

describe('ShoppingComponent', () => {
  let fixture: ComponentFixture<ShoppingComponent>;
  let component: ShoppingComponent;
  let store: Store<ShoppingFeatureState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NoopAnimationsModule,
        StoreModule.forRoot({
          shopping: combineReducers(shoppingReducers)
        })
      ],
      declarations: [
        ShoppingComponent,
        ShoppingEditComponent,
        ShoppingItemComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    // Initialize the Shopping component.
    fixture = TestBed.createComponent(ShoppingComponent);
    component = fixture.componentInstance;

    // Mock the NgRx store dependency.
    store = TestBed.get(Store);

    // Trigger changes.
    fixture.detectChanges();
  });

  describe('Constructor', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Properties', () => {
    describe('ingredients', () => {
      it('should return the ingredients in the store', () => {
        const result = component.ingredients.subscribe(ingredients => {
          expect(ingredients).toEqual(initialState.entities);
        });
      });
    });

    describe('ingredientsTotal', () => {
      it('should return the number of ingredients in the store', () => {
        const result = component.ingredientsTotal;

        expect(result).toBe(initialState.ids.length);
      });
    });
  });

  describe('Operations', () => {
    describe('trackIngredient', () => {
      it('should return the ingredient id', () => {
        const result = component.trackIngredient(0, {key: 'tomato', value: {name: 'Tomato', amount: 7}});

        expect(result).toBe('tomato');
      });
    });
  });

  describe('Template', () => {
    it('should display a form to add an ingredient', () => {
      const nestedComponent = fixture.debugElement.query(By.css('app-shopping-edit'));

      expect(nestedComponent).toBeTruthy();
    });

    it('should display the ingredients', () => {
      const nestedComponents = fixture.debugElement.queryAll(By.css('app-shopping-item'));

      expect(nestedComponents.length).toBe(initialState.ids.length);
    });
  });
});
