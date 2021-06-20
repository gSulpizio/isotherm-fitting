import getFunction from '../getFunction';
import langmuirSingleFunction from '../../modelFunctions/langmuirSingleFunction';
import langmuirDoubleFunction from '../../modelFunctions/langmuirDoubleFunction';
import langmuirTripleFunction from '../../modelFunctions/langmuirTripleFunction';
import BETFunction from '../../modelFunctions/BETFunction';

describe('test getFunction', () => {
  it('get langmuir single function', () => {
    expect(getFunction('langmuirSingle')([2, 5])(0.5)).toStrictEqual(
      langmuirSingleFunction([2, 5])(0.5),
    );
  });
  it('get langmuir Double function', () => {
    expect(getFunction('langmuirDouble')([2, 5, 4, 9])(0.5)).toStrictEqual(
      langmuirDoubleFunction([2, 5, 4, 9])(0.5),
    );
  });

  it('get langmuir Triple function', () => {
    expect(
      getFunction('langmuirTriple')([2, 5, 4, 9, 1, 3])(0.5),
    ).toStrictEqual(langmuirTripleFunction([2, 5, 4, 9, 1, 3])(0.5));
  });
  it('get BET function', () => {
    expect(getFunction('BET')([8, 4, 0.1])(0.5)).toStrictEqual(
      BETFunction([8, 4, 0.1])(0.5),
    );
  });
  it('error testing', () => {
    expect(() => getFunction('hello')).toThrowError(
      'getFunction: FUNCTION NAME NOT RECOGNIZED',
    );
  });
});
