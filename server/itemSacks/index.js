import randomPick from '../utilities/randomPick';

class ItemSack {
  constructor(type, limited, random, isFIFO) {
    this.type = type;
    this.sack = [];
    this.limited = limited;
    this.index = 0;
    this.random = random;
    this.isFIFO = isFIFO;
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
      return randomPick(this.sack, 1, true);
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
}

class SackApi {
  constructor() {
    this.sacks = [];
  }

  /** @private */
  getSack(type) {
    return this.sacks.find(s => s.getType() === type);
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

const instance = new SackApi();

export default instance;
