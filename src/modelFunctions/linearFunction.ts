//BET function
/**
 * Returns a linear function
 * @param {Array}  [m,p] : array with the slope and intercept
 * @returns {function} linear function
 */
export default function linearFunction([m, p]: number[]) {
  return (x: number) => m * x + p;
}
