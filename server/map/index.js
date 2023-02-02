const mapItemsMapping = {
  center: ['center', 'gift'],
  guardian: ['guardian', 'gift'],
  double: ['ancient', 'ancient', 'gift'],
  ancient: ['ancient', 'gift'],
  wormhole: ['wormhole'],
  gift: ['gift'],
  artefact: ['artefact'],
};

class Map {
  /**
   * @param {import('../ItemSacks')} itemSacks
   */
  constructor(itemSacks) {
    this.itemSacks = itemSacks;
    this.tiles = [];
    this.currentPlanetId = 0;
  }

  createTile(x, y) {
    const existing = this.tiles.find(t => t.x === x && t.y === y);
    if (existing) throw Error(`Tile (${x}, ${y}) already exist`);

    return { kind: 'tile', x, y };
  }

  getTile(x, y) {
    return this.tiles.find(t => t.x === x && t.y === y);
  }

  storeTile(tile) {
    this.tiles = [
      ...this.tiles.filter(t => t.x !== tile.x || t.y !== tile.y),
      tile,
    ];
  }

  handleRotation(exits, rotation) {
    const result = { exits };
    for (let i = 0; i < rotation; i += 1) {
      const shiftedOne = result.exits.pop();
      result.exits.unshift(shiftedOne);
    }

    return result;
  }

  generatePlanet(tileId, planetType)
  {
    this.currentPlanetId += 1;

    return {
      kind: 'planet',
      id: `${tileId}-${planetType}-${this.currentPlanetId}`,
      type: this.currentPlanetId,
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
      planets: tileTemplate.map(planetType =>
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

    return { items };
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
    return this.tiles.map(t => {
      console.log(t);

      return t;
    });
  }

  addTile(x, y, rotation, tileTemplate) {
    const tilePosition = this.createTile(x, y);
    const tileData = this.generateTile(tileTemplate);
    const tileRotation = this.handleRotation(tileTemplate.exits, rotation);
    const tileItems = this.generateItems(tileTemplate);
    const tile = {
      ...tileData,
      ...tilePosition,
      ...tileRotation,
      ...tileItems,
    };
    this.storeTile(tile);
    this.recomputeConnections();
  }
}

const instance = new Map();

module.exports = instance;
