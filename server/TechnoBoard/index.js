const BLACK_TECHNO_COLOR = 'black';

class TechnoBoard {
  /**
   * @param {import('../ItemSacks')} itemSacks
   */
  constructor(itemSacks) {
    this.itemSacks = itemSacks;
    const colorTreeTemplate = {
      tiles: [
        { price: 2, min: 2, isNew: false, stack: [] },
        { price: 4, min: 3, isNew: false, stack: [] },
        { price: 6, min: 3, isNew: false, stack: [] },
        { price: 8, min: 4, isNew: false, stack: [] },
        { price: 10, min: 5, isNew: false, stack: [] },
        { price: 12, min: 6, isNew: false, stack: [] },
        { price: 14, min: 7, isNew: false, stack: [] },
        { price: 16, min: 8, isNew: false, stack: [] },
      ],
    };
    this.trees = [
      { color: 'red', ...colorTreeTemplate },
      { color: 'green', ...colorTreeTemplate },
      { color: 'yellow', ...colorTreeTemplate },
      { color: BLACK_TECHNO_COLOR, tiles: [] },
    ];
  }

  serialize() {
    return {
      trees: this.trees,
    };
  }

  deserialize(data) {
    this.trees = data.trees;
  }

  clearIsNew() {
    this.trees = this.trees.map(tree => ({
      ...tree,
      tiles: tree.tiles.map(tile => ({ ...tile, isNew: false })),
    }));
  }

  getAffordable(reductions, realAccount, virtualAccount) {
    const self = this;

    const result = reductions
      .filter(({ reduction }) => reduction !== null)
      .map(({ color, reduction }) => {
        const technos = self.trees
          .find(t => t.color === color)
          .tiles.map(t => {
            const price = Math.min(t.price - reduction, t.min);
            const available = t.stack.length > 0;

            return {
              techno: available ? t.stack[0] : null,
              price,
              isNew: t.isNew,
              okReal: available && realAccount >= price,
              okVirtual: available && virtualAccount >= price,
            };
          });

        return {
          color,
          technos: technos.filter(t => t.techno !== null),
        };
      });

    return result.filter(r => r.technos.length > 0);
  }

  pickNewTechnos(count) {
    this.clearIsNew();
    let deCount = count;
    while (deCount > 0) {
      const techno = this.itemSacks.pickOne('techno');
      const tree = this.trees.find(t => t.color === techno.color);
      if (techno.color === BLACK_TECHNO_COLOR) {
        tree.tiles.push({
          price: techno.price,
          min: techno.min,
          isNew: true,
          stack: [techno],
        });
      } else {
        deCount -= 1;
        const tile = tree.tiles.find(t => t.price === techno.price);
        tile.isNew = true;
        tile.stack.push(techno);
      }
    }
  }

  export() {
    return this.trees.map(tree => ({
      color: tree.color,
      tiles: tree.tiles.map(tile => ({
        techno: tile.stack.length ? tile.stack[0] : null,
        count: tile.stack.length,
        isNew: tile.isNew,
      })),
    }));
  }
}

module.exports = TechnoBoard;
