const mapItemsMapping = {
  center: ['gift'],
  guardian: ['gift'],
  double: ['gift'],
  ancient: ['gift'],
  wormhole: ['wormhole'],
  gift: ['gift'],
  artefact: ['artefact'],
};

const mapShipsMapping = {
  center: ['center'],
  guardian: ['guardian'],
  double: ['ancient', 'ancient'],
  ancient: ['ancient'],
};

class StarMap {
  /**
   * @param {import('../ItemSacks')} itemSacks
   */
  constructor(itemSacks) {
    this.itemSacks = itemSacks;
    this.tiles = [];
    this.currentPlanetId = 0;
  }

  serialize() {
    return {
      tiles: this.tiles,
      currentPlanetId: this.currentPlanetId,
    };
  }

  deserialize(data) {
    this.tiles = data.tiles;
    this.currentPlanetId = data.currentPlanetId;
  }

  createTile(x, y) {
    const existing = this.tiles.find(t => t.x === x && t.y === y);
    if (existing) throw Error(`Tile (${x}, ${y}) already exist`);

    return { kind: 'tile', x, y };
  }

  getTile(x, y) {
    return this.tiles.find(t => t.x === x && t.y === y);
  }

  getFreeColonisablePlaces(playerId, colonisablePlanetTypes) {
    const result = [];
    this.tiles
      .filter(t => t.owner === playerId)
      .forEach(tile => {
        // Scan planet
        tile.planets
          .filter(p => !p.hasColon)
          .forEach(planet => {
            const cpt = colonisablePlanetTypes.find(
              t => t.type === planet.type && t.nbMax > 0,
            );

            if (cpt) {
              result.push({ tileId: tile.id, accept: cpt.accept, ...planet });
            }
          });

        // colonisable items ?
        tile.items
          .filter(i => i.hasColon === false)
          .forEach(item => {
            const cpt = colonisablePlanetTypes.find(t => t.type === item.type);
            if (cpt) {
              result.push({ tileId: tile.id, accept: cpt.accept, ...item });
            }
          });
      });
    return result;
  }

  setTileObjectPopulation(tileId, kind, objectId, hasColon) {
    const tile = this.tiles.find(t => t.id === tileId);
    if (!tile) {
      throw Error(`Tile ${tileId} not found`);
    }
    if (kind === 'planet') {
      const planet = tile.planets.find(p => p.id === objectId);
      if (!planet) {
        throw Error(`Planet ${objectId} not found on tile ${tileId}`);
      }
      planet.hasColon = hasColon;
    } else {
      const item = tile.items.find(i => i.id === objectId);
      if (!item) {
        throw Error(`Item ${objectId} not found on tile ${tileId}`);
      }
      item.hasColon = hasColon;
    }
  }

  storeTile(tile) {
    this.tiles = [
      ...this.tiles.filter(t => t.x !== tile.x || t.y !== tile.y),
      tile,
    ];
  }

  generateRotatedExits(tileTemplate, rotation) {
    const exits = [...tileTemplate.exits];
    for (let i = 0; i < rotation; i += 1) {
      const shiftedOne = exits.pop();
      exits.unshift(shiftedOne);
    }

    return { exits };
  }

  generatePlanet(tileId, planetType) {
    this.currentPlanetId += 1;

    return {
      kind: 'planet',
      id: `${tileId}-${planetType}-${this.currentPlanetId}`,
      type: planetType,
      hasColon: false,
    };
  }

  generateTile(tileTemplate) {
    const self = this;
    return {
      id: tileTemplate.id,
      ring: tileTemplate.ring,
      group: tileTemplate.group,
      vp: tileTemplate.vp,
      label: tileTemplate.label,
      tags: tileTemplate.tags,
      background: tileTemplate.background,
      items: [],
      planets: tileTemplate.planets.map(planetType =>
        self.generatePlanet(tileTemplate.id, planetType),
      ),
    };
  }

  generateItems(tileTemplate) {
    const self = this;
    const items = [];
    tileTemplate.tags.forEach(tag => {
      const itemList = mapItemsMapping[tag] || [];
      itemList.forEach(itemName => {
        items.push(self.itemSacks.pickOne(itemName));
      });
    });
    if (tileTemplate.items) {
      tileTemplate.items.forEach(itemName => {
        items.push(self.itemSacks.pickOne(itemName));
      });
    }

    return { items };
  }

  generateShips(tileTemplate) {
    const self = this;
    const ships = [];
    tileTemplate.tags.forEach(tag => {
      const shipList = mapShipsMapping[tag] || [];
      shipList.forEach(shipType => {
        ships.push(self.itemSacks.pickOne(shipType));
      });
    });

    return { ships };
  }

  recomputeConnections() {
    const MAX_DELTA = 20;
    const deltas = [
      { dx: 0, dy: 2 },
      { dx: 1, dy: 1 },
      { dx: 1, dy: -1 },
      { dx: 0, dy: -2 },
      { dx: -1, dy: -1 },
      { dx: -1, dy: 1 },
    ];
    this.connections = [];
    const wormholeTiles = [];
    for (let y = -MAX_DELTA; y <= MAX_DELTA; y += 1) {
      for (let x = -MAX_DELTA + (y % 2); x <= MAX_DELTA; x += 2) {
        const tile = this.getTile(x, y);
        if (tile) {
          if (tile.items.find(i => i.kind === 'wormhole')) {
            wormholeTiles.push(tile);
          }
          deltas.forEach((delta, index) => {
            const neighbour = this.getTile(x + delta.x, y + delta.y);
            if (!neighbour) {
              return;
            }
            const neighbourLink = neighbour.exits[(index + 3) % 6];
            const tileLink = tile.exits[index];
            let kind = 'none';
            if (tileLink || neighbourLink) {
              kind = tileLink && neighbourLink ? 'full' : 'half';
            }
            this.connections.push({
              sx: tile.x,
              sy: tile.y,
              ex: neighbour.x,
              ey: neighbour.y,
              kind,
            });
          });
        }
      }
    }
    while (wormholeTiles.length > 1) {
      const start = wormholeTiles.pop();
      for (let i = 0; i < wormholeTiles.length; i += 1) {
        const end = wormholeTiles[i];
        this.connections.push({
          sx: start.x,
          sy: start.y,
          ex: end.x,
          ey: end.y,
          kind: 'wormhole',
        });
        this.connections.push({
          sx: end.x,
          sy: end.y,
          ex: start.x,
          ey: start.y,
          kind: 'wormhole',
        });
      }
    }
  }

  getData() {
    return this.tiles.map(t => t);
  }

  addTile(x, y, rotation, tileTemplate) {
    const tilePosition = this.createTile(x, y);
    const tileData = this.generateTile(tileTemplate);
    const tileExits = this.generateRotatedExits(tileTemplate, rotation);
    const tileItems = this.generateItems(tileTemplate);
    const tileShips = this.generateShips(tileTemplate);
    const tile = {
      ...tileData,
      ...tilePosition,
      ...tileExits,
      ...tileItems,
      ...tileShips,
    };
    this.storeTile(tile);
    this.recomputeConnections();

    return tile;
  }
}

module.exports = StarMap;
