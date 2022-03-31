import { AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @ViewChildren('star') stars = new QueryList<ElementRef>();

  constructor() {}

  setRating(currentStar: number) {
    this.stars.forEach((star, index) => {
      if (index <= currentStar) star.nativeElement.firstChild.classList.remove('inactive');
      else star.nativeElement.firstChild.classList.add('inactive');
    });
  }
}
