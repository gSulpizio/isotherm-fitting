import isotherm from './isotherm';

export default interface aggregatedData extends Array<isotherm> {} //this is the only way that I found to have push, length etc. in the interface, sorry :/
