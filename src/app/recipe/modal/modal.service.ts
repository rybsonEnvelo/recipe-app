import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { FormService } from '../recipe-form/form.service';
import { ModalComponent } from './modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  public viewContainerRef?: ViewContainerRef;
  private componentRef!: ComponentRef<ModalComponent>;
  private componentSubscriber = new Subject<string>();

  set formRef(vcr: ViewContainerRef) {
    this.viewContainerRef = vcr;
  }

  constructor(private formService: FormService) {}

  openModal() {
    this.componentRef = this.viewContainerRef!.createComponent(ModalComponent);
    this.componentRef.instance.closeEvent.subscribe(() => this.closeModal());
    this.componentRef.instance.confirmEvent.subscribe((rating) => this.confirm(rating));

    return this.componentSubscriber.asObservable();
  }

  closeModal() {
    this.componentSubscriber.complete();
    this.componentRef.destroy();
  }

  confirm(rating: number) {
    this.formService.emitRecipeRating(rating);
    this.closeModal();
  }
}
