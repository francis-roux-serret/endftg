const tiles = require('../reference/tiles');
const initNewGameStore = require('../utilities/initNewGameStore');


function createInitialStore(config)
{
  const gameData = initNewGameStore(config);
  const emptyStore = {};
  const players = [
    { id: 1, label: 'Joueur 1', race: 'human', color: 'white' },
    { id: 2, label: 'Joueur 2', race: 'human', color: 'black' },
  ];
  const modules = ['root', 'wormhole'];

  const availableTilesRing0 = modules.reduce(
    (acc, module) => acc.concat(tiles.filter(p => p.tags.includes(module) && p.ring === 0)),
    [],
  );
  const availableTilesRing1 = modules.reduce(
    (acc, module) => acc.concat(tiles.filter(p => p.tags.includes(module) && p.ring === 1)),
    [],
  );
  const availableTilesRing2 = modules.reduce(
    (acc, module) => acc.concat(tiles.filter(p => p.tags.includes(module) && p.ring === 2)),
    [],
  );
  const availableTilesRing3 = modules.reduce(
    (acc, module) => acc.concat(tiles.filter(p => p.tags.includes(module) && p.ring === 3)),
    [],
  );


  const pickRandomRing = (ring, nb) => {
    const allOfRing = availablePlanets.filter(p => p.ring === ring);

    return randomPick(allOfRing, nb, false);
  }

  const availablePlanets = tiles.filter(p => p.tags);
  const centerPlanet = pickRandomRing(0, 1).pop();
  const planetsRing1 = pickRandomRing(1, 1).pop();

  const playerStatusTemplate = {
    id: 1,
    planets: [
      {
        x: 0,
        y: -2,
        pops: [true, false, true, false, true],
        items: ['interceptor'],
      },
    ],
    sciences: [{ track: 'red', type: 'base' }],
    badges: [],
    colons: 3,
    markers: {
      firstDisc: 1,
      nbG: 4,
      nbM: 4,
      nbS: 4,
      popG: 2,
      popM: 2,
      popS: 2,
    },
  };

  emptyStore.config.players = players;
}

function startNewGame(req, res)
{
  const config = req.data;
  // res.render(JSON.stringify(createInitialStore()));
}

module.exports = startNewGame;
