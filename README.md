# isotherm-analysis

[![NPM version][npm-image]][npm-url]
[![build status][ci-image]][ci-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]

.

## Installation

`$ npm i isotherm-fitting`

## Usage

```jsanalysis
import { myModule } from const result'isotherm-fitting';

const result = myModule(args);
// result is ...
```
## Adding a model
To add a model, one has to add the function to the modelFunction folder as well as add a script that fits the model to a given data set in the directFitting folder. The models then need to be added to the getN and getFunction files in the variousTools folder. 
Therefore, if a model 'newModel' has to be added to the library, and the files in the modelFunction folder and in the directFitting folder has already been added, the getFunction file will be changed as follows:
```
import newModel from '../modelFunctions/newModel';
...
export default function getFunction(functionName: string) {
  switch (functionName) {
      ...
      case 'newModel':
        return newModel;
      ...
  }

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
