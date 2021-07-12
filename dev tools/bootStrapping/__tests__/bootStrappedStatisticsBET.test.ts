import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';
import bootStrappedStatistics from '../bootStrappedStatistics';
import makeNoisyDataLoose from '../../makeNoisyDataLoose';
import aggregatedData from '../../../src/aggregatedData';
import isotherm from '../../../src/isotherm';
import BETFitLinearDouble from '../../../src/BET/BETFitLinearDouble';
import BETFitLinearSingle from '../../../src/BET/BETFitLinearSingle';
import BETFitLinearDoubleWeighted from '../../../src/BET/BETFitLinearDoubleWeighted';
import langmuirTripleFit from '../../../src/langmuir/langmuirTripleFit';
import langmuirTripleFunction from '../../../src/modelFunctions/langmuirTripleFunction';

describe.only('test bootstrapping', () => {
  let n = 10000;
  let noise = 100;
  let numberPoints = 1000,
    parameters = [4, 5, 3, 6],
    functionName = 'langmuirDouble';
  let data = makeNoisyDataLoose(parameters, numberPoints, noise, functionName);
  it('for langmuir single function', () => {
    let newData: aggregatedData = bootStrappedStatistics(
      n,
      data,
      BETFitLinearSingle,
    );
    let vm = [];
    for (let i = 0; i < newData.length; i++) {
      vm.push(newData[i]?.BET?.vm);
    }
    console.log(vm);
    writeFileSync(
      join(__dirname, '../../../examples/BETvm0.json'),
      JSON.stringify(newData),
    );
  });
  it('for langmuir single function', () => {
    let newData: aggregatedData = bootStrappedStatistics(
      n,
      data,
      BETFitLinearDouble,
    );
    let vm = [];
    for (let i = 0; i < newData.length; i++) {
      vm.push(newData[i]?.BET?.vm);
    }
    console.log(vm);
    writeFileSync(
      join(__dirname, '../../../examples/BETvm1.json'),
      JSON.stringify(newData),
    );
  });
  it('for langmuir single function', () => {
    let newData: aggregatedData = bootStrappedStatistics(
      n,
      data,
      BETFitLinearDoubleWeighted,
    );
    let vm = [];
    for (let i = 0; i < newData.length; i++) {
      vm.push(newData[i]?.BET?.vm);
    }
    console.log(vm);
    writeFileSync(
      join(__dirname, '../../../examples/BETvm2.json'),
      JSON.stringify(newData),
    );
  });
});
describe('real data', () => {
  let n = 10000;
  it('BETFitLinearSingle', () => {
    let file = readFileSync(join(__dirname, '../../data/M_BTT/MBTT CO2.json'));

    let rawData = JSON.parse(file.toString());

    //var xlsx = XLSX.read(readFileSync(join(__dirname, '../../data/M_BTT/MBTT CO2.xlsx')),{ type: 'buffer' },);
    //console.log(rawData[0].FeBTT);
    let isotherm1: isotherm = getIsotherm(rawData, 0);
    let isotherm2: isotherm = getIsotherm(rawData, 3);
    let isotherm3: isotherm = getIsotherm(rawData, 6);
    let data: aggregatedData = [isotherm1, isotherm2, isotherm3];
    let bootStrappedData: aggregatedData = bootStrappedStatistics(
      n,
      isotherm1,
      BETFitLinearSingle,
    );
    let vm = [];
    for (let i = 0; i < bootStrappedData.length; i++) {
      vm.push(bootStrappedData[i]?.BET?.vm);
    }
    writeFileSync(
      join(__dirname, '../../../examples/BETvm0.json'),
      JSON.stringify(bootStrappedData),
    );
  });
  it('BETFitLinearDouble', () => {
    let file = readFileSync(join(__dirname, '../../data/M_BTT/MBTT CO2.json'));

    let rawData = JSON.parse(file.toString());

    //var xlsx = XLSX.read(readFileSync(join(__dirname, '../../data/M_BTT/MBTT CO2.xlsx')),{ type: 'buffer' },);
    //console.log(rawData[0].FeBTT);
    let isotherm1: isotherm = getIsotherm(rawData, 0);
    let isotherm2: isotherm = getIsotherm(rawData, 3);
    let isotherm3: isotherm = getIsotherm(rawData, 6);
    let data: aggregatedData = [isotherm1, isotherm2, isotherm3];
    let bootStrappedData: aggregatedData = bootStrappedStatistics(
      n,
      isotherm1,
      BETFitLinearDouble,
    );
    let vm = [];
    for (let i = 0; i < bootStrappedData.length; i++) {
      vm.push(bootStrappedData[i]?.BET?.vm);
    }
    writeFileSync(
      join(__dirname, '../../../examples/BETvm1.json'),
      JSON.stringify(bootStrappedData),
    );
  });
  it('BETFitLinearDoubleWeighted', () => {
    let file = readFileSync(join(__dirname, '../../data/M_BTT/MBTT CO2.json'));

    let rawData = JSON.parse(file.toString());

    //var xlsx = XLSX.read(readFileSync(join(__dirname, '../../data/M_BTT/MBTT CO2.xlsx')),{ type: 'buffer' },);
    //console.log(rawData[0].FeBTT);
    let isotherm1: isotherm = getIsotherm(rawData, 0);
    let isotherm2: isotherm = getIsotherm(rawData, 3);
    let isotherm3: isotherm = getIsotherm(rawData, 6);
    let data: aggregatedData = [isotherm1, isotherm2, isotherm3];
    let bootStrappedData: aggregatedData = bootStrappedStatistics(
      n,
      isotherm1,
      BETFitLinearDoubleWeighted,
    );
    let vm = [];
    for (let i = 0; i < bootStrappedData.length; i++) {
      vm.push(bootStrappedData[i]?.BET?.vm);
    }
    writeFileSync(
      join(__dirname, '../../../examples/BETvm2.json'),
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
