import SimpleLinearRegression from 'ml-regression-simple-linear';
/**
 * returns fitted data points, linear regression params and regression score function
 * @param {dataXY} data
 * @returns {Array} [data, regression, score]:fitted data points, linear regression params and regression score function
 */
export function fitData(data: { x: number[]; y: number[] }): any[] {
  //if no weights have been declarded, make an array with ones:

  let newData = { x: [...data.x], y: [...data.y] };
  const regression = new SimpleLinearRegression(newData.x, newData.y);
  const score = (x: number[], y: number[]) => regression.score(x, y);
  if (
    newData.x.length < 5 ||
    regression.score(newData.x, newData.y).r2 > 0.99
  ) {
    return [data, regression, score]; //    TODO: interpolation should be implemented here
  }

  //make new dataset without last point
  let newDataPop: { x: number[]; y: number[] } = {
    x: [...newData.x],
    y: [...newData.y],
  };

  newDataPop.x.pop();
  newDataPop.y.pop();
  //make new dataset without last point
  let newDataShift: { x: number[]; y: number[] } = {
    x: [...newData.x],
    y: [...newData.y],
  };
  newDataShift.x.shift();
  newDataShift.y.shift();

  //new regression with shortened data
  const regressionPop = new SimpleLinearRegression(newDataPop.x, newDataPop.y);
  const regressionShift = new SimpleLinearRegression(
    newDataShift.x,
    newDataShift.y,
  );
  if (
    regressionPop.score(newDataPop.x, newDataPop.y).r2 >
    regressionShift.score(newDataShift.x, newDataShift.y).r2
  ) {
    return fitData(newDataPop);
  }

  return fitData(newDataShift);
}

export function initialGuess(data: { x: number[]; y: number[] }) {
  let saturationLoading = 1.1 * Math.max(...data.y);
  let KH =
    data.y[0] / data.x[0] / (saturationLoading - data.y[0]) ||
    data.y[1] / data.x[1] / (saturationLoading - data.y[1]);
  let N = 0.1;
  return [KH, saturationLoading, N];
}
