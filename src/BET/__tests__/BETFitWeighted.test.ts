import makeNoisyData from '../../variousTools/__tests__/generateData/makeNoisyData';
import BETFitWeighted from '../BETFitWeighted';

describe('test BET fit weighted', () => {
  it('simulated dataSet, test weighted fit and deduced BET area', () => {
    let data = makeNoisyData([2, 5], 100);

    let output = BETFitWeighted(data);

    //If we remove the next line it works, parameterValues is a parameter of results.
    console.log(output.result.parameterValues);

    //let fittedResults = data.x.map((x) => BETFunction(results.parameterValues));

    //writeFileSync(join(__dirname, '../../examples/data.json'),JSON.stringify(data),);
    //writeFileSync(join(__dirname, '../../examples/dataFIT.json'),JSON.stringify(data),);

    //let simulated = data.x.map((item) => item * results.regression.slope + results.regression.intercept);
  });
});
