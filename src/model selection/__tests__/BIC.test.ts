import makeNoisyData from '../../../dev tools/makeNoisyData';
import langmuirDoubleFit from '../../directFitting/langmuir/langmuirDoubleFit';
import langmuirSingleFit from '../../directFitting/langmuir/langmuirSingleFit';
import langmuirTripleFit from '../../directFitting/langmuir/langmuirTripleFit';
import langmuirDoubleFunction from '../../modelFunctions/langmuirDoubleFunction';
import langmuirSingleFunction from '../../modelFunctions/langmuirSingleFunction';
import langmuirTripleFunction from '../../modelFunctions/langmuirTripleFunction';
import simpleMSE from '../simpleMSE';
import BIC from '../BIC';

describe('BIC', () => {
  it('langmuirSingle', () => {
    let fnName = 'langmuirSingle';
    let data = makeNoisyData([2, 7], 100, 100, fnName);
    let fittedParams1 = langmuirSingleFit(data).x;
    let fittedParams2 = langmuirDoubleFit(data).x;
    let fittedParams3 = langmuirTripleFit(data).x;

    let yHat1 = data.x.map((item: number) => langmuirSingleFunction(fittedParams1)(item));
    let yHat2 = data.x.map((item: number) => langmuirDoubleFunction(fittedParams2)(item));
    let yHat3 = data.x.map((item: number) => langmuirTripleFunction(fittedParams3)(item));

    let MSE1=simpleMSE(data.y, yHat1)
    let MSE2=simpleMSE(data.y, yHat2)
    let MSE3=simpleMSE(data.y, yHat3)

    let BIC1 = BIC(data, MSE1, fittedParams1);
    let BIC2 = BIC(data, MSE2, fittedParams2);
    let BIC3 = BIC(data, MSE3, fittedParams3);

    expect(BIC1).toBeLessThan(BIC2);
    expect(BIC2).toBeLessThan(BIC3);
  });
  it('langmuirDouble', () => {
    let fnName = 'langmuirDouble';
    let data = makeNoisyData([1, 2, 4, 5], 50, 10000, fnName);
    let fittedParams1 = langmuirSingleFit(data).x;
    let fittedParams2 = langmuirDoubleFit(data).x;
    let fittedParams3 = langmuirTripleFit(data).x;
    let yHat1 = data.x.map((item: number) => langmuirSingleFunction(fittedParams1)(item));
    let yHat2 = data.x.map((item: number) => langmuirDoubleFunction(fittedParams2)(item));
    let yHat3 = data.x.map((item: number) => langmuirTripleFunction(fittedParams3)(item));

    let MSE1=simpleMSE(data.y, yHat1)
    let MSE2=simpleMSE(data.y, yHat2)
    let MSE3=simpleMSE(data.y, yHat3)

    let BIC1 = BIC(data, MSE1, fittedParams1);
    let BIC2 = BIC(data, MSE2, fittedParams2);
    let BIC3 = BIC(data, MSE3, fittedParams3);

    expect(BIC2).toBeLessThan(BIC1);
    expect(BIC2).toBeLessThan(BIC3);
  });
  it('langmuirTriple', () => {
    let fnName = 'langmuirTriple';
    let data = makeNoisyData([2, 7, 5, 3, 1, 4], 50, 100, fnName);
    let fittedParams1 = langmuirSingleFit(data).x;
    let fittedParams2 = langmuirDoubleFit(data).x;
    let fittedParams3 = langmuirTripleFit(data).x;
    
    let yHat1 = data.x.map((item: number) => langmuirSingleFunction(fittedParams1)(item));
    let yHat2 = data.x.map((item: number) => langmuirDoubleFunction(fittedParams2)(item));
    let yHat3 = data.x.map((item: number) => langmuirTripleFunction(fittedParams3)(item));

    let MSE1=simpleMSE(data.y, yHat1)
    let MSE2=simpleMSE(data.y, yHat2)
    let MSE3=simpleMSE(data.y, yHat3)

    let BIC1 = BIC(data, MSE1, fittedParams1);
    let BIC2 = BIC(data, MSE2, fittedParams2);
    let BIC3 = BIC(data, MSE3, fittedParams3);

    expect(BIC1).toBeLessThan(BIC3);
    expect(BIC2).toBeLessThan(BIC3);
  });
});
