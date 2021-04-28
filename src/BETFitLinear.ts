import LM from 'ml-levenberg-marquardt';
import { BETFunction } from './modelFunctions';
import SimpleLinearRegression from 'ml-regression-simple-linear';
const SG = require('ml-savitzky-golay-generalized');

//import SG from 'ml-savitzky-golay-generalized'; //doesn't work in ts??

//import { MolecularFluid, getProperties } from 'fluid-properties';

//inputOptions has to be fixed so that the input is either the input or a default value

//monolayer adsorbed gas quantity: v_m=1/(Slope+intercept)
//BET constant c=1+slope/intercept
//Total surface area: S_total=v_m*N*s/V where N is the avogadro number, s is the adsorption cross section of the adsorbate, V the molar volume of the adsorbate gas (STP)
//Ideal gas: molar volume of the adsorbate gas=V/n=R*T/p
//specific surface area: S_BET=S_total/alpha where alpha is the mass of the solid sample or adsorbent

export default function BETFitLinear(
  data: { x: number[]; y: number[] },
  V: number,
  s: number,
  alpha = 1,
  inputOptions = {},
) {
  //let fluidProperties = getProperties(gasName, temperature);

  //let newData=BETCriteria(data, SATURATIONPRESSURE)
  let [sampledData, regression, score] = getParams({
    x: data.x.slice(0, Math.ceil(data.x.length / 2)),
    y: data.y.slice(0, Math.ceil(data.x.length / 2)),
  });
  const N = 6.022 * 10 ** 23;
  let vm = 1 / (regression.slope + regression.intercept);
  let Stotal = (vm * N * s) / V;
  let SBET = Stotal / alpha;
  return { sampledData, regression, score, Stotal, SBET };
}

function getParams(data: { x: number[]; y: number[] }): any[] {
  let newData = { x: [...data.x], y: [...data.y] };
  const regression = new SimpleLinearRegression(newData.x, newData.y);
  const score = (x: number[], y: number[]) => regression.score(x, y);
  if (
    newData.x.length < 4 ||
    regression.score(newData.x, newData.y).r2 > 0.99
  ) {
    return [data, regression, score]; //    TODO: interpolation should be implemented here
  }

  //make new dataset without last point
  let newDataPop: { x: number[]; y: number[] } = {
    x: [...newData.x],
    y: [...newData.y],
  };

  newDataPop.x.pop();
  newDataPop.y.pop();
  //make new dataset without last point
  let newDataShift: { x: number[]; y: number[] } = {
    x: [...newData.x],
    y: [...newData.y],
  };
  newDataShift.x.shift();
  newDataShift.y.shift();

  //new regression with shortened data
  const regressionPop = new SimpleLinearRegression(newDataPop.x, newDataPop.y);
  const regressionShift = new SimpleLinearRegression(
    newDataShift.x,
    newDataShift.y,
  );
  if (
    regressionPop.score(newDataPop.x, newDataPop.y).r2 >
    regressionShift.score(newDataShift.x, newDataShift.y).r2
  ) {
    return getParams(newDataPop);
  }

  return getParams(newDataShift);
}

/**
 * function applying consistency criteria             ////probably not useful anymore
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
