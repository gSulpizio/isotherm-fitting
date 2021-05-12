import main from '../main';
import { BETFunction, langmuirSingleFunction } from '../modelFunctions';

import { writeFileSync } from 'fs';
import { join } from 'path';
import BETFitLinear from '../BETFitLinear';

describe('test BET fit', () => {
  it('simulated dataSet, test linear fit and deduced BET area', () => {
    let x = [...Array(100).keys()];
    let data: { x: number[]; y: number[] } = {
      x: x,
      y: x.map((item) => langmuirSingleFunction([2, 5])(item)),
    };
    data.y = data.y.map((item) => (randomGaussian() / 100 + 1) * item);
    const R = 8.31446261815324; //m^3⋅Pa⋅K^−1⋅mol^−1

    let [V, s] = [(R * 273.15) / 1, 0.162 * Math.pow(10, -18)]; //s:[m^2]
    //Here it's a weird error and i have to do this, how to efficiently counter that?
    let results: any = main(data, V, s, 'linearBET') || BETFitLinear(data);

    //writeFileSync(join(__dirname, '../../examples/BETFit.json'),JSON.stringify(dataSet));

    //writing results to plot
    writeFileSync(
      join(__dirname, '../../examples/data.json'),
      JSON.stringify(data),
    );

    let simulated = data.x.map(
      (item) => item * results.regression.slope + results.regression.intercept,
    );
    writeFileSync(
      join(__dirname, '../../examples/BETFit.json'),
      JSON.stringify({ x: data.x, y: simulated }),
    );
    writeFileSync(
      join(__dirname, '../../examples/BETFitSampled.json'),
      JSON.stringify({ x: results.sampledData.x, y: results.sampledData.y }),
    );
  });
  it('simulated dataSet, test linear fit and deduced BET area', () => {
    let x = [...Array(100).keys()];
    let data: { x: number[]; y: number[] } = {
      x: x,
      y: x.map((item) => langmuirSingleFunction([2, 5])(item)),
    };
    data.y = data.y.map((item) => (randomGaussian() / 100 + 1) * item);
    const R = 8.31446261815324; //m^3⋅Pa⋅K^−1⋅mol^−1

    let [V, s] = [(R * 273.15) / 1, 0.162 * Math.pow(10, -18)]; //s:[m^2]
    //Here it's a weird error and i have to do this, how to efficiently counter that?
    let results: any =
      main(data, V, s, 'linearDoubleBET') || BETFitLinear(data);

    //writeFileSync(join(__dirname, '../../examples/BETFit.json'),JSON.stringify(dataSet));

    //writing results to plot
    writeFileSync(
      join(__dirname, '../../examples/data.json'),
      JSON.stringify(data),
    );

    let simulated = data.x.map(
      (item) => item * results.regression.slope + results.regression.intercept,
    );
    writeFileSync(
      join(__dirname, '../../examples/BETFit.json'),
      JSON.stringify({ x: data.x, y: simulated }),
    );
    writeFileSync(
      join(__dirname, '../../examples/BETFitSampled.json'),
      JSON.stringify({ x: results.sampledData.x, y: results.sampledData.y }),
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

describe('test BET fit Weighted', () => {
  it('test BET Fit Weighted', () => {
    let x = [...Array(100).keys()];
    let data: { x: number[]; y: number[] } = {
      x: x,
      y: x.map((item) => langmuirSingleFunction([2, 5])(item)),
    };
    //data.y = data.y.map((item) => (randomGaussian() / 100 + 1) * item);
    const R = 8.31446261815324; //m^3⋅Pa⋅K^−1⋅mol^−1

    let [V, s] = [(R * 273.15) / 1, 0.162 * Math.pow(10, -18)]; //s:[m^2]
    //Here it's a weird error and i have to do this, how to efficiently counter that?
    let results = main(data, V, s, 'weightedBET') || {
      regression: { slope: 0, intercept: 0 },
    };
    console.log(results);
    //writeFileSync(join(__dirname, '../../examples/BETFit.json'),JSON.stringify(dataSet));
    /*
    //writing results to plot
    writeFileSync(
      join(__dirname, '../../examples/data.json'),
      JSON.stringify(data),
    );
    let simulated = data.x.map(
      (item) => item * results.regression.slope + results.regression.intercept,
    );
    writeFileSync(
      join(__dirname, '../../examples/BETFit.json'),
      JSON.stringify({ x: data.x, y: simulated }),
    );*/
  });
});
