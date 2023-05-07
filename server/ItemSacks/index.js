const randomPick = require('../utilities/randomPick');

class ItemSack {
  constructor(type, limited, random, isFIFO, index = 0, sack = []) {
    this.type = type;
    this.limited = limited;
    this.random = random;
    this.isFIFO = isFIFO;
    this.index = index;
    this.sack = sack;
  }

  getType() {
    return this.type;
  }

  generateId() {
    this.index += 1;

    return `${this.type}-${this.index}`;
  }

  isEmpty() {
    return this.limited && this.sack.length === 0;
  }

  pickOne() {
    if (this.isEmpty()) throw Error(`No more ${this.type}`);
    if (!this.limited) {
      return {
        ...this.sack[0],
        id: this.generateId(),
        type: this.type,
      };
    }

    if (this.random) {
      return randomPick(this.sack, 1, true)[0];
    }

    return this.isFIFO ? this.sack.shift() : this.sack.pop();
  }

  pickWithId(id) {
    if (this.isEmpty()) throw Error(`No more ${this.type}`);
    const pickedOne = this.sack.find(item => item.id === id);
    if (!pickedOne) throw Error(`Item id #${id} not found`);

    if (this.limited) {
      const index = this.sack.indexOf(pickedOne);
      this.sack.splice(index, 1);
    }

    return pickedOne;
  }

  addOne(data) {
    this.sack.push({
      id: this.generateId(),
      ...data,
    });
  }

  shrinkSack(maxCount) {
    const newContent = [];
    let deCount = maxCount;
    while (deCount && this.sack.count) {
      newContent.push(this.pickOne());
      deCount -= 1;
    }
    this.sack = newContent;
  }
}

class ItemSacks {
  constructor() {
    this.sacks = [];
  }

  serialize() {
    return {
      sacks: this.sacks,
    };
  }

  deserialize(data) {
    this.sacks = data.sacks.map(
      sackData =>
        new ItemSack(
          sackData.type,
          sackData.limited,
          sackData.random,
          sackData.isFIFO,
          sackData.index,
          sackData.sack,
        ),
    );
  }

  /** @private */
  getSack(type) {
    const sack = this.sacks.find(s => s.getType() === type);
    if (!sack) {
      console.error(`Cannot find sack ${type}`);
    }

    return sack;
  }

  createSack(type, limited, random = false, isFIFO = true) {
    const sack = new ItemSack(type, limited, random, isFIFO);
    this.sacks.push(sack);
  }

  addOne(type, item) {
    this.getSack(type).addOne(item);
  }

  isEmpty(type) {
    return this.getSack(type).isEmpty();
  }

  shrinkSack(type, max) {
    return this.getSack(type).shrinkSack(max);
  }

  pickOne(type) {
    return this.getSack(type).pickOne();
  }

  pickWithId(type, id) {
    return this.getSack(type).pickWithId(id);
  }

  pickNMax(type, n) {
    const result = [];
    const sack = this.getSack(type);
    for (let i = 0; i < n; i += 1) {
      if (sack.isEmpty()) break;
      result.push(sack.pickOne());
    }
    return result;
  }

  addItems(type, items) {
    const sack = this.getSack(type);
    while (items.length) {
      sack.addOne(items.shift());
    }
  }
}

module.exports = ItemSacks;
