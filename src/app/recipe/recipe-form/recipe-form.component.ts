import { Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ModalService } from '../modal/modal.service';
import { FormService } from './form.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss'],
})
export class RecipeFormComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  private isReadySubscription!: Subscription;

  get ingredients() {
    return this.form.get('ingredients') as FormArray;
  }

  constructor(
    public viewContainerRef: ViewContainerRef,
    private formService: FormService,
    private modalService: ModalService
  ) {
    this.modalService.formRef = this.viewContainerRef;
  }

  ngOnInit(): void {
    this.createForm();

    this.isReadySubscription = this.formService.isReady$.subscribe((isReady) => {
      if (isReady) this.clear();
    });
  }

  ngOnDestroy(): void {
    this.isReadySubscription.unsubscribe();
  }

  createForm() {
    this.form = this.formService.createForm();
  }

  addIngredient() {
    this.ingredients.push(this.formService.ingredientFormGroup());
  }

  removeIngredient(index: number) {
    if (index === 0) return;
    this.ingredients.removeAt(index);
  }

  clear() {
    this.form.reset();
    this.ingredients.clear();
    this.ingredients.insert(0, this.formService.ingredientFormGroup());
  }

  onSubmit() {
    this.modalService.openModal().subscribe();

    let recipeTemp = {
      name: this.form.get('name')!.value,
      description: this.formService.splitToArray(this.form.get('description')!.value),
      ingredients: this.ingredients.value,
    };

    this.formService.emitRecipe(recipeTemp);
  }
}
