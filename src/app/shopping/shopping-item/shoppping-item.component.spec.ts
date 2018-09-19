import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { ShoppingItemComponent } from './shopping-item.component';
import { DeleteOneFromShopping, UpdateOneFromShopping } from '../store/actions/ingredient.actions';
import { Ingredient } from '../store/models/ingredient.model';
import { ShoppingFeatureState, shoppingReducers } from '../store/reducers/shopping.reducer';

describe('ShoppingItemComponent', () => {
  let fixture: ComponentFixture<ShoppingItemComponent>;
  let component: ShoppingItemComponent;
  let id: string;
  let ingredient: Ingredient;
  let store: Store<ShoppingFeatureState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
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

    // Trigger initial data binding.
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#isDeleteEnabled() should check the amount of the input ingredient', () => {
    component.ingredient.amount = 2;
    expect(component.isDeleteEnabled).toBe(true, 'enabled if the amount is greater than one');

    component.ingredient.amount = 1;
    expect(component.isDeleteEnabled).toBe(false, 'disabled if the amount is equal to one');

    component.ingredient.amount = 0;
    expect(component.isDeleteEnabled).toBe(false, 'disabled if the amount is less than one');
  });

  it('#onIncrementAmount() should dispatch a UpdateOneFromShopping action', () => {
    const action = new UpdateOneFromShopping(id, {amount: ingredient.amount + 1});

    component.onIncrementAmount();

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('#onDecrementAmount() should dispatch a UpdateOneFromShopping action', () => {
    const action = new UpdateOneFromShopping(id, {amount: ingredient.amount - 1});

    component.onDecrementAmount();

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('#onRemoveIngredient() should dispatch a DeleteOneFromShopping action', () => {
    const action = new DeleteOneFromShopping(id);

    component.onRemoveIngredient();

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
