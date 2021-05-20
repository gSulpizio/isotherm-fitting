import { getParams } from '../getParams';
const SG = require('ml-savitzky-golay-generalized');

//import SG from 'ml-savitzky-golay-generalized'; //doesn't work in ts??

//import { MolecularFluid, getProperties } from 'fluid-properties';

//inputOptions has to be fixed so that the input is either the input or a default value

//monolayer adsorbed gas quantity: v_m=1/(Slope+intercept)
//BET constant c=1+slope/intercept
//Total surface area: S_total=v_m*N*s/V where N is the avogadro number, s is the adsorption cross section of the adsorbate, V the molar volume of the adsorbate gas (STP)
//Ideal gas: molar volume of the adsorbate gas=V/n=R*T/p
//specific surface area: S_BET=S_total/alpha where alpha is the mass of the solid sample or adsorbent

export default function BETFitLinearSingle(data: { x: number[]; y: number[] }) {
  //let fluidProperties = getProperties(gasName, temperature);

  //let newData=BETCriteria(data, SATURATIONPRESSURE)

  return getParams({
    x: data.x.slice(0, Math.ceil(data.x.length / 3)),
    y: data.y.slice(0, Math.ceil(data.x.length / 3)),
  });
}
