import BETFunction from '../../modelFunctions/BETFunction';
import langmuirDoubleFunction from '../../modelFunctions/langmuirDoubleFunction';
import langmuirSingleFunction from '../../modelFunctions/langmuirSingleFunction';
import langmuirTripleFunction from '../../modelFunctions/langmuirTripleFunction';
import getFunction from '../getFunction';

describe('test getFunction', () => {
  it('get langmuir single function', () => {
    expect(getFunction('langmuirSingle')([2, 5])(0.5)).toStrictEqual(
      langmuirSingleFunction([2, 5])(0.5),
    );
  });
  it('get langmuir single function with fitting name', () => {
    expect(getFunction('langmuirSingleFit')([2, 5])(0.5)).toStrictEqual(
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
  it('get BET function with double fit name', () => {
    expect(getFunction('BETFitLinearDouble')([8, 4, 0.1])(0.5)).toStrictEqual(
      BETFunction([8, 4, 0.1])(0.5),
    );
  });
  it('error testing', () => {
    expect(() => getFunction('hello')).toThrow(
      'getFunction - FUNCTION NAME NOT RECOGNIZED: hello',
    );

  });
});
