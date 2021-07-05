import { writeFileSync } from 'fs';
import { join } from 'path';
import bootStrappedStatistics from './bootStrappedStatistics';

test('test bootstrapping for langmuir double function', () => {
  let n = 10000;
  let newData = bootStrappedStatistics(n, { noise: 50 });
  let vm = [];
  for (let i = 0; i < newData.length; i++) {
    vm.push(newData[i].BET.vm);
  }
  writeFileSync(
    join(__dirname, '../examples/BETvm.json'),
    JSON.stringify(newData),
  );
});
