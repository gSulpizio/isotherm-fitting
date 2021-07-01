import getSlopes from '../getSlopes';

describe('test getSlopes', () => {
  it('simple generated line', () => {
    let data = [
      { lnP: [2], T: 0.5, pSat: 1 },
      { lnP: [8], T: 0.25, pSat: 1 },
    ];
    let regression = getSlopes(data, 0);
    expect(regression.slope).toStrictEqual(3);
    expect(regression.intercept).toStrictEqual(-4);
  });
});
