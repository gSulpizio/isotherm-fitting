import getConstants from '../getConstants';
describe('test getConstants', () => {
  it('R', () => {
    let R = getConstants('R');
    expect(R).toStrictEqual(0.00831446261815324);
  });
});
