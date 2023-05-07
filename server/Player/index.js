const PlayerTechnos = require('../PlayerTechnos');
const species = require('../reference/species');
const randomPick = require('../utilities/randomPick');
const PopulationTrack = require('../PopulationTrack');
const technos = require('../reference/technos');

const DEFAULT_DISC_COSTS = [0, 0, 1, 2, 3, 5, 7, 10, 13, 17, 21, 25, 30];

class Player {
  constructor(index) {
    this.id = index + 1;
    this.index = index;
    this.playerTechnos = new PlayerTechnos();
  }

  importConfig(playerConfig) {
    const self = this;
    this.nickname = playerConfig.nickname;
    this.race = playerConfig.race;
    this.color = playerConfig.color;
    const raceConfig = this.getRaceConfig();
    raceConfig.technos.forEach(technoName => {
      const techno = technos.find(t => t.id === technoName);
      self.addTechno(techno);
    });
    this.initialShips = raceConfig.initialShips.map(
      shipName => `${self.color}-${shipName}`,
    );
    this.availableDiscs = raceConfig.discs;
    this.discsDispatch = ['EXP', 'DEV', 'IMP', 'BUI', 'MOV', 'INV'].map(
      action => ({ action, count: 0 }),
    );
    this.populationTracks = raceConfig.initialResources.map(
      resource => new PopulationTrack(resource),
    );
    this.originalShips = JSON.parse(JSON.stringify(raceConfig.ships));
    this.ships = JSON.parse(JSON.stringify(raceConfig.ships));
  }

  getRaceConfig() {
    const raceConfig = species.find(s => s.id === this.race);
    if (!raceConfig) {
      throw new Error(`Cannot find race ${this.race}`);
    }

    return raceConfig;
  }

  serialize() {
    const populationTracks = this.populationTracks.map(track =>
      track.serialize(),
    );

    return {
      id: this.id,
      nickname: this.nickname,
      hash: this.hash,
      longHash: this.longHash,
      index: this.index,
      race: this.race,
      color: this.color,
      availableDiscs: this.availableDiscs,
      discsDispatch: this.discsDispatch,
      originalShips: this.originalShips,
      ships: this.ships,

      playerTechnos: this.playerTechnos.serialize(),

      populationTracks,
    };
  }

  deserialize(data) {
    this.id = data.id;
    this.nickname = data.nickname;
    this.hash = data.hash;
    this.longHash = data.longHash;
    this.index = data.index;
    this.race = data.race;
    this.color = data.color;
    this.availableDiscs = data.availableDiscs;
    this.discsDispatch = data.discsDispatch;
    this.originalShips = data.originalShips;
    this.ships = data.ships;

    this.playerTechnos.deserialize(data.playerTechnos);

    this.populationTracks = [];
    data.populationTracks.forEach(trackData => {
      const newTrack = new PopulationTrack(trackData.type);
      newTrack.deserialize(trackData);
      this.populationTracks.push(newTrack);
    });
  }

  export() {
    const populationTracks = this.populationTracks.map(track => track.export());

    return {
      id: this.id,
      nickname: this.nickname,
      hash: this.hash,
      index: this.index,
      race: this.race,
      color: this.color,
      availableDiscs: this.availableDiscs,
      discsDispatch: this.discsDispatch,
      discsCosts: this.getDiscsCosts(),
      originalShips: this.originalShips,
      ships: this.ships,

      playerTechnos: this.playerTechnos.export(),

      populationTracks,
    };
  }

  checkLongHash(longHash) {
    return this.longHash === longHash;
  }

  getDiscsCosts() {
    return this.getRaceConfig().alternateDiscsCosts || DEFAULT_DISC_COSTS;
  }

  getInitialShipsSackNames() {
    return this.initialShips;
  }

  pickOneDisc() {
    if (this.availableDiscs <= 0) {
      throw new Error('No more discs');
    }
    this.availableDiscs -= 1;
  }

  addDiscs(count = 1) {
    if (this.availableDiscs + count > this.discsCosts) {
      throw new Error('No more disc space');
    }
    this.availableDiscs += count;
  }

  restoreActionsDiscs() {
    let total = 0;
    this.discsDispatch.forEach((dispatch, index) => {
      total += dispatch.count;
      this.discsDispatch[index].count = 0;
    });

    this.addDiscs(total);
  }

  getObjectSackName(object) {
    if (['orbital', 'monolith'].includes(object)) {
      return object;
    }

    return `${this.color}-${object}`;
  }

  hasTechno(t) {
    return this.playerTechnos.hasTechno(t);
  }

  addTechno(techno, track = null) {
    const finalTrack = track || techno.color;
    if (!finalTrack) {
      throw Error('Specify a track for black technos');
    }
    this.playerTechnos.addTechnoAndGetReduction(finalTrack, techno);
  }

  getPopulationTrack(type) {
    return this.populationTracks.find(track => track.getType() === type);
  }

  getAffordableBuilds(realAccount, virtualAccount) {
    const { prices } = this.getRaceConfig();

    return Object.keys(prices)
      .filter(object => virtualAccount >= prices[object])
      .map(object => ({
        object,
        price: prices[object],
        okReal: realAccount >= prices[object],
        okVirtual: virtualAccount >= prices[object],
      }));
  }

  getBalance(type) {
    const real = this.getPopulationTrack(type).getCurrentCount();
    const { tradeRate } = this.getRaceConfig();
    const maxTrade = this.populationTracks
      .filter(track => track.getType() !== type)
      .reduce(
        (acc, track) => acc + Math.trunc(track.getCurrentCount() / tradeRate),
        0,
      );

    return { real, virtual: real + maxTrade };
  }

  getColonisablePlanetTypes() {
    const types = [];
    const nb = {};

    // Basic
    ['S', 'M', 'G'].forEach(color => {
      nb[color] = this.getPopulationTrack(color).countAvailable();
      if (nb[color]) {
        types.push({ type: color, accept: [color], nbMax: nb[color] });
      }
    });
    nb.A = nb.S + nb.M + nb.G;
    if (nb.A) {
      types.push({ type: 'A', accept: ['S', 'M', 'G'], nbMax: nb.A });
    }

    // Advanced
    if (this.hasTechno('adv_a') && nb.A) {
      types.push({ type: 'S+', accept: ['S', 'M', 'G'], nbMax: nb.A });
    } else {
      const advAccept = [];
      if (this.hasTechno('adv_s') && nb.S) {
        types.push({ type: 'S+', accept: ['S'], nbMax: nb.S });
        advAccept.push('S');
      }
      if (this.hasTechno('adv_m') && nb.M) {
        types.push({ type: 'M+', accept: ['M'], nbMax: nb.M });
        advAccept.push('M');
      }
      if (this.hasTechno('adv_g') && nb.G) {
        types.push({ type: 'G+', accept: ['G'], nbMax: nb.G });
        advAccept.push('G');
      }
      if (advAccept.length) {
        types.push({ type: 'A+', accept: advAccept, nbMax: nb.A });
      }
    }

    // Orbitals
    nb.O = nb.S + nb.G;
    if (nb.O) {
      types.push({ type: 'orbital', accept: ['S', 'G'], nbMax: nb.O });
    }

    return types;
  }

  removeCube(type) {
    if (!this.getPopulationTrack(type)) {
      return null;
    }

    return this.getPopulationTrack(type).pickOne();
  }

  pickHomeSectorId() {
    const playerTemplate = species.find(s => s.id === this.race);
    const sectors = [...playerTemplate.sectors];
    return randomPick(sectors, 1, true)[0];
  }

  setHashes(hash, longHash) {
    this.hash = hash;
    this.longHash = longHash;
  }
}

module.exports = Player;
