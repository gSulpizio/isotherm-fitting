import makeNoisyData from '../../../dev tools/makeNoisyData';
import langmuirDoubleFit from '../../directFitting/langmuir/langmuirDoubleFit';
import langmuirSingleFit from '../../directFitting/langmuir/langmuirSingleFit';
import langmuirTripleFit from '../../directFitting/langmuir/langmuirTripleFit';
import BIC from '../BIC';

describe('BIC', () => {
  it('langmuirSingle', () => {
    let fnName = 'langmuirSingle';
    let data = makeNoisyData([2, 7], 100, 100, fnName);
    let fittedParams1 = langmuirSingleFit(data).x;
    let fittedParams2 = langmuirDoubleFit(data).x;
    let fittedParams3 = langmuirTripleFit(data).x;
    let BIC1 = BIC(data, 'langmuirSingle', fittedParams1);
    let BIC2 = BIC(data, 'langmuirDouble', fittedParams2);
    let BIC3 = BIC(data, 'langmuirTriple', fittedParams3);
    expect(BIC1).toBeLessThan(BIC2);
    expect(BIC2).toBeLessThan(BIC3);
  });
  it('langmuirDouble', () => {
    let fnName = 'langmuirDouble';
    let data = makeNoisyData([1, 2, 4, 5], 50, 10000, fnName);
    let fittedParams1 = langmuirSingleFit(data).x;
    let fittedParams2 = langmuirDoubleFit(data).x;
    let fittedParams3 = langmuirTripleFit(data).x;
    let BIC1 = BIC(data, 'langmuirSingle', fittedParams1);
    let BIC2 = BIC(data, 'langmuirDouble', fittedParams2);
    let BIC3 = BIC(data, 'langmuirTriple', fittedParams3);
    expect(BIC2).toBeLessThan(BIC1);
    expect(BIC2).toBeLessThan(BIC3);
  });
  it('langmuirTriple', () => {
    let fnName = 'langmuirTriple';
    let data = makeNoisyData([2, 7, 5, 3, 1, 4], 50, 100, fnName);
    let fittedParams1 = langmuirSingleFit(data).x;
    let fittedParams2 = langmuirDoubleFit(data).x;
    let fittedParams3 = langmuirTripleFit(data).x;
    let BIC1 = BIC(data, 'langmuirSingle', fittedParams1);
    let BIC2 = BIC(data, 'langmuirDouble', fittedParams2);
    let BIC3 = BIC(data, 'langmuirTriple', fittedParams3);
    expect(BIC1).toBeLessThan(BIC3);
    expect(BIC2).toBeLessThan(BIC3);
  });
});
