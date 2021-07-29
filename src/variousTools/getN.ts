/**
 * returns the n number to be used in initial guess, to account for the fact that there are more or less variables needed depending on the fit
 * @param {string} functionName string containing the name of the desired function
 * @returns {number} n to be used for the initial guess
 */
export default function getN(functionName: string) {
  switch (functionName) {
    case 'langmuirSingle':
      return 1;
    case 'langmuirDouble':
      return 2;
    case 'langmuirTriple':
      return 3;
    case 'BET':
      return 1;
    case 'linearFunction':
      return 1;
    default:
      throw 'getN: FUNCTION NAME NOT RECOGNIZED';
  }
}
