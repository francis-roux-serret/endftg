const PlayerTechnos = require('../PlayerTechnos');
const species = require('../reference/species');
const randomPick = require('../utilities/randomPick');
const PopulationTrack = require('../PopulationTrack');
const technos = require('../reference/technos');

class Player {
  constructor(playerConfig, index) {
    const self = this;
    this.id = index + 1;
    this.index = index;
    this.nickname = playerConfig.nickname;
    this.race = playerConfig.race;
    this.color = playerConfig.color;
    this.playerTechnos = new PlayerTechnos();
    this.populationTracks = {
      S: new PopulationTrack('S'),
      M: new PopulationTrack('M'),
      G: new PopulationTrack('G'),
    };
    const raceConfig = species.find(s => s.id === playerConfig.race);
    if (!raceConfig) {
      throw new Error(`Cannot find race ${playerConfig.race}`);
    }
    raceConfig.technos.forEach(technoName => {
      const techno = technos.find(t => t.id === technoName);
      self.addTechno(techno);
    });
    this.initialShips = raceConfig.initialShips.map(
      shipName => `${self.color}-${shipName}`,
    );
  }

  serialize() {
    return {
      id: this.id,
      nickname: this.nickname,
      hash: this.hash,
      longHash: this.longHash,
      index: this.index,
      race: this.race,
      color: this.color,
      playerTechnos: this.playerTechnos.serialize(),
    };
  }

  deserialize(data) {
    this.id = data.id;
    this.hash = data.hash;
    this.longHash = data.longHash;
    this.index = data.index;
    this.race = data.race;
    this.color = data.color;
    this.playerTechnos.deserialize(data.playerTechnos);
  }

  getInitialShipsSackNames() {
    return this.initialShips;
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

  getColonisablePlanetTypes() {
    const types = [];
    const nb = {};

    // Basic
    ['S', 'M', 'G'].forEach(color => {
      nb[color] = this.populationTracks[color].countAvailable();
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
    if (!this.populationTracks[type]) {
      return null;
    }

    return this.populationTracks[type].pickOne();
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
