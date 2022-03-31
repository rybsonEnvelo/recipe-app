import { MultiplyStarsPipe } from './multiply-stars.pipe';

describe('MultiplyStarsPipe', () => {
  it('should be array lenght 5', () => {
    const pipe = new MultiplyStarsPipe();
    expect(pipe.transform(5).length).toBe(5);
  });

  it('should be array lenght 55', () => {
    const pipe = new MultiplyStarsPipe();
    expect(pipe.transform(55).length).toBe(55);
  });
});
