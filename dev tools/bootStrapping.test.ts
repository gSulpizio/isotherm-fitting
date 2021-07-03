import makeNoisyData from './makeNoisyData';
import bootStrapping from './bootStrapping';

test('test bootstrapping for langmuir double function', () => {
  let data = makeNoisyData([2, 4, 8, 7], 150, 10000, 'langmuirDouble');
  let newData = bootStrapping(data);
  console.log(data, newData);
});
