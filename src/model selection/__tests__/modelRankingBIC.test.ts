import makeNoisyData from '../../../dev tools/makeNoisyData';
import modelRankingBIC from '../modelRankingBIC';

describe('testing mondelRanking, please work', () => {
  it('langmuirSingle', () => {
    let fnName = 'langmuirSingle';
    let data = makeNoisyData([2, 7], 10, 1000000, fnName);
    let ranking = modelRankingBIC(data);
    console.log(fnName, ':\n', ranking);
  });
  it('langmuirDouble', () => {
    let fnName = 'langmuirDouble';
    let data = makeNoisyData([1, 3, 2, 0.1], 20, 1000000, fnName);
    let ranking = modelRankingBIC(data);
    console.log(fnName, ':\n', ranking);
  });
  it('langmuirDouble', () => {
    let fnName = 'langmuiTriple';
    let data = makeNoisyData([1, 3, 2, 0.1], 20, 1000000, fnName);
    let ranking = modelRankingBIC(data);
    console.log(fnName, ':\n', ranking);
  });
});
