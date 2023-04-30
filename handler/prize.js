const { getMyPowerballPrize } = require('../util/lucky/powerball.js');
const { getMyMegaMillionsPrize } = require('../util/lucky/megaMillions.js');
const { getMyDoublePlayPrize } = require('../util/lucky/doublePlay.js');

const myPowerballPlays = [
  {
    whiteBalls: [4, 9, 22, 41, 55],
    powerBall: 11
  },
  {
    whiteBalls: [18, 25, 47, 52, 66],
    powerBall: 16
  }
];

const myMegaMillionsPlay = [
  {
    whiteBalls: [15, 27, 42, 56, 69],
    powerBall: 17
  },
  {
    whiteBalls: [3, 18, 31, 47, 62],
    powerBall: 9
  },
  {
    whiteBalls: [5, 10, 23, 37, 56],
    powerBall: 17
  },
  {
    whiteBalls: [7, 16, 25, 42, 49],
    powerBall: 8
  }
];

async function prizeHandler (request, response) {
  const powerballPrize = await getMyPowerballPrize(myPowerballPlays);
  const doubleplayPrize = await getMyDoublePlayPrize(myPowerballPlays);
  const megaMillionsPrize = await getMyMegaMillionsPrize(myMegaMillionsPlay);

  response.json({
    powerballPrize,
    doubleplayPrize,
    megaMillionsPrize
  });
}

module.exports = { prizeHandler };