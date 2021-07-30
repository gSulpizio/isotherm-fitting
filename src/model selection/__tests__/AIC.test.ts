import makeNoisyData from '../../../dev tools/makeNoisyData';
import langmuirDoubleFit from '../../directFitting/langmuir/langmuirDoubleFit';
import langmuirSingleFit from '../../directFitting/langmuir/langmuirSingleFit';
import langmuirTripleFit from '../../directFitting/langmuir/langmuirTripleFit';
import AIC from '../AIC';

describe('AIC', () => {
  it('langmuirSingle', () => {
    let fnName = 'langmuirSingle';
    let data = makeNoisyData([2, 7], 100, 100, fnName);
    let fittedParams1 = langmuirSingleFit(data).parameterValues;
    let fittedParams2 = langmuirDoubleFit(data).parameterValues;
    let fittedParams3 = langmuirTripleFit(data).parameterValues;
    let aic1 = AIC(data, 'langmuirSingle', fittedParams1);
    let aic2 = AIC(data, 'langmuirDouble', fittedParams2);
    let aic3 = AIC(data, 'langmuirTriple', fittedParams3);
    expect(aic1).toBeLessThan(aic2);
    expect(aic2).toBeLessThan(aic3);
  });
  it('langmuirDouble', () => {
    let fnName = 'langmuirDouble';
    let data = makeNoisyData([2, 7, 5, 3], 50, 10000, fnName);
    let fittedParams1 = langmuirSingleFit(data).x;
    let fittedParams2 = langmuirDoubleFit(data).x;
    let fittedParams3 = langmuirTripleFit(data).x;
    console.log(fittedParams3);
    let aic1 = AIC(data, 'langmuirSingle', fittedParams1);
    let aic2 = AIC(data, 'langmuirDouble', fittedParams2);
    let aic3 = AIC(data, 'langmuirTriple', fittedParams3);
    expect(aic2).toBeLessThan(aic1);
    expect(aic2).toBeLessThan(aic3);
  });
  it('langmuirTriple', () => {
    let fnName = 'langmuirTriple';
    let data = makeNoisyData([2, 7, 5, 3, 1, 4], 50, 100, fnName);
    let fittedParams1 = langmuirSingleFit(data).x;
    let fittedParams2 = langmuirDoubleFit(data).x;
    let fittedParams3 = langmuirTripleFit(data).x;
    console.log(fittedParams3);
    let aic1 = AIC(data, 'langmuirSingle', fittedParams1);
    let aic2 = AIC(data, 'langmuirDouble', fittedParams2);
    let aic3 = AIC(data, 'langmuirTriple', fittedParams3);
    expect(aic1).toBeLessThan(aic3);
    expect(aic2).toBeLessThan(aic3);
  });
});
