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
  tolerance: number = 0.001,
) {
  let error = 10 * tolerance;
  let middle: number = highPoint;
  let y: number;
  while (error > tolerance) {
    middle = (lowPoint + highPoint) / 2;
    y = fn(middle);
    error = Math.abs(y - value);
    if (y > value) {
      highPoint = middle;
      continue;
    }
    lowPoint = middle;
  }
  return middle;
}
