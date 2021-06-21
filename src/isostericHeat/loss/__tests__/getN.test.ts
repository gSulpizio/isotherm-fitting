import getN from '../getN';

describe('test getN', () => {
  it.only('getN langmuir Single', () => {
    let result = getN('langmuirSingle');
    expect(result).toStrictEqual(1);
  });
  it.only('initialGuess langmuir Double', () => {
    let result = getN('langmuirDouble');
    expect(result).toStrictEqual(2);
  });
  it.only('initialGuess langmuir Triple', () => {
    let result = getN('langmuirTriple');
    expect(result).toStrictEqual(3);
  });
  it.only('initialGuess BET', () => {
    let result = getN('BET');
    expect(result).toStrictEqual(1);
  });
  it.only('initialGuess unknown algorithm', () => {
    expect(() => getN('Helloooo')).toThrow(
      'getN: FUNCTION NAME NOT RECOGNIZED',
    );
  });
});
