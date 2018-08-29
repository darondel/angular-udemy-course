import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from "@ngrx/store";

import { Upsert } from "../store/actions/ingredient.actions";
import { IngredientState } from "../store/reducers/ingredient.reducer";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private store: Store<IngredientState>) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      ingredientName: ['', Validators.required],
      ingredientAmount: ['', [Validators.required, Validators.min(1)]]
    });
  }

  isControlValid(controlName: string): boolean {
    return this.form.get(controlName).untouched || this.form.get(controlName).valid;
  }

  onAdd() {
    this.store.dispatch(new Upsert({
      name: this.form.value.ingredientName,
      amount: this.form.value.ingredientAmount
    }));
  }

  onClear() {
    this.form.reset();
  }

}
