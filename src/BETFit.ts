import LM from 'ml-levenberg-marquardt';
import { BETFunction } from './modelFunctions';
//import { MolecularFluid, getProperties } from 'fluid-properties';

//inputOptions has to be fixed so that the input is either the input or a default value

export default function BETFit(
  data: { x: number[]; y: number[] },
  gasName: string,
  temperature: number,
  inputOptions: object = {},
) {
  let options = {
    damping: 10e-2,
    gradientDifference: 10e-2,
    maxIterations: 10000,
    errorTolerance: 10e-3,
    initialValues: initialGuess(data),
  };

  //let fluidProperties = getProperties(gasName, temperature);
  console.log(BETCriteria(data, Math.max(...data.y)));
  //let newData=BETCriteria(data, SATURATIONPRESSURE)
  let fittedParams = LM(data, BETFunction, options);

  return fittedParams;
}

/**
 * initial Guess
 * @param {{x:Array<number>, y:Array<number>}} data - Array of points to fit in the format [x1, x2, ... ], [y1, y2, ... ]
 * @returns {array} initial guess:[C, nm, N]
 */
function initialGuess(data: { x: number[]; y: number[] }) {
  let saturationLoading = 1.1 * Math.max(...data.y);
  let C = data.y[0] / data.x[0] / (saturationLoading - data.y[0]);
  return [C, saturationLoading, 0.01];
}
/**
 * function applying consistency criteria
 * @param {{x:Array<number>, y:Array<number>}} data - Array of points to fit in the format [x1, x2, ... ], [y1, y2, ... ]
 * @param {number} p0 - saturation pressure
 * @param {object} fittedParams - ouput of LM function
 */
function BETCriteria(data: { x: number[]; y: number[] }, p0: number) {
  let pOverp0 = (p: number, N: number) => N * p0 * (1 - p / p0); //p=data.x, N=data.y

  //1st criteria :
  let x: number[] = [data.x[0]];
  let y: number[] = [data.y[0]];
  let count = 1;
  let highest = 0;
  let longestX: number[];
  let longestY: number[];
  for (let i = 1; i < data.x.length; i++) {
    x.push(data.x[i]);
    y.push(data.y[i]);
    count += 1;
    if (pOverp0(data.x[i], data.y[i]) > pOverp0(data.x[i - 1], data.y[i - 1])) {
      if (count > highest || (i === data.x.length - 1 && !longestX)) {
        highest = count;
        longestX = x;
        longestY = y;
      }
      x = [];
      y = [];
      count = 0;
    }
  }
  return { x: longestX, y: longestY };
}
