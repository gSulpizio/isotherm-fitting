/**
 * from https://en.wikipedia.org/wiki/Pearson_correlation_coefficient, calculates the r squared coefficient
 * if yMean is the mean value of y and yi is the i-th data point and fi the i-th simulated (or projected) data point:
 *
 * @param {dataXY} data data object
 * @param {function} fn function taking x and returning y
 * @returns r**2
 */

export default function regressionScore(
  data: { x: number[]; y: number[] },
  fn: any,
) {
  let ySimulated = data.x.map((a) => fn(a));

  let ySum = data.y.reduce((a, b) => a + b);
  let ySimulatedSum = ySimulated.reduce((a, b) => a + b);
  let ySumSquared = 0; //reduce((a,b)=>a+b**2 doesn't work somehow)
  let ySimulatedSumSquared = 0;
  let xy = 0;
  for (let i = 0; i < data.x.length; i++) {
    xy += data.y[i] * ySimulated[i];
    ySumSquared += data.y[i] ** 2;
    ySimulatedSumSquared += ySimulated[i] ** 2;
  }

  let rValue =
    (data.x.length * xy - ySimulatedSum * ySum) /
    Math.sqrt(
      (data.x.length * ySimulatedSumSquared - ySimulatedSum ** 2) *
        (data.x.length * ySumSquared - ySum ** 2),
    );

  return rValue ** 2;
}
