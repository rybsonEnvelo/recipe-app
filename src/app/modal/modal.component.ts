import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @ViewChildren('star') stars = new QueryList<ElementRef>();
  @Output() closeEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter<number>();
  rating: number = 0;

  constructor() {}

  closeModal() {
    this.closeEvent.emit();
  }

  confirm() {
    if (!this.rating) {
      this.stars.forEach((star) => {
        star.nativeElement.firstChild.classList.add('error');
      });

      return;
    }

    this.confirmEvent.emit(this.rating);
  }

  setRating(currentStar: number) {
    this.rating = currentStar + 1;
    this.stars.forEach((star, index) => {
      star.nativeElement.firstChild.classList.remove('error');

      if (index <= currentStar) star.nativeElement.firstChild.classList.remove('inactive');
      else star.nativeElement.firstChild.classList.add('inactive');
    });
  }
}
