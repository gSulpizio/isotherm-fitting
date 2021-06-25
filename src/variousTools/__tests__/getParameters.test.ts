import getParameters from '../getParameters';

describe('test get parameters, two datasets, langmuir triple', () => {
  let parameterList = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  let functionName = 'langmuirTriple';
  it('test first dataset', () => {
    expect(getParameters(functionName, 0, parameterList)).toStrictEqual([
      0,
      1,
      2,
      6,
      7,
      8,
    ]);
  });
  it('test first dataset', () => {
    expect(getParameters(functionName, 1, parameterList)).toStrictEqual([
      3,
      4,
      5,
      6,
      7,
      8,
    ]);
  });
});
