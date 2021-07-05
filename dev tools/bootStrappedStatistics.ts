import makeNoisyDataLoose from './makeNoisyDataLoose';
import bootStrapping from './bootStrapping';
import BETFitDoubleWeighted from '../src/BET/BETFitLinearDoubleWeighted';
export default function bootStrappedStatistics(
  numberTimes: number,
  {
    numberPoints = 150,
    parameters = [4, 5],
    functionName = 'langmuirSingle',
    noise = 10000,
  },
) {
  let data = [];
  for (let i = 0; i < numberTimes; i++) {
    data[i] = bootStrapping(
      makeNoisyDataLoose(parameters, numberPoints, noise, functionName),
    );
    data[i].BET = BETFitDoubleWeighted(data[i]);
  }
  return data;
}
