export default function generateChoices(players) {
  const allModules = [
    'wormhole',
    // 'minorSpecies',
    // 'galacticEvents',
    // 'riftCanon',
    // 'turnOrder',
  ];
  // if (players.length === 5) {
  //   allModules.push('fifthPlayerWormholes');
  // }
  const allColors = [
    { color: 'red', backgroundColor: 'white' },
    { color: 'green', backgroundColor: 'white' },
    { color: 'blue', backgroundColor: 'white' },
    { color: 'black', backgroundColor: 'white' },
    { color: 'white', backgroundColor: 'black' },
    { color: 'yellow', backgroundColor: 'black' },
  ];

  const allRaces = [
    { race: 'human', color: 'gray', backgroundColor: 'white' },
    { race: 'eridani', color: 'red', backgroundColor: 'white' },
    { race: 'planta', color: 'green', backgroundColor: 'white' },
    { race: 'hydran', color: 'blue', backgroundColor: 'white' },
    { race: 'orion', color: 'black', backgroundColor: 'white' },
    { race: 'mechanema', color: 'white', backgroundColor: 'black' },
    { race: 'draco', color: 'yellow', backgroundColor: 'black' },
  ];

  const npcFields = ['ancient', 'guardian', 'center'];
  const npcChoices = ['easy', 'hard', 'randomPerGame', 'randomPerTile'];

  return { allModules, allColors, allRaces, npcFields, npcChoices };
}
