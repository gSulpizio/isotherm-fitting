import langmuirSingleFunction from '../../../modelFunctions/langmuirSingleFunction';
/**
 *generates a langmuir single site isotherm with random gaussian noise
 * @param {Array} [KH,nm] langmuir parameters
 * @param {number} n amount of points
 * @param {number} radius intensity of the noise, bigger number means smaller noise
 * @returns {dataXY} data object
 */
export default function makeNoisyData(
  [KH, nm]: number[],
  n: number,
  radius = 100,
) {
  let x = [...Array(n).keys()];
  x = x.map((x) => x / n);
  let data: { x: number[]; y: number[] } = {
    x: x,
    y: x.map((item) => langmuirSingleFunction([KH, nm])(item)),
  };
  data.y = data.y.map((item) => (randomGaussian() / radius + 1) * item);
  return data;
}

/**
 * Generates a random number following a normal distribution
 * @returns {number}  random number
 */
function randomGaussian() {
  return (
    Math.sqrt(-2 * Math.log(Math.random())) *
    Math.cos(2 * Math.PI * Math.random())
  );
}