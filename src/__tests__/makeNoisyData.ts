import { langmuirSingleFunction } from '../modelFunctions';
export default function makeNoisyData(n: number) {
  let x = [...Array(n).keys()];
  let data: { x: number[]; y: number[] } = {
    x: x,
    y: x.map((item) => langmuirSingleFunction([2, 5])(item)),
  };
  data.y = data.y.map((item) => (randomGaussian() / 100 + 1) * item);
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
