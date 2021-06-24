/**
 * from https://en.wikipedia.org/wiki/Coefficient_of_determination, calculates the r squared coefficient
 * if yMean is the mean value of y and yi is the i-th data point and fi the i-th simulated (or projected) data point:
 *
 * yMean=1/n*sum(yi)
 *
 * SStot=sum((yi-yMean)^2)
 *
 * SSres=sum((yi-fi)^2)
 *
 * Hence:
 *
 * rSquared=1-SSres/SStot
 *
 * @param {dataXY} data data object
 * @param {function} fn function taking x and returning y
 * @returns r**2
 */

export default function regressionScore(
  data: { x: number[]; y: number[] },
  fn: any,
) {
  let yMean = data.y.reduce((a, b) => a + b) / data.y.length;
  let SStot = 0;
  let SSres = 0;

  for (let i = 0; i < data.x.length; i++) {
    SStot += (data.y[i] - yMean) ** 2;
    SSres += (data.y[i] - fn(data.x[i])) ** 2;
  }
  return 1 - SSres / SStot;
}
