//looks for linear region in lower p/po
const SG = require('ml-savitzky-golay-generalized'); //import throwing error

export function getBETrange(data: { x: number[]; y: number[] }) {
  let dp = SG(data.y, data.x);
  console.log(dp);
}
