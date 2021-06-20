import langmuirSingleFunction from '../modelFunctions/langmuirSingleFunction';
import langmuirDoubleFunction from '../modelFunctions/langmuirDoubleFunction';
import langmuirTripleFunction from '../modelFunctions/langmuirTripleFunction';
import BETFunction from '../modelFunctions/BETFunction';
/**
 * Returns the function indicated in the string
 * @param {string} functionName string containing the name of the function to be used
 */

export default function langmuirSingleLoss(functionName: string) {
  switch (functionName) {
    case 'langmuirSingle':
      return langmuirSingleFunction;
    case 'langmuirDouble':
      return langmuirDoubleFunction;
    case 'langmuirTriple':
      return langmuirTripleFunction;
    case 'BET':
      return BETFunction;
    default:
      throw 'getFunction: FUNCTION NAME NOT RECOGNIZED';
  }
}
