import { FirstLetterUpperCasePipe } from './first-letter-upper-case.pipe';

describe('FirstLetterUpperCasePipe', () => {
  it('shouldBe Jajecznica', () => {
    const pipe = new FirstLetterUpperCasePipe();
    expect(pipe.transform('jajecznica')).toBe('Jajecznica');
  });

  it('shouldBe Jajecznica z pomidorami', () => {
    const pipe = new FirstLetterUpperCasePipe();
    expect(pipe.transform('jajecznica z pomidorami')).toBe('Jajecznica z pomidorami');
  });
});
