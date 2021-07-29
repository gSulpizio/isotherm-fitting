import isotherm from './isotherm';
/**
 * Interface of aggregated data, which is an array of multiple isotherms (ex: same sample at different temperatures)
 */
export default interface aggregatedData extends Array<isotherm> {
  isostericHeat?: number[];
} //this is the only way that I found to have push, length etc. in the interface, sorry :/
