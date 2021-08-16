# isotherm-analysis

[![NPM version][npm-image]][npm-url]
[![build status][ci-image]][ci-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]

.

## Installation

`$ npm i isotherm-fitting`

## Usage
Fit a function to a dataset:
```ts
import langmuirSingleFit from 'directFit/langmuir/langmuirSingleFit';
import langmuirDoubleFit from 'directFit/langmuir/langmuirDoubleFit';
import langmuirTripleFit from 'directFit/langmuir/langmuirTripleFit';

import BETFitLinearSingle from 'directFit/BET/BETFitLinearSingle';
import BETFitLinearDouble from 'directFit/BET/BETFitLinearDouble';
import BETFitLinearDoubleWeighted from 'directFit/BET/BETFitDoubleWeighted';
let data:isotherm = {
      x: [
        0.0171192,
        0.0586318,
        0.102329,
        0.211573,
        0.303338,
        0.412581,
        0.499976,
        0.60485,
        0.705355,
        0.801489,
        0.901993,
        0.998128,
      ],
      y: [
        20.6782,
        69.2916,
        102.611,
        143.577,
        168.157,
        188.367,
        199.838,
        212.947,
        223.325,
        230.972,
        237.527,
        242.443,
      ],
    };
    let resultsSingle = langmuirSingleFit(data);
    let resultsDouble = langmuirTripleFit(data);
    let resultsTriple = langmuirTripleFit(data);

    let BETDirect=BETFitLinearSingle(data)
    let BETindirect=BETFitLinearDouble(data)
    let BETindirectWeighted=BETFitDoubleWeighted(data)
```

## Adding a model

To add a model, one has to add the function to the [modelFunction](./src/modelFunctions) folder as well as add a script that fits the model to a given data set in the [directFitting](./src/directFitting) folder. Additionally, the model has to be added to the [models.ts](./src/directFitting/models.ts) file to be included in the model selection process. Finally, the model then needs to be added to the [getN](./src/variousTools/getN.ts) and [getFunction](./src/variousTools/getFunction.ts) files in the variousTools folder.

#### Adding a model: example

If a model 'newModel' (with a 'newModelFit' fitting function) has to be added to the library, so the files in the [modelFunction](./src/modelFunctions) folder and in the [directFitting](./src/directFitting) folder has already been added, the [getFunction](./src/variousTools/getFunction.ts) file will be changed as follows:

```ts
import newModel from '../modelFunctions/newModel';
...
export default function getFunction(functionName: string) {
  switch (functionName) {
      ...
      case 'newModelFit':
      case 'newModel':
        return newModel;
      ...
  }
  ...

```

Additionally, [getN](./src/variousTools/getN.ts) has to be changed to reflect how many parameters of a model have to be used indpendently of the number of isotherms for a thermodynamically consistent fitting. As an example, for a Langmuir triple function, n=3, with two isotherms at different temperatures, the parameters would be:

```ts
parameters=[k11, k21, k31, k12, k22, k32, nm1, nm2, nm3];
             |    |    |                   |    |    |  //selected parameters for first isothnerm
                            |    |    |    |    |    |  //selected parameters for second isothnerm
```

Where the first indice is the site type and the second indice is the isotherm indice. In other words, the first isotherm has the equilibrium constants k11, k21, k31 and the second isotherm has the equilibrium constants k12,k22,k32.
For the first isotherm, the parameters therefore needed are:

```ts
parameters = [k11, k21, k31, nm1, nm2, nm3];
```

which means that n=3 as there are 3 parameters of the same type needed for one isotherm. In getN, this would look like:

```ts
export default function getN(functionName: string) {
    ...
  switch (functionName) {
      ...
    case 'newModel':
      return 3;
      ...
  }
  ...
```

In the case that the model follows a different scheme of how the parameters are structured, it is possible to make a custom parameters selection with an if statement that returns the desired variables **before** the [getN](./src/variousTools/getN.ts) call, in the [getParameters](./src/variousTools/getParameters.ts) function.
This has already been done for the BET function:

```ts
export default function getParameters(
  functionName: string,
  i: number,
  parameterList: number[],
) {
  ...
  if (functionName === 'BET') {
    parameters.push(parameterList[i]);
    parameters.push(parameterList[parameterList.length - 2]);
    parameters.push(parameterList[parameterList.length - 1]);
    return parameters;
  }
  ...
```

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/isotherm-analysis.svg
[npm-url]: https://www.npmjs.com/package/isotherm-analysis
[ci-image]: https://github.com/cheminfo/isotherm-analysis/workflows/Node.js%20CI/badge.svg?branch=master
[ci-url]: https://github.com/cheminfo/isotherm-analysis/actions?query=workflow%3A%22Node.js+CI%22
[codecov-image]: https://img.shields.io/codecov/c/github/cheminfo/isotherm-analysis.svg
[codecov-url]: https://codecov.io/gh/cheminfo/isotherm-analysis
[download-image]: https://img.shields.io/npm/dm/isotherm-analysis.svg
[download-url]: https://www.npmjs.com/package/isotherm-analysis
