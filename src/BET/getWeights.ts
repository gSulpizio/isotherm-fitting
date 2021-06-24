/**
 * returns weights from: https://doi.org/10.1016/j.micromeso.2011.05.022 that allow for a standardized BET fit
 * @param {dataXY} data data object containing the loading as y and the pressure as x
 * @returns {Array} weights to be used for fitting
 */
export default function getWeights(data: { x: number[]; y: number[] }) {
  let weights = [0];
  for (let i = 1; i < data.x.length - 1; i++) {
    weights.push(
      Math.sqrt(
        (data.x[i] - data.x[i - 1]) ** 2 + (data.y[i] - data.y[i - 1]) ** 2,
      ) /
        2 +
        Math.sqrt(
          (data.x[i] - data.x[i + 1]) ** 2 + (data.y[i] - data.y[i + 1]) ** 2,
        ) /
          2,
    );
  }
  weights.push(0);
  return weights;
}
