import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multiplyStars',
})
export class MultiplyStarsPipe implements PipeTransform {
  transform(value: number): number[] {
    return new Array(value).fill(1);
  }
}
