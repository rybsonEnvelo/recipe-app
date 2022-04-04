import { Component, ElementRef, EventEmitter, OnDestroy, Output, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnDestroy {
  @ViewChildren('star') stars = new QueryList<ElementRef>();
  @Output() closeEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter<number>();
  private rating: number = 0;

  ngOnDestroy(): void {
    this.closeEvent.unsubscribe();
    this.confirmEvent.unsubscribe();
  }

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
