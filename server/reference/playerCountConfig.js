const P1 = { x: 0, y: -4 };
const P2 = { x: -2, y: -2 };
const P3 = { x: -2, y: 2 };
const P4 = { x: 0, y: 4 };
const P5 = { x: 2, y: 2 };
const P6 = { x: 2, y: -2 };

const playerCountConfig = {
  2: {
    nbTechnos: 12,
    nbSector3: 5,
    nbPick: 5,
    alliances: false,
    positions: [P1, P4],
  },
  3: {
    nbTechnos: 14,
    nbSector3: 8,
    nbPick: 6,
    alliances: false,
    positions: [P1, P3, P5],
  },
  4: {
    nbTechnos: 16,
    nbSector3: 14,
    nbPick: 7,
    alliances: true,
    positions: [P2, P3, P5, P6],
  },
  5: {
    nbTechnos: 18,
    nbSector3: 16,
    nbPick: 8,
    alliances: true,
    positions: [P1, P2, P3, P5, P6],
  },
  6: {
    nbTechnos: 20,
    nbSector3: 18,
    nbPick: 9,
    alliances: true,
    positions: [P1, P2, P3, P4, P5, P6],
  },
};

module.exports = playerCountConfig;
