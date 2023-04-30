const axios = require("axios");
const DomParser = require('dom-parser');

// Mega Millions® drawings are held Tuesday and Friday at 11:00 pm ET.

const parser = new DomParser();

const options = {
  'method': 'GET',
  'content-type': 'application/json',
  'url': 'https://www.megamillions.com/cmspages/utilservice.asmx/GetLatestDrawData',
};

function getWinningNumbers () {
  return axios.request(options).then(function (response) {
    let data = response.data;

    while(data.length > 0 && data[0] !== '{') data = data.slice(1);
    while(data.length > 0 && data.charAt(data.length - 1) !== '}') data = data.slice(0, -1);

    data = JSON.parse(data).Drawing;

    return {
      whiteBalls: [data.N1, data.N2, data.N3, data.N4, data.N5],
      powerBall: data.MBall,
      multiplier: data.Megaplier
    };
  }).catch(function (error) {
    console.error(error);
  });
}

function getMyMegaMillionsPrize (myMegaMillionsPlays) {
  return getWinningNumbers().then(winningNumbers => {
    return myMegaMillionsPlays.map(({whiteBalls, powerBall}) => {
      let whiteBallCount = whiteBalls.reduce((count, ball) => winningNumbers.whiteBalls.includes(ball) ? count + 1 : count, 0);
      let isCorrectPowerBall = powerBall === winningNumbers.powerBall;

      if (isCorrectPowerBall) {
        if (whiteBallCount === 0) return 2 * winningNumbers.multiplier;
        else if (whiteBallCount === 1) return 4 * winningNumbers.multiplier;
        else if (whiteBallCount === 2) return 10 * winningNumbers.multiplier;
        else if (whiteBallCount === 3) return 200 * winningNumbers.multiplier;
        else if (whiteBallCount === 4) return 10000 * winningNumbers.multiplier;
        else if (whiteBallCount === 5) return 'Jackpot';
      } else {
        if (whiteBallCount < 3) return 0;
        else if (whiteBallCount === 3) return 10 * winningNumbers.multiplier;
        else if (whiteBallCount === 4) return 500 * winningNumbers.multiplier;
        else if (whiteBallCount === 5) return 1000000;
      }
    });
  });
}

module.exports = { getMyMegaMillionsPrize };

