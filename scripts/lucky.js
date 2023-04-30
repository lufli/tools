const fs = require('fs');
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

const prize = {};

getMyPowerballPrize(myPowerballPlays).then(powerballPrize => {
  prize['powerball'] = powerballPrize;
  getMyMegaMillionsPrize(myMegaMillionsPlay).then(megaMillionsPrize => {
    prize['mega'] = megaMillionsPrize;
    getMyDoublePlayPrize(myPowerballPlays).then(doubleplayPrize => {
      prize['double'] = doubleplayPrize;
      console.log(prize);
    })
  })
});

/*
JSON output exmaple
{
  'last-update': '4/10/2023, 4:42:12 PM',
  'lotteries': [
    {
      'name': 'Powerball',
      'last-update': '2015-08-25T15:35:58.000Z',
      'prizes': [0, 0]
    },
    {
      'name': 'MegaMillions',
      'last-update': '2015-08-25T15:35:58.000Z',
      'prizes': [0, 0]
    }
  ]
}
*/
/*
fs.writeFile('/Users/lufan/Documents/GitHub/tools/public/output.json', JSON.stringify({a: 123}), err => {
  if (err) {
    console.log(err);
  }
});
*/