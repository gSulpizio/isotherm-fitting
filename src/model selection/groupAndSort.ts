import getMSEstd from './getMSEstd';
import looseData from './looseData';

export default function groupAndSort(sortedModels: looseData, method: string) {
  let groupName = 'group' + method;
  let group = 1;
  let errorBar = getMSEstd(sortedModels);
  console.log(errorBar);
  for (let i = 0; i < sortedModels.length; i++) {
    sortedModels[i][groupName] = group;
    if (i < sortedModels.length - 1) {
      if (
        Math.abs(sortedModels[i][method] - sortedModels[i + 1][method]) >
        errorBar
      ) {
        group++;
      }
    }
  }
  /** 
  group = 1;
  let didSort = true;
  let savedInex = 0;
  while (didSort) {
    for (let i = 0; i < sortedModels.length; i++) {
      if (
        sortedModels[i].fittedParameters.length >
          sortedModels[i + 1].fittedParameters.length &&
        sortedModels[i][groupName] === sortedModels[i + 1][groupName]
      ) {
        savedInex = i;
      }
    }
  }
*/
  sortedModels.sort(function (a, b) {
    return (
      a[groupName] - b[groupName] ||
      a.fittedParameters.length - b.fittedParameters.length
    );
  });
  return sortedModels;
}
