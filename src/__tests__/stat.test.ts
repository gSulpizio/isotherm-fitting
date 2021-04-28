import BETFit from '../BETFitLinear';
import { BETFunction, langmuirSingleFunction } from '../modelFunctions';

import { writeFileSync } from 'fs';
import { join } from 'path';
describe('test BET fit', () => {
  it.only('simulated dataSet, test linear fit and deduced BET area', () => {
    let n = 100;
    let x = Array.from(Array(n).keys());
    x.map((x) => x / n);
    let data: { x: number[]; y: number[] } = {
      x: x,
      y: x.map((item) => langmuirSingleFunction([2, 5])(item)),
    };

    const R = 8.31446261815324; //m^3⋅Pa⋅K^−1⋅mol^−1

    let [V1, s1] = [(R * 273.15) / 1, 0.162 * Math.pow(10, -18)]; //s:[m^2]
    let idealResults = BETFit(data, V1, s1);

    let [V, s] = [(R * 273.15) / 1, 0.162 * Math.pow(10, -18)]; //s:[m^2]
    let x1: number[] = [];
    let y1: number[] = [];
    let results: any;
    let stat = { x1, y1 };
    for (let i = 0; i < 10000; i++) {
      data.y = data.y.map((item) => (randomGaussian() / 100 + 1) * item);
      stat.x1.push(BETFit(data, V, s).SBET / idealResults.SBET);
      stat.y1.push(i);
    }

    //writeFileSync(join(__dirname, '../../examples/BETFit.json'),JSON.stringify(dataSet));

    //writing results to plot
    writeFileSync(
      join(__dirname, '../../examples/stat.json'),
      JSON.stringify(stat),
    );
  });
});

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
