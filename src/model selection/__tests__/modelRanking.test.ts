import makeNoisyData from '../../../dev tools/makeNoisyData';
import modelRanking from '../modelRanking';

describe('testing mondelRanking, BIC', () => {
  let method = 'BIC';
  it('langmuirSingle', () => {
    let fnName = 'langmuirSingle';
    let data = makeNoisyData([2, 7], 10, 1000000, fnName);
    let ranking = modelRanking(data, method);
    console.log(fnName, ':\n', ranking);
  });
  it('langmuirDouble', () => {
    let fnName = 'langmuirDouble';
    let data = makeNoisyData([1, 3, 2, 0.1], 20, 1000000, fnName);
    let ranking = modelRanking(data, method);
    console.log(fnName, ':\n', ranking);
  });
  it('langmuirTriple', () => {
    let fnName = 'langmuirTriple';
    let data = makeNoisyData([1, 3, 2, 2, 8, 0.1], 20, 1000000, fnName);
    let ranking = modelRanking(data, method);
    console.log(fnName, ':\n', ranking);
  });
  it('BETDirect', () => {
    let fnName = 'BET';
    let data = makeNoisyData([1, 3, 0.06], 20, 1000000, fnName);
    let ranking = modelRanking(data, method);
    console.log(fnName, ':\n', ranking);
  });
});
describe('testing mondelRanking, AIC', () => {
  let method = 'AIC';
  it('langmuirSingle', () => {
    let fnName = 'langmuirSingle';
    let data = makeNoisyData([2, 7], 10, 1000000, fnName);
    let ranking = modelRanking(data, method);
    console.log(fnName, ':\n', ranking);
  });
  it('langmuirDouble', () => {
    let fnName = 'langmuirDouble';
    let data = makeNoisyData([1, 3, 2, 0.1], 20, 1000000, fnName);
    let ranking = modelRanking(data, method);
    console.log(fnName, ':\n', ranking);
  });
  it('langmuirTriple', () => {
    let fnName = 'langmuirTriple';
    let data = makeNoisyData([1, 3, 2, 2, 8, 0.1], 20, 1000000, fnName);
    let ranking = modelRanking(data, method);
    console.log(fnName, ':\n', ranking);
  });
  it('BETDirect', () => {
    let fnName = 'BET';
    let data = makeNoisyData([1, 3, 0.06], 20, 1000000, fnName);
    let ranking = modelRanking(data, method);
    console.log(fnName, ':\n', ranking);
  });
});
