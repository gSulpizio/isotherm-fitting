import bootStrapping from './bootStrapping';
import BETFitDoubleWeighted from '../../src/BET/BETFitLinearDoubleWeighted';
import isotherm from '../../src/isotherm';
import aggregatedData from '../../src/aggregatedData';
import BETFitLinearDouble from '../../src/BET/BETFitLinearDouble';
export default function bootStrappedStatistics(
  numberTimes: number,
  data: isotherm,
) {
  let newData: aggregatedData = [];
  for (let i: keyof aggregatedData = 0; i < numberTimes; i++) {
    newData[i] = bootStrapping(data);
    //newData[i].BET = BETFitDoubleWeighted(newData[i]);
    newData[i].BET = BETFitLinearDouble(newData[i]);
  }
  return newData;
}
