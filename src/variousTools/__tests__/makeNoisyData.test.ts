import makeNoisyData from '../makeNoisyData';
import { writeFileSync } from 'fs';
import { join } from 'path';

describe('makeNoisyData', () => {
  it('BET', () => {
    let data = makeNoisyData([2, 5], 100, 300, 'BET');
    writeFileSync(
      join(__dirname, '../../../examples/data.json'),
      JSON.stringify(data),
    );
  });
});
