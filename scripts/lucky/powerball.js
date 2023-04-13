const axios = require("axios");
const DomParser = require('dom-parser');


// Drawings are held every Monday, Wednesday, and Saturday at 10:59 pm ET 
// at the Florida Lottery draw studio in Tallahasee.

const parser = new DomParser();

const options = {
  method: 'GET',
  url: 'https://www.powerball.com',
};

function getWinningNumbers () {
  return axios.request(options).then(function (response) {
    const dom = parser.parseFromString(response.data);

    let winningWhiteBalls = dom.getElementsByClassName('white-balls').map(el => parseInt(el.innerHTML, 10));
    let winningPowerBall = parseInt(dom.getElementsByClassName('powerball')[0].innerHTML, 10);
    let multiplier = parseInt(dom.getElementsByClassName('multiplier')[0].innerHTML);

    return {
      whiteBalls: winningWhiteBalls,
      powerBall: winningPowerBall,
      multiplier
    }
  }).catch(function (error) {
    console.error(error);
  });
}

function getMyPowerballPrize (myPowerballPlays) {
  return getWinningNumbers().then(winningNumbers => {
    return myPowerballPlays.map(({whiteBalls, powerBall}) => {
      let whiteBallCount = whiteBalls.reduce((count, ball) => winningNumbers.whiteBalls.includes(ball) ? count + 1 : count, 0);
      let isCorrectPowerBall = powerBall === winningNumbers.powerBall;

      if (isCorrectPowerBall) {
        if (whiteBallCount === 0) return 4 * winningNumbers.multiplier;
        else if (whiteBallCount === 1) return 4 * winningNumbers.multiplier;
        else if (whiteBallCount === 2) return 7 * winningNumbers.multiplier;
        else if (whiteBallCount === 3) return 100 * winningNumbers.multiplier;
        else if (whiteBallCount === 4) return 50000 * winningNumbers.multiplier;
        else if (whiteBallCount === 5) return 'Grand Prize';
      } else {
        if (whiteBallCount < 3) return 0;
        else if (whiteBallCount === 3) return 100 * winningNumbers.multiplier;
        else if (whiteBallCount === 4) return 100 * winningNumbers.multiplier;
        else if (whiteBallCount === 5) return 2000000;
      }
    });
  }).then(prize => console.log('Power', prize));
}

module.exports = { getMyPowerballPrize };