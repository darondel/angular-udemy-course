import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ShoppingService } from '../shared/shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private shoppingService: ShoppingService) {
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
    this.shoppingService.addIngredients({
      name: this.form.value.ingredientName,
      amount: this.form.value.ingredientAmount
    });
  }

  onClear() {
    this.form.reset();
  }

}
