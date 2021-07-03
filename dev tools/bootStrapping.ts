import { xySortX , xyUniqueX} from 'ml-spectra-processing';
/**
 * returns bootstrapped data, calls sort algorithm to have it in the same order again
 * @param {Object} dataSet data set object
 */
export default function bootStrapping(dataSet:any) {
  let setLength = dataSet.x.length;
  let bootStrappedData = { x: [], y: [] } as any;
  let index: number;
  for (let i = 0; i < setLength; i++) {
    index = Math.floor(Math.random() * dataSet.x.length * 0.9999999); //*0.99999 is to not get the length iself as that doesn't exist
    bootStrappedData.x.push(dataSet.x[index]);
    bootStrappedData.y.push(dataSet.y[index]);
  }
  let sortedData= xyUniqueX(dataSet, { isSorted: false })
  return sortedData;
}
