export default function meanSquaredError(
  data: { x: number[]; y: number[] },
  refFunction: any,
  params: number,
) {
  let meanSquaredError = 0;
  for (let i = 0; i < data.x.length; i++) {
    meanSquaredError += (refFunction(params)(data.x[i]) - data.y[i]) ^ 2;
  }
  return meanSquaredError;
}
