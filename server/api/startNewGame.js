const initialState = import('../../app/containers/GamePage/reducer');
const planets = import('../../app/data/planets');


function createInitialStore(config)
{
  const gameData = initNewGameStore(config);
  const emptyStore = JSON.parse(JSON.stringify(initialState));
  const players = [
    { id: 1, label: 'Joueur 1', race: 'human', color: 'white' },
    { id: 2, label: 'Joueur 2', race: 'human', color: 'black' },
  ];
  const modules = ['root', 'wormhole'];
  const nbPlayersConf = {
    // TODO: configure
    2: { startTechs: 12, pickTeck: 5, planetsSector3: 5 },
    3: { startTechs: 12, pickTeck: 5, planetsSector3: 5 },
  };

  const availablePlanets = modules.reduce(
    (acc, module) => acc.concat(planets.filter(p => p.tags.includes(module)))
    , []
  );


  const pickRandomRing = (ring, nb) => {
    const allOfRing = availablePlanets.filter(p => p.ring === ring);

    return randomPick(allOfRing, nb, false);
  }

  const availablePlanets = planets.filter(p => p.tags);
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
      ships: {
        interceptor: [
          { id: 'hull', part: null },
          { id: 'T', part: 'can_1' },
          { id: 'B', part: 'thr_1' },
          { id: 'L', part: 'pow_3' },
          { id: 'B', part: null },
        ],
        fregate: [
          { id: 'hull', part: null },
          { id: 'T', part: 'can_1' },
          { id: 'B', part: 'hul_1' },
          { id: 'TL', part: 'cmp_1' },
          { id: 'BL', part: 'pow_3' },
          { id: 'TR', part: null },
          { id: 'BR', part: 'thr_1' },
        ],
        cruiser: [
          { id: 'hull', part: null },
          { id: 'T1', part: 'can_1' },
          { id: 'T2', part: 'can_1' },
          { id: 'B1', part: 'hul_1' },
          { id: 'B2', part: 'hul_1' },
          { id: 'TL', part: 'cmp_1' },
          { id: 'BL', part: 'pow_3' },
          { id: 'TR', part: null },
          { id: 'BR', part: 'thr_1' },
        ],
        base: [
          { id: 'hull', part: null },
          { id: 'C', part: null },
          { id: 'TL', part: 'cmp_1' },
          { id: 'BL', part: 'hul_1' },
          { id: 'TR', part: 'can_1' },
          { id: 'BR', part: 'hul_1' },
        ],
      },
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
  res.render(JSON.stringify(createInitialStore()));
}

module.exports = startNewGame;
