import LM from 'ml-levenberg-marquardt';

import { initialGuess, getParams } from '../getParams';
import BETFunction from '../modelFunctions/BETFunction';

//double fit: once the function is fitted, the
//monolayer adsorbed gas quantity: v_m=1/(Slope+intercept)
//BET constant c=1+slope/intercept
//Total surface area: S_total=v_m*N*s/V where N is the avogadro number, s is the adsorption cross section of the adsorbate, V the molar volume of the adsorbate gas (STP)
//Ideal gas: molar volume of the adsorbate gas=V/n=R*T/p
//specific surface area: S_BET=S_total/alpha where alpha is the mass of the solid sample or adsorbent

export default function BETFitLinearDouble(data: { x: number[]; y: number[] }) {
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
  let newData = {
    x: data.x,
    y: data.x.map((x) => BETFunction(fittedParams.parameterValues)(x)),
  };
  return getParams({
    x: data.x.slice(0, Math.ceil(newData.x.length / 3)),
    y: data.y.slice(0, Math.ceil(newData.x.length / 3)),
  });
}
