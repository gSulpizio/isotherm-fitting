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
  it('test second dataset', () => {
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
describe('langmuirSingle function test', () => {
  let parameterList = [0, 1, 2, 3];
  let functionName = 'langmuirSingle';
  it('test 1', () => {
    let parameters1 = getParameters(functionName, 0, parameterList);
    let parameters2 = getParameters(functionName, 1, parameterList);
    let parameters3 = getParameters(functionName, 2, parameterList);
    expect(parameters1).toStrictEqual([0, 3]);
    expect(parameters2).toStrictEqual([1, 3]);
    expect(parameters3).toStrictEqual([2, 3]);
  });
});
