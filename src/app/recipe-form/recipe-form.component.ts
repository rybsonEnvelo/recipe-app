import { Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../modal/modal.service';
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
      name: ['', [Validators.required, Validators.minLength(3)]],
      value: ['', [Validators.required]],
    });
  }

  get ingredients() {
    return this.form.get('ingredients') as FormArray;
  }

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService,
    private modalService: ModalService,
    public viewContainerRef: ViewContainerRef
  ) {
    this.modalService.formRef = this.viewContainerRef;
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
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

  clear() {
    this.form.reset();
    this.ingredients.clear();
    this.ingredients.insert(0, this.ingredientFormGroup());
  }

  onSubmit() {
    this.modalService.openModal().subscribe();

    let recipeTemp = {
      name: this.form.get('name')!.value,
      description: this.formService.splitToArray(this.form.get('description')!.value),
      ingredients: this.ingredients.value,
    };

    this.formService.recipe.next(recipeTemp);
  }
}
