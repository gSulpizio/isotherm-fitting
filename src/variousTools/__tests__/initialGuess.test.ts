import initialGuess from '../initialGuess';

describe('test initial guess', () => {
  let data = [
    { x: [0, 0.1], y: [0, 0.4], T: 273 },
    { x: [0.2, 0.4], y: [0.5, 0.9], T: 293 },
  ];
  it.only('initialGuess langmuir Single', () => {
    let result = initialGuess(data, 'langmuirSingle');

    expect(result).toStrictEqual([
      data[0].y[1] / data[0].x[1] / (1.1 * 0.4 - 0),
      data[1].y[0] / data[1].x[0] / (1.1 * 0.9 - 0.5),
      1.1 * 0.9,
    ]);
    expect(result).toHaveLength(3);
  });
  it.only('initialGuess langmuir Double', () => {
    let result = initialGuess(data, 'langmuirDouble');
    expect(result).toHaveLength(6);
  });
  it.only('initialGuess langmuir Triple', () => {
    let result = initialGuess(data, 'langmuirTriple');
    expect(result).toHaveLength(9);
  });
  it.only('initialGuess BET', () => {
    let result = initialGuess(data, 'BET');
    expect(result).toHaveLength(4);
  });
});
