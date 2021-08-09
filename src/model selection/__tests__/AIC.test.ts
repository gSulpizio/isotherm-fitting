import makeNoisyData from '../../../dev tools/makeNoisyData';
import langmuirDoubleFit from '../../directFitting/langmuir/langmuirDoubleFit';
import langmuirSingleFit from '../../directFitting/langmuir/langmuirSingleFit';
import langmuirTripleFit from '../../directFitting/langmuir/langmuirTripleFit';
import AIC from '../AIC';
import simpleMSE from '../simpleMSE'
import getFunction from '../../variousTools/getFunction'
import langmuirSingleFunction from '../../modelFunctions/langmuirSingleFunction';
import langmuirDoubleFunction from '../../modelFunctions/langmuirDoubleFunction';
import langmuirTripleFunction from '../../modelFunctions/langmuirTripleFunction';

describe('AIC', () => {
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

    let aic1 = AIC(data, MSE1, fittedParams1);
    let aic2 = AIC(data, MSE2, fittedParams2);
    let aic3 = AIC(data, MSE3, fittedParams3);
    expect(aic1).toBeLessThan(aic2);
    expect(aic2).toBeLessThan(aic3);
  });
  it('langmuirDouble', () => {
    let fnName = 'langmuirDouble';

    let data = makeNoisyData([2, 7, 5, 3], 50, 10000, fnName);

    let fittedParams1 = langmuirSingleFit(data).x;
    let fittedParams2 = langmuirDoubleFit(data).x;
    let fittedParams3 = langmuirTripleFit(data).x;

    let yHat1 = data.x.map((item: number) => langmuirSingleFunction(fittedParams1)(item));
    let yHat2 = data.x.map((item: number) => langmuirDoubleFunction(fittedParams2)(item));
    let yHat3 = data.x.map((item: number) => langmuirTripleFunction(fittedParams3)(item));

    let MSE1=simpleMSE(data.y, yHat1)
    let MSE2=simpleMSE(data.y, yHat2)
    let MSE3=simpleMSE(data.y, yHat3)

    let aic1 = AIC(data, MSE1, fittedParams1);
    let aic2 = AIC(data, MSE2, fittedParams2);
    let aic3 = AIC(data, MSE3, fittedParams3);

    expect(aic2).toBeLessThan(aic1);
    expect(aic2).toBeLessThan(aic3);
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

    let aic1 = AIC(data, MSE1, fittedParams1);
    let aic2 = AIC(data, MSE2, fittedParams2);
    let aic3 = AIC(data, MSE3, fittedParams3);
    
    expect(aic1).toBeLessThan(aic3);
    expect(aic2).toBeLessThan(aic3);
  });
});
