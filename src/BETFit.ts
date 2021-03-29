import LM from 'ml-levenberg-marquardt';
import { BETFunction } from './modelFunctions';

//import SG from 'ml-savitzky-golay-generalized'; //doesn't work in ts??

//import { MolecularFluid, getProperties } from 'fluid-properties';

//inputOptions has to be fixed so that the input is either the input or a default value!!!!!!!!!!!!!!!!!!!!

export default function BETFit(
  data: { x: number[]; y: number[] },
  inputOptions: object = {},
) {
  //convert to relative pressure:
  let relativeData = {
    x: data.x.map((x) => x / Math.max(...data.x)),
    y: data.y,
  };
  //if first pressure point is 0, delete that point:
  if (data.x[0] === 0) {
    relativeData.x.shift();
    relativeData.y.shift();
  }
  //delete last (highest) pressure:
  relativeData.x.pop();
  relativeData.y.pop();
  //create weight array:
  let weightVector = [];

  weightVector = BETweight(relativeData);

  let options = {
    damping: 10e-2,
    gradientDifference: 10e-2,
    maxIterations: 10000,
    errorTolerance: 10e-3,
    initialValues: initialGuess(relativeData),
    //weights: weightVector,
  };

  let fittedParams = LM(relativeData, BETFunction, options);
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
  return [C, saturationLoading];
}
/**
 * function applying consistency criteria
 * @param {{x:Array<number>, y:Array<number>}} data - Array of points to fit in the format [x1, x2, ... ], [y1, y2, ... ]
 * @param {number} p0 - saturation pressure
 * @param {object} fittedParams - ouput of LM function
 */
function BETCriteria(data: { x: number[]; y: number[] }, p0: number) {
  let pConsistent = (p: number, N: number) => N * p0 * (1 - p / p0); //p=data.x, N=data.y

  //1st criteria, searches longest sequence where N*Po(1 − P/Po) increases monotonically with P:
  let x: number[] = [data.x[0]];
  let y: number[] = [data.y[0]];
  let count = 1;
  let highest = 0;
  let longestX = [data.x[0]];
  let longestY = [data.y[0]];

  for (let i = 1; i < data.x.length; i++) {
    if (
      pConsistent(data.x[i], data.y[i]) >
      pConsistent(data.x[i - 1], data.y[i - 1])
    ) {
      if (count > highest) {
        highest = count;
        longestX = x;
        longestY = y;
      }

      x = [];
      y = [];
      count = 0;
    }
    x.push(data.x[i]);
    y.push(data.y[i]);

    count += 1;
    if (i === data.x.length - 1 && count > highest) {
      longestX = x;
      longestY = y;
    }
  }
  return { x: longestX, y: longestY };
}

/**
 * returns weight of a data point according to (eq. 11): doi:10.1016/j.micromeso.2011.05.022 (https://doi.org/10.1016/j.micromeso.2011.05.022)
 * first and last data-point get a weight of 0
 * @param {{x:Array<number>, y:Array<number>}} data - Array of points to fit in the format [x1, x2, ... ], [y1, y2, ... ] where the x points represent relative pressure
 * @returns {number} weight of data point
 */
function BETweight(data: { x: number[]; y: number[] }) {
  let weight = [0];
  for (let i = 0; i < data.x.length - 1; i++) {
    weight.push(
      (Math.sqrt(
        (data.x[i] - data.x[i - 1]) ** 2 + (data.y[i] - data.y[i - 1]) ** 2,
      ) +
        Math.sqrt(
          (data.x[i] - data.x[i + 1]) ** 2 + (data.y[i] - data.y[i + 1]) ** 2,
        )) /
        2,
    );
  }
  weight.push(0);
  return weight;
}
