import BETFunction from '../../modelFunctions/BETFunction';
import langmuirDoubleFunction from '../../modelFunctions/langmuirDoubleFunction';
import langmuirSingleFunction from '../../modelFunctions/langmuirSingleFunction';
import langmuirTripleFunction from '../../modelFunctions/langmuirTripleFunction';
import getFunction from '../getFunction';

describe('test getFunction', () => {
  let data = [
    { x: [0, 0.1], y: [0, 0.4], T: 273 },
    { x: [0.2, 0.4], y: [0.5, 0.9], T: 293 },
  ];
  it.only('get langmuir single function', () => {
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
    expect(() => getFunction('hello')).toThrow(
      'getFunction: FUNCTION NAME NOT RECOGNIZED',
    );
  });
});
