import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { Recipe } from '../interfaces/Recipe';
import { RecipePost } from '../interfaces/RecipePost';
import { RecipeService } from '../recipe-list/recipe.service';
import { FormService } from './form.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss'],
})
export class RecipeFormComponent implements OnInit {
  form!: FormGroup;
  ingredientFormGroup(): FormGroup {
    return this.formBuilder.group({
      ingredientName: ['', [Validators.required, Validators.minLength(3)]],
      ingredientValue: ['', [Validators.required]],
    });
  }

  get ingredients() {
    return this.form.get('ingredients') as FormArray;
  }

  constructor(private formBuilder: FormBuilder, private formService: FormService) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(1600)]],
      ingredients: this.formBuilder.array([this.ingredientFormGroup()]),
    });
  }

  addIngredient() {
    this.ingredients.push(this.ingredientFormGroup());
  }

  removeIngredient(index: number) {
    if (index === 0) return;
    this.ingredients.removeAt(index);
  }

  onSubmit() {
    this.formService.openModal(this.form, this.ingredients);
  }
}
