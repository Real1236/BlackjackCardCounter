const express = require('express');
const { createStrategyInteractor } = require('./strategyInteractor.js');

const app = express();

app.use(express.json());

app.post('/api/strategy', (req, res) => {
    const {deckComposition, standsOnSoft17, bankroll, minBetSize} = req.body;
    res.json(createStrategyInteractor({deckComposition, standsOnSoft17, bankroll, minBetSize}));
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});