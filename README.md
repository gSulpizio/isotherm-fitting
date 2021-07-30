# isotherm-analysis

[![NPM version][npm-image]][npm-url]
[![build status][ci-image]][ci-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]

.

## Installation

`$ npm i isotherm-fitting`

## Usage

```ts
import { myModule } from const result'isotherm-fitting';

const result = myModule(args);
// result is ...
```
## Adding a model
To add a model, one has to add the function to the modelFunction folder as well as add a script that fits the model to a given data set in the directFitting folder. The models then need to be added to the getN and getFunction files in the variousTools folder. 
#### Adding a model: example
If a model 'newModel' has to be added to the library, and the files in the modelFunction folder and in the directFitting folder has already been added, the getFunction file will be changed as follows:
```ts
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
Additionally, getN has to be changed to reflect how many parameters of a model have to be used indpendently of the number of isotherms for a thermodynamically consistent fitting. As an example, for a Langmuir triple function, n=3, with two isotherms at different temperatures, the parameters would be:
```ts
parameters=[k11, k21, k31, k12, k22, k32, nm1, nm2, nm3];
             |    |    |                   |    |    |  //selected parameters for first isothnerm
                            |    |    |    |    |    |  //selected parameters for second isothnerm
```
Where the first indice is the site type and the second indice is the isotherm indice. In other words, the first isotherm has the equilibrium constants k11, k21, k31 and the second isotherm has the equilibrium constants k12,k22,k32.
For the first isotherm, the parameters therefore needed are:
```ts
parameters=[k11, k21, k31, nm1, nm2, nm3];
```
which means that n=3 as there are 3 parameters of the same type needed for one isotherm. In getN, this would look like:
```ts
export default function getN(functionName: string) {
  switch (functionName) {
    case 'newModel':
      return 3;
  }
```
In the case that the model follows a different scheme of how the parameters are structured, it is possible to make a custom parameters selection with an if statement that returns the desired variables *before* the getN call in the getParameters function. 
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
