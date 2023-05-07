class AvailableActionsFinder {
  constructor(gameData, playerId) {
    this.result = [];
    this.gameData = gameData;
    this.playerId = playerId;
    this.player = this.gameData.players.find(p => p.id === this.playerId);
    if (!this.player) {
      throw new Error(`Cannot find active player ${this.playerId}`);
    }
    this.hasPassed = this.gameData.status.passedPlayers.includes(this.playerId);

    if (this.player.availableDiscs) {
      this.addExplores();
      this.addDevelop();
      this.addImprove();
      this.addBuild();
      this.addMove();
      this.addInfluence();
    }
    this.addPass();
  }

  addExplores() {
    const { starmap } = this.gameData;
    const positions = starmap.findExplorablePositions(this.playerId);
    const rings = this.gameData.status.remainingRing3 ? [1, 2, 3] : [1, 2];
    const explorablePositions = positions.filter(p => rings.includes(p.ring));
    if (explorablePositions.length) {
      this.result.push({ action: 'EXP', positions: explorablePositions });
    }
  }

  addDevelop() {
    const { real, virtual } = this.player.getBalance('S');
    const reductions = this.player.playerTechnos.getReductions();
    const affordableTechnos = this.gameData.technoBoard.getAffordable(
      reductions,
      real,
      virtual,
    );
    if (affordableTechnos.length) {
      this.result.push({ action: 'DEV', technos: affordableTechnos });
    }
  }

  addImprove() {
    const technos = this.player.playerTechnos.getAvailableShipParts();
    this.result.push({ action: 'IMP', technos });
  }

  addBuild() {
    const { real, virtual } = this.player.getBalance('M');
    const affordableBuilds = this.player.getAffordableBuilds(real, virtual);
    const builds = affordableBuilds.filter(({ object }) => {
      const sackName = this.player.getObjectSackName(object);
      return !this.gameData.itemSacks.isEmpty(sackName);
    });
    if (affordableBuilds.length) {
      this.result.push({ action: 'BUI', builds });
    }
  }

  addMove() {
    const { starmap } = this.gameData;
    const ships = starmap.findMoveableShips(this.playerId);
    if (ships.length) {
      this.result.push({ action: 'MOV', ships });
    }
  }

  addInfluence() {
    const { starmap } = this.gameData;
    const influences = [];
    if (this.player.availableDiscs > 1) {
      // If player can spare a disc, he can influence without removing a disc
      const tiles = starmap.findInfluenceableTiles(this.playerId, null);
      if (tiles.length) {
        influences.push({ remove: null, tiles });
      }
    }
    const removes = starmap.findRemoveableTiles(this.playerId);
    removes.forEach(remove => {
      // Find tiles he can influence after having removed this tile
      const tiles = starmap.findInfluenceableTiles(this.playerId, remove);
      if (tiles.length) {
        influences.push({ remove, tiles });
      }
    });
    if (influences.length) {
      this.result.push({ action: 'INF', influences });
    }
  }

  addPass() {
    this.result.push({ action: 'PAS' });
  }

  getResult() {
    return this.result;
  }
}

module.exports = AvailableActionsFinder;
