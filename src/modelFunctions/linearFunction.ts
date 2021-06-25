//BET function
/**
 *
 * @param {Array}  [m,p] : array with the slope and intercept
 * @returns {function} linear function
 */
export default function linearFunction([slope, intercept]: number[]) {
  return (x: number) => slope * x + intercept;
}
