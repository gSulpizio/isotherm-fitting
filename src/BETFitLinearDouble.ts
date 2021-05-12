import LM from 'ml-levenberg-marquardt';
import { BETFunction } from './modelFunctions';
import SimpleLinearRegression from 'ml-regression-simple-linear';
const SG = require('ml-savitzky-golay-generalized');

//double fit: once the function is fitted, the
//monolayer adsorbed gas quantity: v_m=1/(Slope+intercept)
//BET constant c=1+slope/intercept
//Total surface area: S_total=v_m*N*s/V where N is the avogadro number, s is the adsorption cross section of the adsorbate, V the molar volume of the adsorbate gas (STP)
//Ideal gas: molar volume of the adsorbate gas=V/n=R*T/p
//specific surface area: S_BET=S_total/alpha where alpha is the mass of the solid sample or adsorbent

export default function BETFitLinear(data: { x: number[]; y: number[] }) {
  //let fluidProperties = getProperties(gasName, temperature);

  //let newData=BETCriteria(data, SATURATIONPRESSURE)
  let options = {
    damping: 10e-2,
    gradientDifference: 10e-2,
    maxIterations: 10000,
    errorTolerance: 10e-3,
    initialValues: initialGuess(data),
  };

  let fittedParams = LM(data, BETFunction, options);
  console.log(fittedParams);
  //let newData = {x: data.x,y: data.x.map((x) => BETFunction(fittedParams)(x)),};
  return getParams({
    x: data.x.slice(0, Math.ceil(data.x.length / 3)),
    y: data.y.slice(0, Math.ceil(data.x.length / 3)),
  });
}

function getParams(data: { x: number[]; y: number[] }): any[] {
  let newData = { x: [...data.x], y: [...data.y] };
  const regression = new SimpleLinearRegression(newData.x, newData.y);
  const score = (x: number[], y: number[]) => regression.score(x, y);
  if (
    newData.x.length < 5 ||
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

function initialGuess(data: { x: number[]; y: number[] }) {
  let saturationLoading = 1.1 * Math.max(...data.y);
  let KH =
    data.y[0] / data.x[0] / (saturationLoading - data.y[0]) ||
    data.y[1] / data.x[1] / (saturationLoading - data.y[1]);
  let N = 0.1;
  return [KH, saturationLoading, N];
}
