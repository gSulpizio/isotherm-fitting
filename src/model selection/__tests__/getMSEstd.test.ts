import getMSEstd from '../getMSEstd';
import looseData from '../looseData';

test('test getMSEstd', () => {
  let data: looseData = [
    { name: 'Ferrari 250 GT Berlinetta SWB', MSE: 0 },
    { name: 'fiat 509', MSE: 10 },
    { name: 'Citroen Trèfle', MSE: 35 },
  ];
  let result = getMSEstd(data);
  console.log(result);
  expect(result).toStrictEqual(
    Math.sqrt(
      ((0 - 45 / 3) ** 2 + (10 - 45 / 3) ** 2 + (35 - 45 / 3) ** 2) / 3,
    ),
  );
});
