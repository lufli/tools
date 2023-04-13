const axios = require("axios");
const DomParser = require('dom-parser');


// The Double Play drawing is held after every Powerball drawing on Monday, Wednesday and Saturday.

const parser = new DomParser();

const options = {
  method: 'GET',
  url: 'https://www.powerball.com/double-play',
};

function getWinningNumbers () {
  return axios.request(options).then(function (response) {
    const dom = parser.parseFromString(response.data);

    let winningWhiteBalls = dom.getElementsByClassName('black-balls').map(el => parseInt(el.innerHTML, 10));
    let winningPowerBall = parseInt(dom.getElementsByClassName('dp-powerball')[0].innerHTML, 10);

    return {
      whiteBalls: winningWhiteBalls,
      powerBall: winningPowerBall,
    }
  }).catch(function (error) {
    console.error(error);
  });
}

function getMyDoublePlayPrize (myPowerballPlays) {
  return getWinningNumbers().then(winningNumbers => {
    return myPowerballPlays.map(({whiteBalls, powerBall}) => {
      let whiteBallCount = whiteBalls.reduce((count, ball) => winningNumbers.whiteBalls.includes(ball) ? count + 1 : count, 0);
      let isCorrectPowerBall = powerBall === winningNumbers.powerBall;

      if (isCorrectPowerBall) {
        if (whiteBallCount === 0) return 7;
        else if (whiteBallCount === 1) return 10;
        else if (whiteBallCount === 2) return 20;
        else if (whiteBallCount === 3) return 500;
        else if (whiteBallCount === 4) return 50000;
        else if (whiteBallCount === 5) return 10000000;
      } else {
        if (whiteBallCount < 3) return 0;
        else if (whiteBallCount === 3) return 20;
        else if (whiteBallCount === 4) return 500;
        else if (whiteBallCount === 5) return 500000;
      }
    });
  }).then(prize => console.log('double play', prize));
}

module.exports = { getMyDoublePlayPrize };