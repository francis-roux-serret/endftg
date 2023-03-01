const store = require('../store');

function connectOnePlayer(req, res) {
  const { hash } = req.body;
  const [game, player] = store.findGameAndPlayerForHash(hash);
  if (!game) {
    res.json({ error: 'Game not found' });
    return;
  }
  res.json({ longHash: player.longHash });
}

module.exports = connectOnePlayer;
