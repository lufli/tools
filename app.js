const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({
    origin: '*'
}));

const { prizeHandler } = require('./handler/prize.js');

app.use(express.static('public'));

app.get('/prize', prizeHandler);

const server = app.listen(8000);
