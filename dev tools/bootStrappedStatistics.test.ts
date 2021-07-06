import { writeFileSync } from 'fs';
import { join } from 'path';
import bootStrappedStatistics from './bootStrappedStatistics';
import makeNoisyDataLoose from './makeNoisyDataLoose';
import isotherm from '../src/isotherm';
import aggregatedData from '../src/aggregatedData';

test('test bootstrapping for langmuir double function', () => {
  let n = 10000;

  let numberPoints = 150,
    parameters = [4, 5],
    functionName = 'langmuirSingle',
    noise = 10000;

  let data = makeNoisyDataLoose(parameters, numberPoints, noise, functionName);
  let newData: aggregatedData = bootStrappedStatistics(n, data);
  let vm = [];
  for (let i = 0; i < newData.length; i++) {
    vm.push(newData[i]?.BET?.vm);
  }
  console.log(vm);
  writeFileSync(
    join(__dirname, '../examples/BETvm.json'),
    JSON.stringify(newData),
  );
});
