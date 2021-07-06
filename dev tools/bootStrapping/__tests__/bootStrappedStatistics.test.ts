import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';
import bootStrappedStatistics from '../bootStrappedStatistics';
import makeNoisyDataLoose from '../../makeNoisyDataLoose';
import aggregatedData from '../../../src/aggregatedData';
import isotherm from '../../../src/isotherm';

describe('test bootstrapping', () => {
  it('for langmuir single function', () => {
    let n = 10000;

    let numberPoints = 150,
      parameters = [4, 5],
      functionName = 'langmuirSingle',
      noise = 10000;

    let data = makeNoisyDataLoose(
      parameters,
      numberPoints,
      noise,
      functionName,
    );
    let newData: aggregatedData = bootStrappedStatistics(n, data);
    let vm = [];
    for (let i = 0; i < newData.length; i++) {
      vm.push(newData[i]?.BET?.vm);
    }
    console.log(vm);
    writeFileSync(
      join(__dirname, '../examples/BETvm.json'),
      JSON.stringify(newData),
    );
  });
  it.only('loadData', () => {
    let n = 10000;
    let file = readFileSync(join(__dirname, '../../data/M_BTT/MBTT CO2.json'));

    let rawData = JSON.parse(file.toString());

    //var xlsx = XLSX.read(readFileSync(join(__dirname, '../../data/M_BTT/MBTT CO2.xlsx')),{ type: 'buffer' },);
    //console.log(rawData[0].FeBTT);
    let isotherm1: isotherm = getIsotherm(rawData, 0);
    let isotherm2: isotherm = getIsotherm(rawData, 3);
    let isotherm3: isotherm = getIsotherm(rawData, 6);
    let data: aggregatedData = [isotherm1, isotherm2, isotherm3];
    let bootStrappedData: aggregatedData = bootStrappedStatistics(n, isotherm1);
    let vm = [];
    for (let i = 0; i < bootStrappedData.length; i++) {
      vm.push(bootStrappedData[i]?.BET?.vm);
    }
    console.log(vm);
    writeFileSync(
      join(__dirname, '../../../examples/BETvm.json'),
      JSON.stringify(bootStrappedData),
    );
  });
});

function getIsotherm(rawData: any, firstCol: number) {
  let x = [];
  let y = [];
  let keyP = Object.keys(rawData[0])[firstCol];
  let keyN = Object.keys(rawData[0])[firstCol + 1];
  let T = parseInt(keyN);
  for (let i = 1; i < rawData.length; i++) {
    x.push(rawData[i][keyP]);
    y.push(rawData[i][keyN]);
  }
  let newData: isotherm = { x: x, y: y, T: T };
  return newData;
}
