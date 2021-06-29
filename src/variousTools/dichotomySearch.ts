/**
 * For a function f(x)=y, searches for x by taking y as an imput. This works only for strictly monotonous functions.
 * @param {function} fn function as mentioned above
 * @param {number} value target value y as mentioned above
 * @param {number} lowPoint x value that has to give a y below the target value
 * @param {number} highPoint x value that has to give a y above the target value
 * @param {number} tolerance error tolerance below which the value is accepted and returned
 * @returns {number} x value
 */
export default function dichotomySearch(
  fn: any,
  value: number,
  lowPoint: number,
  highPoint: number,
  tolerance: number = 10 ** -5,
) {
  let error = 10 * tolerance;
  let middle: number = highPoint;
  let yMiddle: number;
  let yHigh: number;
  let yLow: number;
  while (error > tolerance) {
    middle = (lowPoint + highPoint) / 2;
    yMiddle = fn(middle);
    yHigh = fn(highPoint);
    yLow = fn(lowPoint);
    error = Math.abs(yMiddle - value);
    if ((yLow > value && yHigh > value) || (yLow < value && yHigh < value)) {
      throw 'dichotomySearch: function not monotonous!!';
    } else if (yMiddle > value && yLow < value) {
      highPoint = middle;
      continue;
    } else if (yMiddle > value && yLow > value) {
      lowPoint = middle;
    } else if (yMiddle < value && yLow < value) {
      lowPoint = middle;
    } else if (yMiddle < value && yLow > value) {
      highPoint = middle;
    }
  }
  return middle;
}
