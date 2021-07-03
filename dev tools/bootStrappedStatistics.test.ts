import makeNoisyData from './makeNoisyData';
import bootStrappedStatistics from './bootStrappedStatistics';
import isotherm from '../src/isotherm'

test('test bootstrapping for langmuir double function', () => {
  let n=20
  let newData = bootStrappedStatistics(n,{noise:50});
  for(let i=0;i<newData.length;i++){
  console.log(newData[i].BET.vm);
}
});
