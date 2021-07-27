export default function MSE(y: number[], yhat: number[]) {
  let cumulatedLoss = 0;
  for (let i = 0; i < y.length; i++) {
    cumulatedLoss += (y[i] - yhat[i]) ** 2;
  }
  return cumulatedLoss;
}
